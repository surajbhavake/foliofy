from rest_framework import serializers
from .models import Profile,Skill,BlogPost,Project

class PublicProfileSerializer(serializers.ModelSerializer):
    class Meta :
        model = Profile
        fields = [
            'id','full_name','headline','bio','avatar','resume','twitter','github','website','linkedin','theme'
        ]

class PublicSkillSerializer(serializers.ModelSerializer):
    class Meta :
        model = Skill

        fields = [
            'name','proficiency'
        ]

class PublicProjectSerializer(serializers.ModelSerializer):
    class Meta :
        model = Project

        fields = ['title', 'description', 'image', 'live_url', 'repo_url', 'order']

class PublicBlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['title', 'slug', 'content', 'created_at']