from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    full_name = models.CharField(max_length=200)
    headline = models.CharField(max_length=300)
    bio = models.TextField()
    avatar = models.ImageField(upload_to='avatar/')
    resume = models.FileField(upload_to='resume/')
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    website = models.URLField(blank=True)
    theme = models.CharField(max_length=50,default='default')

    #Timestamp

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.full_name
    

class Skill(models.Model):

    profile = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='skills')
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.proficiency})"
    

class Project(models.Model):
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='projects')
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    live_url = models.URLField(blank=True)
    repo_url = models.URLField(blank=True)
    order = models.IntegerField(default=0)


    def __str__(self):
        return self.title
    
    class meta:
        ordering = ['order']

class BlogPost(models.Model):
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='posts')
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title
    
