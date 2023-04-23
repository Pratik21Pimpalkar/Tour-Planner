import requests
from django.http import JsonResponse
from rest_framework.views import APIView


class autoCompletePlaceSearch(APIView):
    def post(self, request):
        data = request.data
        # data['format'] = 'json'
        print(data)
        # text = data['text']
        # url = f'https://api.geoapify.com/v1/geocode/autocomplete?text={text}'
        url = 'https://api.foursquare.com/v3/places/search'
        # authorization = 'baaeb048d8054097a42022f81ad1c1df'
        authorization = 'fsq3BY/UrNb8Phx24byC4MtTjNLfJe0DTNus5Q5Kaayptys='
        headers = {
            'Authorization': authorization
        }
        response = requests.get(url, data=data, headers=headers)
        data = response.json()
        return JsonResponse(data, safe=False)


class getPlaceDetails(APIView):
    def post(self, request):
        data = request.data['fsq_id']
        # data['format'] = 'json'
        print(data)
        # text = data['text']
        # url = f'https://api.geoapify.com/v1/geocode/autocomplete?text={text}'
        url = 'https://api.foursquare.com/v3/places/'
        url = f'https://api.foursquare.com/v3/places/{data}'
        # authorization = 'baaeb048d8054097a42022f81ad1c1df'
        authorization = 'fsq3BY/UrNb8Phx24byC4MtTjNLfJe0DTNus5Q5Kaayptys='
        headers = {
            'Authorization': authorization,
            "accept": "application/json",
        }
        response = requests.get(url, headers=headers)
        data = response.json()
        return JsonResponse(data, safe=False)
