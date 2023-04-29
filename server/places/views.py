import requests
from django.http import JsonResponse
from rest_framework.views import APIView


class autoCompletePlaceSearch(APIView):
    def post(self, request):
        data = request.data
        # data['format'] = 'json'
        print(data)
        text = data['query']
        url = f'https://api.geoapify.com/v1/geocode/autocomplete?text={text}'
        # url = 'https://api.foursquare.com/v3/places/search'
        # url = 'https://api.foursquare.com/v3/autocomplete'
        authorization = 'baaeb048d8054097a42022f81ad1c1df'
        # authorization = 'fsq3BY/UrNb8Phx24byC4MtTjNLfJe0DTNus5Q5Kaayptys='
        headers = {
            'Authorization': authorization
        }
        response = requests.get(url, data=data,  headers=headers)
        data = response.json()
        return JsonResponse(data, safe=False)


# class getPlaceDetails(APIView):
#     def post(self, request):
#         data = request.data['fsq_id']
#         # data['format'] = 'json'
#         print(data)
#         # text = data['text']
#         # url = f'https://api.geoapify.com/v1/geocode/autocomplete?text={text}'
#         url = 'https://api.foursquare.com/v3/places/'
#         url = f'https://api.foursquare.com/v3/places/{data}'
#         # authorization = 'baaeb048d8054097a42022f81ad1c1df'
#         authorization = 'fsq3BY/UrNb8Phx24byC4MtTjNLfJe0DTNus5Q5Kaayptys='
#         headers = {
#             'Authorization': authorization,
#             "accept": "application/json",
#         }
#         response = requests.get(url, headers=headers)
#         data = response.json()
#         return JsonResponse(data, safe=False)

class getPlaceDetails(APIView):
    def post(self, request):
        place_id = request.data['place_id']
        # 5174081c093438524059d4c21b881b143340f00101f9015e60780000000000c00208
        # data['format'] = 'json'
        print(place_id)
        # text = data['text']
        HotelUrl = f'https://api.geoapify.com/v2/places?categories=accommodation.hotel,catering.fast_food,catering.restaurant&filter=place:{place_id}&limit=20'
        TourismUrl = f'https://api.geoapify.com/v2/places?categories=tourism&filter=place:{place_id}&limit=20'
        authorization = 'baaeb048d8054097a42022f81ad1c1df'
        headers = {
            'Authorization': authorization,
            "accept": "application/json",
        }

        try:
            Hotelresponse = requests.get(HotelUrl, headers=headers)
            data1 = Hotelresponse.json()
           
            TourismResponse = requests.get(TourismUrl, headers=headers)
            data2 = TourismResponse.json()
           
            combined_data = {}
            combined_data['hotels'] = data1
            combined_data['tourism'] = data2
            return JsonResponse(combined_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': "Unable to fetch placedata !"}, status=500)
