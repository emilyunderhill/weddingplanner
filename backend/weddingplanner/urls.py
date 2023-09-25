from django.urls import path
from .views import RegisterView, RetrieveCheckList, RetrieveUserView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('profile', RetrieveUserView.as_view()),
    path('checklist', RetrieveCheckList.as_view())
]
