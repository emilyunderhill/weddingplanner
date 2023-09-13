from django.urls import path
from views.account import account

urlpatterns = [
    path('api/accountCreate', account.create.as_view(), name='account-create'),
]
