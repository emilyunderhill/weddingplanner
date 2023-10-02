from datetime import datetime
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Max

from .models import ChecklistItem, Wedding
from .serializers import ChecklistItemSerializer, UserCreateSerializer, UserSerializer, ChecklistDashboardSerializer

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        response = UserSerializer(user)

        Wedding.create_wedding(user=user)

        return Response(response.data, status.HTTP_201_CREATED)

class RetrieveUserView(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        user = UserSerializer(user)

        return Response(user.data, status.HTTP_200_OK)

class RetrieveCheckList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        wedding = user.wedding
        checklist_items = wedding.checklist_items.all()
        checklist_items = ChecklistItemSerializer(checklist_items, many=True)

        return Response(checklist_items.data, status.HTTP_200_OK, content_type='application/json')

class CreateCheckListItem(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        wedding = user.wedding
        checklist_items = wedding.checklist_items.all()

        if not checklist_items:
            priority = 1
        else:
            max_priority_dict = wedding.checklist_items.all().aggregate(Max('priority'))
            max_priority = max_priority_dict['priority__max'] if max_priority_dict['priority__max'] is not None else 0
            priority = max_priority + 1

        data = request.data
        data['priority'] = priority
        data['wedding'] = wedding.id

        serializer = ChecklistItemSerializer(data=data, context={'request': request})

        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        serializer.save(updated_by=user)

        return Response(serializer.data, status.HTTP_200_OK)

class CheckListDashboard(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        wedding = user.wedding
        all_checklist_items = wedding.checklist_items.all()
        open_checklist_items = all_checklist_items.filter(status=1)
        progress = ( (all_checklist_items.count() - open_checklist_items.count()) / all_checklist_items.count()) * 100

        checklist_items = ChecklistItemSerializer(open_checklist_items[:5], many=True)

        data = {
            'checklist_items': checklist_items.data,
            'progress': progress
        }

        return Response(data, status.HTTP_200_OK, content_type='application/json')

class CompleteChecklistItem(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        checklist_item_id = request.data['checklist_item_id']
        if not checklist_item_id:
            response = {
                'success': False,
                'errors': 'The checklist item id was not included in the request'
            }
            return Response(response, status.HTTP_400_BAD_REQUEST)

        checklist_item = ChecklistItem.objects.get(pk=checklist_item_id)

        if not checklist_item:
            errors = {
                'success': False,
                'errors': 'The checklist item could not be found'
            }
            return Response(errors, status.HTTP_404_NOT_FOUND)

        checklist_item.complete(updated_by=user)
        return Response({'success': True}, status.HTTP_200_OK)
