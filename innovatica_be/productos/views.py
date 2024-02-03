from django.shortcuts import redirect
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated

from .models import Producto

import json


@api_view(['GET'])
def get_unsigned_products(request):
    data = list(Producto.objects.all().values('nombre', 'estado'))
    return JsonResponse(data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_signed_products(request):
    data = serializers.serialize('json', list(Producto.objects.all()))
    return JsonResponse(json.loads(data), safe=False)



@require_http_methods('GET')
def get_product_by_filter(request):
    fiter_data = json.dumps(request.GET)
    product_query_set = Producto.objects.filter(**json.loads(fiter_data))
    data = serializers.serialize('json', list(product_query_set))
    return JsonResponse(json.loads(data), safe=False)


@api_view(['POST'])
def insert_product(request):
    new_product = json.loads(request.body)
    product = Producto(**new_product)
    product.save()

    return JsonResponse({'message': 'Product ' + new_product['nombre'] + ' inserted correctly'})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    data = request.GET
    product_id = pk
    product_to_delete = Producto.objects.filter(id=product_id)
    try:
        if not product_to_delete.exists():
            raise Exception('Empty QuerySet')
        product_to_delete.delete()

        return JsonResponse({'message': 'Se ha eliminado el producto ' + str(product_id) + ' con exito!'})
    except Exception as e:
        return JsonResponse({'message': 'No se ha podido eliminar el producto ' + str(product_id), 'error': str(e)},
                            status=418)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, pk):
    product_id = pk
    product_new_values = json.loads(request.body)
    product_to_update = Producto.objects.filter(id=product_id)
    try:
        if not product_to_update.exists():
            raise Exception('Empty QuerySet')
        product_to_update.update(**product_new_values)

        return JsonResponse({'message': 'Se ha actualizado el producto ' + str(id) + ' con exito!'})
    except Exception as e:
        return JsonResponse({'message': 'No se ha podido actualizar el producto ' + str(id), 'error': str(e)},
                            status=418)
