from django.shortcuts import render

from rest_framework import viewsets,permissions,status
from rest_framework.response import Response
from .models import Profile,Skill,Project,BlogPost
from django.utils.text import slugify
from .serializers import (
    ProfileSerializer,SkillSerializer,ProjectSerializer,BlogSerializer
)

class IsOwnerOrReadOnly(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.profile.user == request.user
        #here we are creating new blueprint which  modifying the existing funtion
        # here if user try to access the safe methods means read only data then 
        # he is allowed by if he try to edit it , it will check if the user is allowed to 
        # access that profile database or not
        # 
    
class ProfileViewSet(viewsets.ModelViewSet):

    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated,IsOwnerOrReadOnly]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

        #so basically queryset get the data from the database of the 
        # logged in user and performe_create basically attaches the data that the user 
        # sends to the user's database


class SkillViewSet(viewsets.ModelViewSet):

    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated,IsOwnerOrReadOnly]

    def get_queryset(self):
        return Skill.objects.filter(profile__user = self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)

class ProjectViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated,IsOwnerOrReadOnly]

    def get_queryset(self):
        return Project.objects.filter(profile__user = self.request.user)
    

    def perform_create(self, serializer):
        serializer.save(profile = self.request.user.profile)


class BlogViewSet(viewsets.ModelViewSet):

    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated,IsOwnerOrReadOnly]

    def get_queryset(self):
        return BlogPost.objects.filter(profile__user =self.request.user)
    

    def perform_create(self, serializer):

        title = serializer.validated_set.get('title')
        base_slug = slugify(title)
        slug = base_slug
        counter = 1

        while BlogPost.objects.filter(profile__user = self.request.user,slug = slug).exists():
            slug = f"{base_slug}-{counter}"
            counter +=1
            serializer.save(profile = self.request.user.profile, slug = slug)
            #in we use profile=self.request.user.profile to find the specific user database
            #  and we use slug=slug the save the give slug after converting into this database column as we have not
            #  give user access to input slug
            # # Create your views here.
