from scipy.spatial import cKDTree
import itertools
from geopy.distance import geodesic
from itertools import permutations
from math import radians, sin, cos, sqrt, atan2
import math
import pandas as pd
import requests
import numpy as np
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
        authorization = '6ad67642e2f94ad99d6fc359677c6706'
        # authorization = 'fsq3BY/UrNb8Phx24byC4MtTjNLfJe0DTNus5Q5Kaayptys='
        headers = {
            'Authorization': authorization
        }
        response = requests.get(url, data=data,  headers=headers)
        data = response.json()
        data2 = data['features']
        return JsonResponse(data2, safe=False)


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


data = pd.read_csv('./data.csv')
data[['latitude', 'longitude']] = data['Latitude , Longitude'].str.split(
    ',', expand=True).astype(float)
data['Price'] = data['Price'].replace(np.nan, None)


def calculate_distance(coord1, coord2):
    # Calculate the distance between the coordinates using geodesic distance
    distance = geodesic(coord1, coord2).kilometers
    return distance


def calculate_distance(origin, destination):
    # Calculate the distance between two coordinates using Haversine formula
    lat1, lon1 = origin
    lat2, lon2 = destination

    R = 6371  # Radius of the Earth in km

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(math.radians(lat1)) * \
        math.cos(math.radians(lat2)) * math.sin(dlon / 2) * math.sin(dlon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c

    return distance


def create_tour_plan(current_location, tour_time, place_types):
    # Filter the dataset based on distance and place types
    nearby_places = data.copy()
    nearby_places = nearby_places[nearby_places['PlaceType'].isin(place_types)]

    # Calculate the distance to each place from the current location
    nearby_places['distance'] = nearby_places.apply(lambda row: calculate_distance(
        current_location, (row['latitude'], row['longitude'])), axis=1)

    # Sort the places based on distance
    nearby_places = nearby_places.sort_values('distance')

    # Calculate the time to reach each place based on average speed
    nearby_places['time_to_reach'] = nearby_places['distance'] / \
        20  # Assuming average speed of 20 km/hr

    # Calculate the total time required for each place
    nearby_places['total_time'] = nearby_places['time_to_reach'] + \
        nearby_places['Time']

    # Filter the places based on total time
    nearby_places = nearby_places[nearby_places['total_time'] <= tour_time]

    # Create a KD-tree for efficient nearest neighbor search
    coordinates = nearby_places[['latitude', 'longitude']].values
    tree = cKDTree(coordinates)

    # Find the nearest place with the highest rating as the starting point
    _, nearest_idx = tree.query(current_location)
    nearest_place = nearby_places.iloc[nearest_idx]
    tour_plan = [nearest_place]
    tour_time_remaining = tour_time - nearest_place['total_time']

    # Build the tour plan incrementally by selecting the nearest unvisited place
    while tour_time_remaining > 0:
        remaining_places = nearby_places[~nearby_places.index.isin(
            [place.name for place in tour_plan])]

        # Check if there are remaining unvisited places
        if len(remaining_places) == 0:
            break

        # Find the nearest unvisited place
        _, nearest_idx = tree.query(
            remaining_places[['latitude', 'longitude']].values, k=1)
        nearest_place = remaining_places.iloc[nearest_idx[0]]

        # Update the current location
        current_location = (
            nearest_place['latitude'], nearest_place['longitude'])

        # Update the tour plan and remaining tour time
        if nearest_place['total_time'] <= tour_time_remaining:
            tour_plan.append(nearest_place)
            tour_time_remaining -= nearest_place['total_time']
        else:
            break

    # Convert the tour plan to a list of dictionaries
    tour_plan_json = [place.to_dict() for place in tour_plan]

    # Return the optimal tour plan as JSON
    return tour_plan_json


def select_nearby_hotels_with_unique_number(current_location, data, hotel_preference, tour_time, selected_sr_no, time_in_hotel):
    if not hotel_preference:
        return None

    # Filter the dataset for hotels with the PlaceType 'Hotels' and 'Restaurant'
    hotels = data[(data['PlaceType'] == 'Hotels')].copy()

    if hotels.empty:
        return None

    # Calculate the distance to each hotel from the current location
    hotels['distance'] = hotels.apply(lambda row: calculate_distance(
        current_location, (row['latitude'], row['longitude'])), axis=1)

    # Find the nearest hotel
    hotels['distance'] = hotels['distance'].astype(float)
    nearest_hotel = hotels.loc[hotels['distance'].idxmin()]

    # Sort the hotels based on distance
    hotels = hotels.sort_values('distance')

    # Print the names and ratings of hotels with unique numbers
    for idx, hotel in hotels.iterrows():
        print(
            f"{idx + 1}. {hotel['Name']} \n (Rating: {hotel['Ratings']}) \n cost:{hotel['Price']}")

    # Select the hotel based on the provided serial number
    selected_hotel = hotels.loc[selected_sr_no - 1]
    print("Chosen hotel:", selected_hotel['Name'],
          "(Rating:", selected_hotel['Ratings'], ")")

    selected_hotel['Time'] = time_in_hotel

    # Reduce the tour time by subtracting the time spent in the hotel
    tour_time -= time_in_hotel

    # Update the current location to the coordinates of the selected hotel
    current_location = (
        selected_hotel['latitude'], selected_hotel['longitude'])

    # print(selected_hotel, current_location, tour_time)
    return selected_hotel, current_location, tour_time


class calculate_tour_plan_view(APIView):
    def post(self, request):
        print(request.data)
        latitude = request.data['latitude']
        longitude = request.data['longitude']
        tour_time = float(request.data['duration'])
        hotel_preference = bool(request.data['isStay'])
        place_types = request.data['interest']
        selected_sr_no = request.data['selected_sr_no']
        if (hotel_preference == True):
            time_in_hotel = float(request.data['time_in_hotel'])
        else:
            time_in_hotel = 0

        current_location = (latitude, longitude)

        # Call the necessary functions with user input
        hotel_info = select_nearby_hotels_with_unique_number(
            current_location, data, hotel_preference, tour_time, selected_sr_no, time_in_hotel)
        optimal_tour_plan = create_tour_plan(
            current_location, tour_time, place_types)

        print(hotel_info)
      # print(optimal_tour_plan)
        if hotel_info is not None and hotel_info  :
                hotelLatitude = hotel_info[0]['latitude']
                hotelLongitude = hotel_info[0]['longitude']
                hotelLoc=(hotelLatitude,hotelLongitude)
                starting_distance = calculate_distance(current_location,hotelLoc)
                print(starting_distance)
                hotel_data = {
                    'Name': hotel_info[0][0],
                    'Ratings': hotel_info[0]['Ratings'],
                    'Price': hotel_info[0]['Price'],
                    'total_time': starting_distance/(20)+ time_in_hotel,
                    'time_to_reach': starting_distance/(20),
                    'Latitude': hotel_info[0]['latitude'],
                    'Longitude': hotel_info[0]['longitude'],
                    'PlaceType': hotel_info[0]['PlaceType'],
                    'Distance': hotel_info[0]['distance'],
                    'City': hotel_info[0]['City']
                }
                optimal_tour_plan.insert(0, hotel_data)
    # Prepare the response data
        response_data = {
            'optimal_tour_plan': optimal_tour_plan
        }
        # Return the response as JSON
        return JsonResponse(response_data)


d1 = pd.read_csv('./data.csv')
d1[['latitude', 'longitude']] = data['Latitude , Longitude'].str.split(
    ',', expand=True).astype(float)


class list_of_hotels(APIView):
    def get(self, request):
        hotels_data = d1[d1['PlaceType'] == 'Hotels']
        hotels_data_with_index = hotels_data.reset_index()
        hotels_json = hotels_data_with_index.to_dict(orient='records')
        return JsonResponse(hotels_json, safe=False)
