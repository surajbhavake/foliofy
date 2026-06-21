from rest_framework import serializers
from .models import Profile,Skill,BlogPost,Project


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile

        fields = [
            'id','full_name','headline','bio','avatar'
            ,'github','resume','linkedin','twitter','website'
            ,'theme','created_at','updated_at'
        ]
        read_only_fields = ['id','created_at','updated_at']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill

        fields = [
            'id','name','proficiency','profile'
        ]
        read_only_fields = ['id','profile']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project

        fields = [
            'id','profile','title','description','image',
            'live_url','repo_url','order',
        ]
        read_only_fields = ['id','profile']

#serializer is used basically for translation as python understand database models as objects  
#so serializer convert the objects into JSON so the frontend can understand and same apply otherway around
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost

        fields = [
            'id','profile','title','slug',
            'content','is_published','created_at',
            'updated_at'
        ]

        #readonly means user can't updated it 
        read_only_fields = [
            'id','profile','slug','created_at','updated_at'
        ]