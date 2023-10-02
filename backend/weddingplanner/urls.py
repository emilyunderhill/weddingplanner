from django.urls import path
from .views import CheckListDashboard, CompleteChecklistItem, CreateCheckListItem, RegisterView, RetrieveCheckList, RetrieveUserView, deleteChecklistItem

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('profile', RetrieveUserView.as_view()),
    path('dashboard/checklist', CheckListDashboard.as_view()),
    path('checklist', RetrieveCheckList.as_view()),
    path('checklist/create', CreateCheckListItem.as_view()),
    path('checklist/complete', CompleteChecklistItem.as_view()),
    path('checklist/delete', deleteChecklistItem.as_view())
]
