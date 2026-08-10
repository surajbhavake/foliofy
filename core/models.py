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
    avatar = models.ImageField(upload_to='avatar/',blank=True,null=True)
    resume = models.FileField(upload_to='resume/',blank=True,null=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    website = models.URLField(blank=True)
    theme = models.CharField(max_length=50,default='default')

    #Timestamp

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    #contact
    contact_email = models.EmailField(blank=True,help_text='Email where you to receive messages')
    show_contact_form = models.BooleanField(default=True,help_text='Display the contact form on your porfolio ')
    location = models.CharField(max_length=200,blank=True)
    available_for = models.CharField(max_length=300,blank=True,help_text='eg. freelance projects, full-time roles')


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
    image = models.ImageField(upload_to='projects/',blank=True,null=True)
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
    



from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save,sender=User)
def create_user_profile(sender,instance,created,**kwargs):
    
    if created:
        Profile.objects.get_or_create(
            user = instance,
            defaults={
                'full_name' : instance.get_full_name() or instance.username,
                'headline' : '',
                'bio' : '',
                'theme' : 'default',
            }
        )


class Experience(models.Model):

    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='experiences'#when i write profile.experiences.all() it will show me all the experiences that profile has so this makes the process easy

        )

    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True,null=True)
    is_current = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order','-start_date']
        verbose_name_plural = 'Experiences'

    def __str__(self):
        return f"{self.role} at {self.company}"



class ContactMessage(models.Model):

    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='contact_message'
    )

    sender_name = models.CharField(max_length=200)
    sender_email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at= models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.sender_name}:{self.subject[:50]}"