from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Max

from .models import Wedding
from .serializers import ChecklistItemSerializer, UserCreateSerializer, UserSerializer

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
            max_priority = wedding.checklist_items.all().aggregate(Max('priority'))
            priority = max_priority + 1

        title = request.data['title']

        serializer = ChecklistItemSerializer().create(
            title=title,
            priority=priority,
            user=user
        )

        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        checklist_item = serializer.create(serializer.validated_data)
        response = ChecklistItemSerializer(checklist_item)

        return Response(response.data, status.HTTP_200_OK)
