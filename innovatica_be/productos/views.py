from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Producto

import json


@require_http_methods('GET')
def get_unsigned_products(request):
    data = serializers.serialize('json', list(Producto.objects.all()))
    return JsonResponse(data, safe=False)


@require_http_methods('GET')
def get_signed_products(request):
    return JsonResponse({'message': 'happy_message'})


@require_http_methods('GET')
def get_unsigned_products(request):
    data = serializers.serialize('json', list(Producto.objects.filter()))
    return JsonResponse(data, safe=False)



@csrf_exempt
@require_http_methods('POST')
def insert_product(request):
    new_product = json.loads(request.body)
    nombre = new_product['nombre']
    categoria = new_product['categoria']
    estado = new_product['estado']
    imagen = new_product['imagen']

    product = Producto(nombre=nombre, categoria=categoria, estado=estado, imagen=imagen)
    product.save()

    return JsonResponse({'message': 'Product ' + nombre + ' inserted correctly'})