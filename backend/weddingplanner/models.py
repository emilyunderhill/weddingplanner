from datetime import datetime
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _

class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        if not first_name:
            raise ValueError("Users must have a first name")

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def createSuperUser(self, email, first_name, last_name, password=None):
        user = self.create_user(
            self,
            email,
            first_name,
            last_name,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    wedding = models.ForeignKey(
        'Wedding',
        on_delete=models.CASCADE,
        null=True,
        related_name='users',
    )

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self):
        return self.email

class Wedding(models.Model):
    def create_wedding(user: UserAccount):
        # Add user relation to wedding
        wedding = Wedding()
        wedding.save()

        user.wedding = wedding
        user.save()

        # Add default checklist items
        default_checklist_items = [
            {
                'title': 'Create guestlist',
                'priority': 1,
            },
            {
                'title': 'Calculate budget',
                'priority': 2,
            },
            {
                'title': 'Book venue',
                'priority': 3,
            },
            {
                'title': 'Send save the dates',
                'priority': 4,
            },
            {
                'title': 'Book caterers',
                'priority': 5,
            },
            {
                'title': 'Book entertainment',
                'priority': 6,
            },
            {
                'title': 'Book photographer/videographer',
                'priority': 7,
            },
            {
                'title': 'Book hair and makeup',
                'priority': 8,
            },
            {
                'title': 'Send official invites',
                'priority': 9,
            }
        ]

        for data in default_checklist_items:
            checklist_item = ChecklistItem(**data)
            checklist_item.wedding = wedding
            checklist_item.save()

        return wedding

class ChecklistItem(models.Model):
    class ChecklistStatus(models.IntegerChoices):
        OPEN = 1, _('Open')
        COMPLETED = 2, _('Completed')

    class Meta:
        ordering = ['priority']

    wedding = models.ForeignKey(
        Wedding,
        on_delete=models.CASCADE,
        related_name='checklist_items',
    )
    status = models.IntegerField(
        choices=ChecklistStatus.choices,
        default=ChecklistStatus.OPEN
    )
    title = models.CharField(max_length=150, blank=False)
    priority = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    created_by = models.ForeignKey(
        UserAccount,
        on_delete=models.SET_NULL,
        null=True,
        related_name='checklist_created_bys',
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        UserAccount,
        on_delete=models.SET_NULL,
        null=True,
        related_name='checklist_updated_bys',
    )

    def save(self, *args, **kwargs):
        self.updated_at = datetime.now()

        updated_by = kwargs.pop('updated_by', None)
        if updated_by:
            self.updated_by = updated_by

        super(ChecklistItem, self).save(*args, **kwargs)

    def complete(self, *args, **kwargs):
        self.status = 2
        self.save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title
