from django.shortcuts import render
from django.core.cache import cache
from django.http import JsonResponse

def tmp(request):

	if (request.method == "GET"):
		cache.set('1', "hi", 60 * 60)
		return JsonResponse({'data': cache.get('1')})


# Create your views here.
