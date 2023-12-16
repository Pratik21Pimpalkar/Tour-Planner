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

function buildSortedGraph(data) {
    const graph = {};
    data.forEach((node1, index1) => {
        graph[node1.name] = {
            data: node1,
            edges: {},
        };
        data.forEach((node2, index2) => {
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


function generateOptimalTour(data, startingPointLat, startingPointLon, maxDistancePerDay) {
    const sortedGraph = buildSortedGraph(data);
    const tourPlan = [];
    const visitedNodes = new Set();

    // Find the nearest node to the starting point
    let minDistance = Infinity;
    let currentNode = null;

    for (const nodeName in sortedGraph) {
        const node = sortedGraph[nodeName];
        const distance = calculateDistance(
            startingPointLat,
            startingPointLon,
            node.data.lat,
            node.data.lon
        );
        if (distance < minDistance) {
            minDistance = distance;
            currentNode = node;
        }
    }

    while (currentNode && tourPlan.length < 12 && minDistance <= maxDistancePerDay) {
        const { data } = currentNode;

        // Calculate distance only if there's a previous node in the tour
        if (tourPlan.length > 0) {
            const previousNode = tourPlan[tourPlan.length - 1];
            minDistance = calculateDistance(
                previousNode.lat,
                previousNode.lon,
                data.lat,
                data.lon
            );
        }

        tourPlan.push({ ...data, edges: undefined, distance: minDistance });
        visitedNodes.add(currentNode.data.name);

        // Find the nearest unvisited neighbor
        let nextNode = null;
        let minEdgeDistance = Infinity;

        for (const neighborName in currentNode.edges) {
            const neighbor = currentNode.edges[neighborName];
            if (!visitedNodes.has(neighbor.data.name) && neighbor.distance < minEdgeDistance) {
                minEdgeDistance = neighbor.distance;
                nextNode = sortedGraph[neighbor.data.name];
            }
        }

        currentNode = nextNode;
    }

    return { tourPlan, totalDistance: minDistance };
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
        console.log(req.body);
        let lng = req.body.lng
        let lat = req.body.lat
        let categoriesList = req.body.interest;
        const apiUrl = 'https://api.geoapify.com/v2/places';
        let categories = categoriesList.map(category => category).join(',');
        console.log(categories);
        let filter = `circle:${lng},${lat},300000`;
        // let bias = `proximity:${lng},${lat}`;
        let limit = 30;
        let apiKey = '6ad67642e2f94ad99d6fc359677c6706';
        let params = {
            categories,
            filter,
            // bias,
            limit,
        };
        const headers = {
            'Authorization': apiKey
        };
        const { data } = await axios.get(apiUrl, { params, headers })
        const extractedData = extractPropertiesForList(data.features, propertiesToExtract)
        console.log(extractedData);
        // return res.json(extractedData)
        const startingPointLat = req.body.lat;
        const startingPointLon = req.body.lng;
        const maxDistancePerDay = 10;
        // const interests = ["administrative.district_level"]
        // const interests = ["religion",
        //     "beach",
        //     "tourism",]
        const tourPlan = generateOptimalTour(extractedData, startingPointLat, startingPointLon, maxDistancePerDay);
        // console.log("Optimal Tour Plan:", tourPlan);
        return res.status(200).json(tourPlan)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "true" })
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