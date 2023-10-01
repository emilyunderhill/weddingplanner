from django.urls import path
from .views import CheckListDashboard, CreateCheckListItem, RegisterView, RetrieveCheckList, RetrieveUserView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('profile', RetrieveUserView.as_view()),
    path('checklist', RetrieveCheckList.as_view()),
    path('createChecklistItem', CreateCheckListItem.as_view()),
    path('dashboard/checklist', CheckListDashboard.as_view()),
]
