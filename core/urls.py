from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (
    ContactMessageViewSet, ExperienceViewSet, ProfileViewSet,SkillViewSet,ProjectViewSet,BlogPostViewSet,RegisterView
)

router = DefaultRouter()
router.register(r'profiles',ProfileViewSet, basename='profile')
router.register(r'skills',SkillViewSet, basename='skill')
router.register(r'projects',ProjectViewSet, basename='project')
router.register(r'blogposts',BlogPostViewSet , basename='blogpost')
router.register(r'experiences',ExperienceViewSet , basename='experience')
router.register(r'messages', ContactMessageViewSet, basename='contactmessage')


urlpatterns = [
    path('register/',RegisterView.as_view(),name='register'),
    path('',include(router.urls)),
    
]