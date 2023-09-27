from rest_framework import serializers
from rest_framework.fields import empty
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

class ChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model: ChecklistItem
        fields = '__all__'

    def create(self, title, priority, user):
        checklist_item = ChecklistItem.objects.create(
            title = title,
            priority = priority,
            user = user,
        )

        return checklist_item
