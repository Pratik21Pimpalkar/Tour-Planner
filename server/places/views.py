import requests
from django.http import JsonResponse
from rest_framework.views import APIView
from datetime import datetime as dt
import json


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
        data2 = data['features']
        return JsonResponse(data2, safe=False)


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


class chatgpt(APIView):
    def post(self, request):
        data = request.data
        print(data)
        places = ", ".join(data['places'])
        # activities = ", ".join(data['activities'])
        languages = ", ".join(data['languages'])
        startDate = data['startDate']
        endDate = data['endDate']
        cuisines = ", ".join(data['cuisines'])
        budget = data['budget']
        interest = ", ".join(data['interest'])
        accomodation = ", ".join(data['accomodation'])
        transport = ", ".join(data['transport'])
        days = (dt.strptime(endDate, "%Y-%m-%d") -
                dt.strptime(startDate, "%Y-%m-%d")).days

        # prompt = f'Generate a personalized travel itinerary for a trip to {places} with a budget of {budget} INR. The traveler is interested in a  {days} days vacation and enjoys {interest}. They are looking for {accomodation} accommodations and prefer {transport} transportation. The itinerary should include  {cuisines} dining options. Please provide a short itinerary with daily recommendations for {days}   days, including suggested destinations, activities, and dining options. The itinerary should be written in {languages}. Note the  dates of trip are from {startDate} to {endDate}.Add daywise accommodations type,place and address.'

        # format = '{tripName:\"\",subTitle:\"\",description:\"\",itinerary:[{date:\"\",Day:\"\",accommodation:{type:\"\",name:\"\",address:\"\",},dining:{breakfast:{dishName:\"\",placeName:\"\",address:\"\"},dinner:{dishName:\"\",placeName:\"\",address:\"\"},lunch:{dishName:\"\",placeName:\"\",address:\"\"},},destination:\"\",description:\"\",placeToVisit:[{placeSpot:\"\",address:\"\",placeType:\"\"}]}]}'

        prompt = f'Generate a personalized travel  for {places} from {startDate} to {endDate}  with a  budget of {budget} INR, including {interest}interest,{accomodation} accommodations,{transport} transportation,and {cuisines} dining options.Provide tour plan in {languages} languages. Use less than 3000 tokens'
        format = "{tripName:,subTitle:,description:,itinerary:[{date:,Day:,accommodation:{type:,name:,address:,},dining:{breakfast:{dishName:,placeName:,address:},dinner:{dishName:,placeName:,address:},lunch:{dishName:,placeName:,address:},},destination:,description:,placeToVisit:[{placeSpot:,address:,placeType:}]}]}"
        body = prompt+format
        # print(body)
        data = {
            'prompt': body
        }
        url = f'https://c4-na.altogic.com/e:645a75c1bc487bc47cf0bd50/travel'
        response = requests.post(url, data=data)
        res = response.json()
        print(res)
        p = res['choices'][0]['message']['content']
        print(p)
        resp = json.loads(p)
        return JsonResponse(resp, safe=False)
