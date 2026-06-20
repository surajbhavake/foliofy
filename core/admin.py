from django.contrib import admin
from .models import User , Profile,Skill,Project,BlogPost

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(BlogPost)

# Register your models here.
