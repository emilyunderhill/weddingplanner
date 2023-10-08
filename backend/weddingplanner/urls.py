from django.urls import path
from .views import *

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('profile', RetrieveUserView.as_view()),
    path('dashboard/checklist', ChecklistDashboard.as_view()),
    path('checklist', RetrieveCheckList.as_view()),
    path('checklist/create', CreateChecklistItem.as_view()),
    path('checklist/complete', CompleteChecklistItem.as_view()),
    path('checklist/delete', DeleteChecklistItem.as_view()),
    path('checklist/rename', RenameChecklistItem.as_view()),
    path('checklist/reopen', ReopenChecklistItem.as_view()),
]
