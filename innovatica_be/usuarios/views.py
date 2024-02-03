import json
from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    email = data.get('email', '')
    user = User.objects.create_user(username=username, password=password, email=email, is_active=False)
    return JsonResponse({'message': 'User created successfully'})


@api_view(['GET'])
def get_all_users(requets):
    data = serializers.serialize('json', list(User.objects.all()))
    return JsonResponse(json.loads(data), safe=False)


@api_view(['PUT'])
def update_status(request):
    data = json.loads(request.body)
    pk = data['pk']
    status = True if data['status'] == 'f' else False
    user = User.objects.filter(id=pk)
    user.update(is_active=status)
    return JsonResponse({'message': 'Estado actualizado con exito!'})
