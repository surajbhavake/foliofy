from django.contrib import admin
from .models import ContactMessage, Experience, User , Profile,Skill,Project,BlogPost

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(BlogPost)
admin.site.register(Experience)
admin.site.register(ContactMessage)

# Register your models here.
