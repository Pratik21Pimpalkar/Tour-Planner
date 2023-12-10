const axios = require('axios');
const { testData } = require('./sampleData')

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function buildSortedGraph() {
    const graph = {};
    testData.forEach((node1, index1) => {
        graph[node1.name] = {
            data: node1,
            edges: {},
        };
        testData.forEach((node2, index2) => {
            if (index1 !== index2) {
                const distance = calculateDistance(
                    node1.lat,
                    node1.lon,
                    node2.lat,
                    node2.lon
                );
                graph[node1.name].edges[node2.name] = {
                    distance,
                    data: node2,
                };
            }
        });
        const sortedEdges = Object.values(graph[node1.name].edges).sort(
            (a, b) => a.distance - b.distance
        );
        graph[node1.name].edges = sortedEdges.reduce((acc, edge) => {
            acc[edge.data.name] = edge;
            return acc;
        }, {});
    });
    return graph;
}

function generateOptimalTour(startingPointLat, startingPointLon, interests) {
    const sortedGraph = buildSortedGraph();
    const tourPlan = [];
    const visitedInterests = {};

    // Helper function to check if all interests are covered
    function allInterestsCovered() {
        return Object.keys(placeType).every((interest) => visitedInterests[interest]);
    }

    let currentNode = null;

    // Find the nearest node to the starting point that matches user interests
    let minDistance = Infinity;
    for (const nodeName in sortedGraph) {
        const node = sortedGraph[nodeName];
        const distance = calculateDistance(
            startingPointLat,
            startingPointLon,
            node.data.lat,
            node.data.lon
        );

        // Check if the place belongs to any of the specified interests
        const interestCategories = node.data.categories.join(",");
        if (
            interests.some((interest) => interestCategories.includes(placeType[interest])) &&
            distance < minDistance
        ) {
            minDistance = distance;
            currentNode = node;
        }
    }

    // Perform greedy algorithm to generate the tour
    while (currentNode && !allInterestsCovered()) {
        const { data } = currentNode;

        // Check if the place belongs to any of the specified interests
        Object.entries(placeType).forEach(([interest, categories]) => {
            const interestCategories = categories.split(",");
            if (
                interestCategories.some((category) =>
                    data.categories.includes(category)
                ) &&
                !visitedInterests[interest]
            ) {
                // For restaurants, add up to 2 places with the same interest
                if (interest === 'restaurant') {
                    if (!visitedInterests[interest]) {
                        visitedInterests[interest] = true;
                        tourPlan.push({ ...data });
                    } else if (tourPlan.filter(place => place.categories.includes('catering')).length < 2) {
                        tourPlan.push({ ...data });
                    }
                } else {
                    visitedInterests[interest] = true;
                    tourPlan.push({ ...data });
                }
            }
        });

        delete sortedGraph[currentNode.data.name]; // Mark node as visited

        let nextNode = null;
        let minEdgeDistance = Infinity;

        // Find the nearest unvisited neighbor
        for (const neighborName in currentNode.edges) {
            const neighbor = currentNode.edges[neighborName];
            if (
                sortedGraph[neighbor.data.name] &&
                neighbor.distance < minEdgeDistance
            ) {
                minEdgeDistance = neighbor.distance;
                nextNode = sortedGraph[neighbor.data.name];
            }
        }

        currentNode = nextNode;
    }

    return tourPlan;
}


const placeType = {
    hotels: "accomodation",
    shopping: "commercial",
    restaurant: "catering",
    fun: "entertainment",
    park: "national_park,beach",
    tourism: "tourism,building.tourism",
    religious: "religion",
    sport: "sport",
}

const generateTourAPI = async (req, res) => {
    try {
        // let lng = 79.06031117301508
        // let lat = 21.179601416524175
        // let categoriesList = req.body.categoriesList;
        // console.log(categoriesList);
        // const apiUrl = 'https://api.geoapify.com/v2/places';
        // let categories = categoriesList.map(category => placeType[category]).join(',');
        // let filter = `circle:${lng},${lat},100000`;
        // let bias = `proximity:${lng},${lat}`;
        // let limit = 5;
        // let apiKey = '6ad67642e2f94ad99d6fc359677c6706';
        // let params = {
        //     categories,
        //     filter,
        //     bias,
        //     limit,
        // };
        // const headers = {
        //     'Authorization': apiKey
        // };
        // const { data } = await axios.get(apiUrl, { params, headers })
        // const extractedData = extractPropertiesForList(data.features, propertiesToExtract)
        // return res.json(extractedData)

        const startingPointLat = 21.179581408263445;
        const startingPointLon = 79.0602468;
        const interests = ["tourism", "restaurant"]
        const tourPlan = generateOptimalTour(startingPointLat, startingPointLon, interests);
        console.log("Optimal Tour Plan:", tourPlan);
        return res.json(tourPlan)

    } catch (error) {
        console.log(error);
        return res.json({ message: "true" })
    }
}

const propertiesToExtract = [
    "name",
    "country",
    "state",
    "state_district",
    "lon",
    "lat",
    "formatted",
    "categories",
    "place_id",
    "distance"
];

function extractPropertiesForList(dataList, properties) {
    return dataList.map(dataItem => {
        const extractedData = {};
        properties.forEach(property => {
            extractedData[property] = dataItem.properties[property];
        });
        return extractedData;
    });
}


module.exports = { generateTourAPI }