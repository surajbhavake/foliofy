from django.urls import path
from .views_public import public_blog_detail,public_blog_list,public_portfolio

urlpatterns = [
    path('portfolio/',public_portfolio,name="public_portfolio"),
    path('blog/',public_blog_list,name="public_blog_list"),
    path('blog/<slug:slug>/',public_blog_detail,name="public_blog_detail"),
]