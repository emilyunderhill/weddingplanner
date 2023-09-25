from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from django.views import generic
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', generic.RedirectView.as_view(
         url='/api/', permanent=False)),
    path('api/auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    path('api/auth/token/obtain/', TokenObtainPairView.as_view()),
    path('api/auth/token/refresh/', TokenRefreshView.as_view()),
    path('api/auth/token/verify/', TokenVerifyView.as_view()),
    path('api/users/', include('weddingplanner.urls')),
]
