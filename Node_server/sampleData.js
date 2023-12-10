const testData = [
    {
        "name": "Crossword",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0788219,
        "lat": 21.1557965,
        "formatted": "Crossword, Civil Lines Road, Nagpur - 440001, Maharashtra, India",
        "categories": [
            "commercial",
            "commercial.books"
        ],
        "place_id": "5158ad026b0bc553405922148a47e2273540f00103f9012dfdd6be0000000092030943726f7373776f7264",

    },
    {
        "name": "Apple Store",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0785205,
        "lat": 21.1534369,
        "formatted": "Apple Store, Civil Lines Road, Nagpur - 440001, Maharashtra, India",
        "categories": [
            "commercial",
            "commercial.elektronics"
        ],
        "place_id": "5132e4d87a06c5534059313f05a447273540f00103f901a8d3d8be0000000092030b4170706c652053746f7265",

    },
    {
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.08782642993208,
        "lat": 21.1523462,
        "formatted": "Nagpur Railway Station, Mominpura, Nagpur - 440001, Maharashtra, India",
        "categories": [
            "tourism",
            "tourism.sights",
            "tourism.sights.memorial",
            "tourism.sights.memorial.locomotive"
        ],
        "place_id": "51ebbd57f39ec55340595fcd634b00273540f00102f9018efe301700000000",

    },
    {
        "name": "Zero Mile Stone",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0806859,
        "lat": 21.1497877,
        "formatted": "Zero Mile Stone, NH53;NH47, Ramdaspeth, Nagpur - 440001, Maharashtra, India",
        "categories": [
            "tourism",
            "tourism.attraction",
            "tourism.sights",
            "tourism.sights.memorial",
            "tourism.sights.memorial.monument"
        ],
        "place_id": "51e46f31f529c55340590f979a7c58263540f00103f901a9d7fd960000000092030f5a65726f204d696c652053746f6e65",

    },
    {
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0857136,
        "lat": 21.1487124,
        "formatted": "Nagpur Railway Station, Mominpura, Nagpur - 440001, Maharashtra, India",
        "categories": [
            "tourism",
            "tourism.sights",
            "tourism.sights.memorial",
            "tourism.sights.memorial.monument"
        ],
        "place_id": "51a334e5547cc5534059b041100412263540f00103f9012a4da01601000000",

    },
    {
        "name": "Sitabuldi Fort",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0840464088427,
        "lat": 21.14844,
        "formatted": "Sitabuldi Fort, NH53, Ramdaspeth, Nagpur - 440001, Maharashtra, India",
        "categories": [
            "tourism",
            "tourism.sights",
            "tourism.sights.castle"
        ],
        "place_id": "5132835cca62c55340593642ad48fe253540f00102f901cba9ad0e0000000092030e5369746162756c646920466f7274",

    },
    {
        "name": "Sitabuldi Fort",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0840464088427,
        "lat": 21.14844,
        "formatted": "Sitabuldi Fort, NH53, Ramdaspeth, Nagpur - 440001, Maharashtra, India",
        "categories": [
            "tourism",
            "tourism.sights",
            "tourism.sights.castle"
        ],
        "place_id": "5132835cca62c55340593642ad48fe253540f00102f9014a6a62070000000092030e5369746162756c646920466f7274",

    },
    {
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0879557,
        "lat": 21.1461172,
        "formatted": "Pakodewala Gali, Dhantoli, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "tourism",
            "tourism.sights",
            "tourism.sights.memorial"
        ],
        "place_id": "51cabff110a1c55340593d21d5ef67253540f00103f9019d9fb6ea00000000",

    },
    {
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.08101266525333,
        "lat": 21.1459402,
        "formatted": "NH53, Ramdaspeth, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "commercial",
            "commercial.books"
        ],
        "place_id": "519b8d9d572fc55340596094cf895c253540f00102f9014458481700000000",

    },
    {
        "name": "Sanjay Travel",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0873733,
        "lat": 21.1458444,
        "formatted": "Sanjay Travel, Pakodewala Gali, Dhantoli, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "commercial",
            "service",
            "service.travel_agency"
        ],
        "place_id": "51c9822e8697c55340592e0d020f56253540f00103f901348a9c9c0200000092030d53616e6a61792054726176656c",

    },
    {
        "name": "Surbhi Travels",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0876648,
        "lat": 21.1457072,
        "formatted": "Surbhi Travels, Pakodewala Gali, Dhantoli, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "commercial",
            "service",
            "service.travel_agency"
        ],
        "place_id": "51aa40d24c9cc5534059d8892c114d253540f00103f9012f8a9c9c0200000092030e5375726268692054726176656c73",

    },
    {
        "name": "Chotiwala",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0876649,
        "lat": 21.1456416,
        "formatted": "Chotiwala, Pakodewala Gali, Dhantoli, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "commercial",
            "commercial.food_and_drink",
            "commercial.food_and_drink.coffee_and_tea"
        ],
        "place_id": "5173a03d4d9cc553405913af96c448253540f00103f901308a9c9c0200000092030943686f746977616c61",

    },
    {
        "name": "Chotiwala Travels",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0876581,
        "lat": 21.1456266,
        "formatted": "Chotiwala Travels, Pakodewala Gali, Dhantoli, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "commercial",
            "service",
            "service.travel_agency"
        ],
        "place_id": "51b02eb8309cc5534059a62ceec847253540f00103f901318a9c9c0200000092031143686f746977616c612054726176656c73",

    },
    {
        "name": "Moonlight Studio",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0812287,
        "lat": 21.1439168,
        "formatted": "Moonlight Studio, NH53, Ramdaspeth, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "commercial",
            "commercial.hobby",
            "commercial.hobby.photo"
        ],
        "place_id": "51c87fdcd932c553405974173fbbd7243540f00103f9019a159107010000009203104d6f6f6e6c696768742053747564696f",

    },
    {
        "name": "Trendz fashion",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.08185,
        "lat": 21.1435846,
        "formatted": "Trendz fashion, NH53, Ramdaspeth, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "commercial",
            "commercial.clothing",
            "commercial.clothing.clothes"
        ],
        "place_id": "515e4bc8073dc5534059b5f4daf5c1243540f00103f90151ac470e01000000",

    },
    {
        "name": "Barbeque Nation",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0800676,
        "lat": 21.1432915,
        "formatted": "Barbeque Nation, Amravati Road, Ramdaspeth, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "catering",
            "catering.restaurant"
        ],
        "place_id": "5108dedad31fc5534059980a74c0ae243540f00103f9019c0c94b10100000092030f4261726265717565204e6174696f6e",

    },
    {
        "name": "Mahatma Gandhi Statue",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.081128,
        "lat": 21.1432598,
        "formatted": "Mahatma Gandhi Statue, Wardha Road Flyover, Dhantoli, Nagpur - 411010, Maharashtra, India",
        "categories": [
            "tourism",
            "tourism.attraction",
            "tourism.attraction.artwork",
            "tourism.sights",
            "tourism.sights.memorial"
        ],
        "place_id": "518db27e3331c553405900949dacac243540f00103f9011e5fb6ea000000009203154d616861746d612047616e64686920537461747565",

    },
    {
        "name": "KFC",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0803975,
        "lat": 21.1432571,
        "formatted": "KFC, Amravati Road, Ramdaspeth, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "catering",
            "catering.fast_food"
        ],
        "place_id": "51884b8e3b25c5534059992a517fac243540f00103f90159e2f508010000009203034b4643",

    },
    {
        "name": "Pizza Hut",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.0803009,
        "lat": 21.1432189,
        "formatted": "Pizza Hut, Amravati Road, Ramdaspeth, Nagpur - 440012, Maharashtra, India",
        "categories": [
            "catering",
            "catering.restaurant",
            "catering.restaurant.pizza"
        ],
        "place_id": "51b8d562a623c5534059696a6dfea9243540f00103f9012f6d94b10100000092030950697a7a6120487574",

    },
    {
        "name": "Eternity Mall",
        "country": "India",
        "state": "Maharashtra",
        "lon": 79.08022817813524,
        "lat": 21.143152049999998,
        "formatted": "Eternity Mall, Wardha Road Flyover, Dhantoli, Nagpur - 411010, Maharashtra, India",
        "categories": [
            "building",
            "building.commercial",
            "commercial",
            "commercial.shopping_mall"
        ],
        "place_id": "513e05928b22c55340591c3ae206a4243540f00102f901a98ca01b0000000092030d457465726e697479204d616c6c",

    }
]

module.exports = { testData }