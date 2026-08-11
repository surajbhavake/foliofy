from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import BlogPost,ContactMessage
from .serializers_public import (
    PublicProfileSerializer,
    PublicProjectSerializer,
    PublicSkillSerializer,
    PublicBlogPostSerializer,
    PublicExperienceSerializer,
    ContactMessageSerializer
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

        'skills' : PublicSkillSerializer(profile.skills.all(), many=True).data,
        'experiences': PublicExperienceSerializer(
            profile.experience.all().order_by('order'),many=True
        ).data
    }

    return Response(data)


@api_view(['GET'])
def public_blog_list(request):
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



@api_view(['POST'])
def public_send_message(request):
    profile = request.tenant_profile
    if not profile:
        return Response({'error': 'Portfolio not found'}, status=404)

    if not profile.show_contact_form:
        return Response({'error': 'Contact form is not available'}, status=403)
    serializer = ContactMessageSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(profile=profile)

        return Response(
            {'message': 'Your message has been sent successfully!'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
