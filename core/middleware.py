from django.contrib.sites.shortcuts import get_current_site
from .models import Profile

class TenantMiddleware:
    """
    Inspects the request's host (subdomain) and attaches the tenant's Profile
    to request.tenant_profile. If no matching tenant, sets it to None.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host().split(':')[0]  # strip port
        parts = host.split('.')

        # In development, localhost might just be 'localhost:8000'
        # We check if the first part is a valid subdomain (not www, api, etc.)
        if len(parts) >= 2 and parts[0] not in ('www', 'foliofy', 'api', 'localhost'):
            username = parts[0]
            try:
                profile = Profile.objects.get(user__username=username)
                request.tenant_profile = profile
            except Profile.DoesNotExist:
                request.tenant_profile = None
        else:
            # If accessing the main domain (foliofy.com), no tenant context
            request.tenant_profile = None

        response = self.get_response(request)
        return response