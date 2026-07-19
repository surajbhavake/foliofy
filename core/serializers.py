from rest_framework import serializers
from .models import Profile,Skill,BlogPost,Project,Profile
from django.contrib.auth import get_user_model




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
class BlogPostSerializer(serializers.ModelSerializer):
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




#This section is for registration 
User = get_user_model()

class RegisterSerializer(serializers.Serializer):

    username = serializers.CharField(max_length = 150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True,min_length=8)
    password2 = serializers.CharField(write_only= True,min_length=8,label = 'Confirm password')
    subdomain = serializers.CharField(max_length= 50)
    full_name = serializers.CharField(max_length = 200)


    def validate_username(self,value):
        if User.objects.filter(username=value).exists(): #.exits() gives use true or false
            raise serializers.ValidationError('This username is already taken.')
        return value
    

    def validate_email(self,value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email is already exists.')
        return value
    
    def validate_subdomain(self,value):
        
        value = value.lower().replace(' ','-')


        #check if its contain only allowed words
        import re
        if not re.match(r'^[a-z0-9]([a-z0-9-]*[a-z0-9])?$', value):
            raise serializers.ValidationError(
                "Subdomain can only contain lowercase letters, numbers, and hyphens. "
                "It must start and end with a letter or number."
            )
        
        #check reserved words

        reserved = ['www','api','admin','mail','smtp','pop','ftp','app','foliofy']
        if value in reserved:
            raise serializers.ValidationError('This subdomin is reserved.')
        

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('This subdomain is already exists.')
        
        return value
    
    def validate(self,data):

        #here we check password

        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2':'Passwords do not match'})
        
        return data
    
    def create(self,validated_data):
        

        validated_data.pop('password2')

        full_name = validated_data.pop('full_name')
        subdomain = validated_data.pop('subdomain')
        password = validated_data.pop('password')


        user = User.objects.create_user(
            username =subdomain,
            email=validated_data['email'],
            password=password,
        )

        Profile.objects.get_or_create(
            user= user,
            full_name = full_name,
            headline = '',
            bio = '',
            theme = 'default',
        )

        return user
        

    


