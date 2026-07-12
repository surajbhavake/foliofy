from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import BlogPost
from .serializers_public import (
    PublicProfileSerializer,
    PublicProjectSerializer,
    PublicSkillSerializer,
    PublicBlogPostSerializer
)


@api_view(['GET'])
def public_portfolio(request):
    profile = request.tenant_profile

    if not profile :
        return Response({
            'error' : 'Portfolio Not Found '
        },status=404)
    
    data = {
        'profile' : PublicProfileSerializer(profile).data,
        'projects': PublicProjectSerializer(
            profile.projects.all().order_by('order'),many=True
            ).data,

        'skills' : PublicSkillSerializer(profile.skills.all(), many=True).data
    }

    return Response(data)


@api_view(['GET'])
def public_blog_post(request):
    profile = request.tenant_profile

    if not profile :
        return Response ({
            'error' : 'Not Found'
        },status=404)
    
    posts = BlogPost.objects.filter(profile = profile ,is_published = True).order_by('-created_at')
    serializer = PublicBlogPostSerializer(posts,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def public_blog_detail(request,slug):
    profile = request.tenant_profile

    if not profile :
        return Response({
            'error': 'Not found '
        },status=404)
    
    post = get_object_or_404(BlogPost,profile = profile,slug = slug , is_published = True) 
    #if we want to find many thing then use filter and if we want to find one thing then use get

    # try:
    #     post = BlogPost.objects.get(
    #     profile=profile,
    #     slug=slug,
    #     is_published=True
    # )
    # except BlogPost.DoesNotExist:
    #     raise Http404


    #above is alternative code 
    serializer = PublicBlogPostSerializer(post)
    return Response(serializer.data)