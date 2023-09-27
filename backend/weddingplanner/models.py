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
        wedding = Wedding()
        wedding.save()

        user.wedding = wedding
        user.save()

        return wedding

class ChecklistItem(models.Model):
    class ChecklistStatus(models.IntegerChoices):
        OPEN = 1, _('Open')
        COMPLETED = 2, _('Completed')

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

    def save(self: 'ChecklistItem', user: UserAccount):
        self.updated_at = datetime.now
        self.updated_by = user
        super(ChecklistItem, self).save()

    def create(title, priority, user):
        checklist_item = ChecklistItem(
            title=title,
            priority=priority,
            created_by=user,
            created_at=datetime.now
        )
        checklist_item.save(user)

        return checklist_item


    def complete(self: 'ChecklistItem', user: UserAccount):
        self.status = 2
        self.save(user)

        return self

    def open(self: 'ChecklistItem', user: UserAccount):
        self.status = 1
        self.save(user)

        return self

    def updateTitle(self: 'ChecklistItem', title: str, user: UserAccount):
        self.title = title
        self.save(user)

        return self

    def updatePriority(self: 'ChecklistItem', priority: int, user: UserAccount):
        self.priority = priority
        self.save()

        return self

    def __str__(self) -> str:
        return self.title
