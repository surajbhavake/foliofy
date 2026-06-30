from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileViewSet,SkillViewSet,ProjectViewSet,BlogPostViewSet
)

router = DefaultRouter()
router.register(r'profiles',ProfileViewSet, basename='profile')
router.register(r'skills',SkillViewSet, basename='skill')
router.register(r'projects',ProjectViewSet, basename='project')
router.register(r'blogposts',BlogPostViewSet , basename='blogpost')

urlpatterns = [
    path('',include(router.urls)),
]