from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions

from weddingplanner.models import ChecklistItem

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')

    def validate(self, data):
        user = User(**data)
        password = data.get('password')

        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializer_errors['non_field_errors']}
            )
        return data


    def create(self, validated_data):
        user = User.objects.create_user(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            password = validated_data['password']
        )

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')


class ChecklistItemSerializer(serializers.ModelSerializer):
    created_by = UserNameSerializer(read_only=True)
    updated_by = UserNameSerializer(read_only=True)

    class Meta:
        model: ChecklistItem
        fields = ('title', 'status', 'created_by', 'created_at', 'updated_by', 'updated_at', 'title', 'priority')
