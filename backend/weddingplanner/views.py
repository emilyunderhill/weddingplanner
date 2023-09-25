from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from .models import Wedding
from .serializers import UserCreateSerializer, UserSerializer
from django.core import serializers

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
        wedding = Wedding.objects.get(user=request.user)
        checklist_items = wedding.checklist_items.all()
        json_items = serializers.serialize(checklist_items)

        return Response(json_items, status.HTTP_200_OK, content_type='application/json')
