from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


@api_view(['POST'])
def custom_login(request):
    data = request.data
    serializer = TokenObtainPairSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    user = list(User.objects.filter(username=data['username']).values())[0]
    token_pair = serializer.validated_data

    custom_data = {
        'refresh': str(token_pair['refresh']),
        'access': str(token_pair['access']),
        'user_id': user['id'],
        'username': user['username'],
        'is_superuser': user['is_superuser']
    }

    return JsonResponse(custom_data)


@api_view(['POST'])
def logout(request):
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def get_current_user(request):
    current_user = (request.user)
    return JsonResponse({'pk': current_user.id,
                         'is_superuser': current_user.is_superuser,
                         'username': current_user.username})
