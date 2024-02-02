from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

from .models import Producto

import json


@require_http_methods('GET')
def get_unsigned_products(request):
    data = serializers.serialize('json', list(Producto.objects.all()))
    return JsonResponse(json.loads(data), safe=False)


@require_http_methods('GET')
def get_signed_products(request):
    return JsonResponse({'message': 'happy_message'})


@require_http_methods('GET')
def get_product_by_filter(request):
    fiter_data = json.dumps(request.GET)
    product_query_set = Producto.objects.filter(**json.loads(fiter_data))
    data = serializers.serialize('json', list(product_query_set))
    return JsonResponse(json.loads(data), safe=False)


@csrf_exempt
@require_http_methods('POST')
def insert_product(request):
    new_product = json.loads(request.body)
    product = Producto(**new_product)
    product.save()

    return JsonResponse({'message': 'Product ' + new_product['nombre'] + ' inserted correctly'})


@csrf_exempt
@require_http_methods('DELETE')
def delete_product(request):
    data = request.GET
    product_id = data['id']
    product_to_delete = Producto.objects.filter(id=product_id)
    try:
        if not product_to_delete.exists():
            raise Exception('Empty QuerySet')
        product_to_delete.delete()

        return JsonResponse({'message': 'Se ha eliminado el producto ' + product_id + ' con exito!'})
    except Exception as e:
        return JsonResponse({'message': 'No se ha podido eliminar el producto ' + product_id, 'error': str(e)},
                            status=418)


@csrf_exempt
@require_http_methods('PUT')
def update_product(request):
    data = request.GET
    id = data['id']
    product_new_values = json.loads(request.body)
    product_to_update = Producto.objects.filter(id=id)
    try:
        if not product_to_update.exists():
            raise Exception('Empty QuerySet')
        product_to_update.update(**product_new_values)

        return JsonResponse({'message': 'Se ha eliminado el producto ' + id + ' con exito!'})
    except Exception as e:
        return JsonResponse({'message': 'No se ha podido eliminar el producto ' + id, 'error': str(e)},
                            status=418)
