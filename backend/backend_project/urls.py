"""
URL configuration for backend_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic.base import RedirectView
from workingcode.views import PostList
from workingcode.views import PostDetail
from workingcode.views import PostDelete
from workingcode import views


urlpatterns = [
    path('', RedirectView.as_view(url='api/posts/'), name='root-redirect'),
    path('api/posts/', PostList.as_view(), name='post-list'),
    path('api/posts/<int:pk>/delete/', PostDelete.as_view(), name='post-delete'),
    path('api/posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path("admin/", admin.site.urls),
    path('posts/<int:post_id>/',views.get_post_detail, name='get_post_detail'),
]
