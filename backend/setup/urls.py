from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from omnistack7.views import PostsViewSet, UserCreateView

router = routers.DefaultRouter()
router.register('instarocket/posts', PostsViewSet, basename='Posts')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/signup/', UserCreateView.as_view()),
    path('api/rest-auth/', include('social_login.urls')),
    path('api/login/', obtain_jwt_token, name='login-jwt'),
    path('api/refresh-token/', refresh_jwt_token),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
