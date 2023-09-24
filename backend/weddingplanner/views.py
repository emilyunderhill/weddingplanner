from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from .models import Wedding
from .serializers import UserCreateSerializer, UserSerializer

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

        wedding = Wedding.create_wedding(user=user)
        response.data.wedding_id = wedding.id

        return Response(response.data, status.HTTP_201_CREATED)

class RetrieveUserView(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        user = UserSerializer(user)

        return Response(user.data, status.HTTP_200_OK)
