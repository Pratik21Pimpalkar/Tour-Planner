const fs = require('fs');
const csv = require('csv-parser');

class Graph {
    constructor() {
        this.nodes = new Map();
    }
    addNode(id, lat, lng, ratings, interest, spendtime, name) {
        this.nodes.set(id, { id, lat, lng, ratings, interest, spendtime, name, neighbors: new Map() });
    }
    addEdge(node1, node2) {
        const distance = calculateDistance(this.nodes.get(node1), this.nodes.get(node2));
        this.nodes.get(node1).neighbors.set(node2, distance);
        this.nodes.get(node2).neighbors.set(node1, distance);
    }
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function calculateDistance(node1, node2) {
    const R = 6371;
    const dLat = degToRad(node2.lat - node1.lat);
    const dLng = degToRad(node2.lng - node1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degToRad(node1.lat)) * Math.cos(degToRad(node2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

let csvData = []
function readNodesFromCSV(filePath) {
    const graph = new Graph();
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                csvData.push(row);
                // Assuming your CSV has 'id', 'lat', and 'lng' columns
                const { id, lat, lng, ratings, interest, spendtime, name } = row;
                graph.addNode(id, parseFloat(lat), parseFloat(lng), parseFloat(ratings), interest, parseFloat(spendtime), name);
            })
            .on('end', () => {
                resolve(graph);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

const getPlace = async (req, res) => {
    console.log(req.body);
    const currLocLng = req.body.longitude
    const currLocLat = req.body.latitude
    const userInterests = req.body.interest
    const noOfDays = 2
    const maxDistancePerDay = 30
    const filePath = './data.csv';
    try {
        const graph = await readNodesFromCSV(filePath);

        // Find the nearest node to the current location
        let nearestNodeId = null;
        let nearestDistance = Infinity;

        graph.nodes.forEach((node) => {
            const distance = calculateDistance(
                { lat: currLocLat, lng: currLocLng },
                { lat: node.lat, lng: node.lng }
            );

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestNodeId = node.id;
            }
        });
        // Add edges to the graph based on distances between nodes
        if (nearestNodeId) {
            graph.nodes.forEach((node1) => {
                graph.nodes.forEach((node2) => {
                    if (node1 !== node2) {
                        graph.addEdge(node1.id, node2.id);
                    }
                });
            });

            graph.nodes.forEach(n => {
                const neighborsArray = Array.from(n.neighbors.entries());
                // Sort the array based on the values
                neighborsArray.sort((a, b) => a[1] - b[1]);
                n.neighbors.clear();

                // Set the sorted entries to the original map
                neighborsArray.forEach(([key, value]) => {
                    n.neighbors.set(key, value);
                });

            })

            // graph.nodes.forEach((node) => {
            //     console.log(`Node ${node.id} Neighbors:`, Array.from(node.neighbors.entries()));
            // });

            // Find the best route starting from the specified node
            const tour = createDayWiseTourWithDistanceAndNoRepeat(graph, nearestNodeId, noOfDays, userInterests, maxDistancePerDay)
            res.json({ bestRoute: tour });
        } else {
            res.status(404).json({ error: 'No suitable starting node found near the current location' });
        }
    } catch (error) {
        console.error('Error reading CSV file:', error);
        res.status(500).json({ error: 'Error reading CSV file' });
    }
}

function findBestRoute(graph, startingNodeId, numberOfNodes, userInterests) {
    const visited = new Set();
    const route = [startingNodeId + ''];
    visited.add(startingNodeId + '')
    let currentNodeId = startingNodeId;

    while (route.length < numberOfNodes) {
        visited.add(currentNodeId);
        const currentNode = graph.nodes.get(currentNodeId + '');

        if (!currentNode || !currentNode.neighbors) {
            // Break the loop if the current node or its neighbors are undefined
            break;
        }

        const neighbors = Array.from(currentNode.neighbors.entries());

        // Sort neighbors by a cost function that considers ratings, distance, and interests
        neighbors.sort((a, b) => {
            const distanceA = a[1];
            const distanceB = b[1];
            const ratingsA = graph.nodes.get(a[0]).ratings || 0;
            const ratingsB = graph.nodes.get(b[0]).ratings || 0;
            const interestA = graph.nodes.get(a[0]).interest || '';
            const interestB = graph.nodes.get(b[0]).interest || '';

            // Define weights for ratings, distance, and interests
            const ratingsWeight = 0.5; // Adjust based on your priorities
            const distanceWeight = 0.3; // Adjust based on your priorities
            const interestWeight = 0.2; // Adjust based on your priorities

            // Calculate cost function
            const costA = ratingsWeight * ratingsA - distanceWeight * distanceA + calculateInterestScore(interestA, userInterests) * interestWeight;
            const costB = ratingsWeight * ratingsB - distanceWeight * distanceB + calculateInterestScore(interestB, userInterests) * interestWeight;

            return costB - costA; // Higher cost (better balance) first
        });

        // Find the next unvisited node to visit
        let nextNode = null;
        for (const [neighborId, _] of neighbors) {
            const neighborInterest = graph.nodes.get(neighborId).interest || '';
            if (!visited.has(neighborId) && interestsMatch(neighborInterest, userInterests)) {
                nextNode = neighborId;
                break;
            }
        }

        // If no unvisited neighbors with matching interests, consider places with different interests
        if (!nextNode) {
            for (const [neighborId, _] of neighbors) {
                if (!visited.has(neighborId)) {
                    nextNode = neighborId;
                    break;
                }
            }
        }

        // If still no unvisited neighbors, break the loop
        if (!nextNode) {
            break;
        }

        // Update current node and add to route
        currentNodeId = nextNode;
        route.push(currentNodeId);
    }

    return route;
}

function calculateInterestScore(placeInterest, userInterests) {
    // Calculate a score based on how many user interests match the place's interest
    return userInterests.filter(userInterest => placeInterest.includes(userInterest)).length;
}

function interestsMatch(placeInterest, userInterests) {
    // Check if any of the user's interests match the place's interest
    return userInterests.some(userInterest => placeInterest.includes(userInterest));
}

function createDayWiseTourWithDistanceAndNoRepeat(graph, startingNodeId, numberOfDays = 1, userInterests, maxDistancePerDay) {
    const dayWiseTour = [];

    const visitedPlaces = new Set();
    for (let day = 1; day <= numberOfDays; day++) {
        const dailyTourIds = findBestRouteWithDistanceAndNoRepeat(graph, startingNodeId, 6, userInterests, maxDistancePerDay, visitedPlaces);
        const dailyTour = dailyTourIds.map(placeId => graph.nodes.get(placeId));
        const totalDistance = calculateTotalDistance(graph, dailyTour);

        dayWiseTour.push({ day, totalDistance, places: dailyTour });


        // Update starting node for the next day
        if (dailyTour.length > 0) {
            startingNodeId = dailyTour[dailyTour.length - 1].id;
        } else {
            // If no places are visited, break the loop
            break;
        }
    }
    console.log(visitedPlaces);
    return dayWiseTour;
}

function calculateTotalDistance(graph, tour) {
    let totalDistance = 0;

    for (let i = 0; i < tour.length - 1; i++) {
        const node1 = graph.nodes.get(tour[i].id);
        const node2 = graph.nodes.get(tour[i + 1].id);

        if (node1 && node2 && node1.neighbors.has(node2.id)) {
            totalDistance += node1.neighbors.get(node2.id);
        }
    }

    return totalDistance;
}

function findBestRouteWithDistanceAndNoRepeat(graph, startingNodeId, numberOfNodes, userInterests, maxDistancePerDay, visitedPlaces) {
    // const visited = new Set();
    const route = [startingNodeId + ''];
    // visited.add(startingNodeId + '');
    visitedPlaces.add(startingNodeId + ''); // Mark the starting node as visited for the current day
    let currentNodeId = startingNodeId;
    let totalDistance = 0;

    while (route.length < numberOfNodes && totalDistance <= maxDistancePerDay) {
        visitedPlaces.add(currentNodeId);
        const currentNode = graph.nodes.get(currentNodeId + '');

        if (!currentNode || !currentNode.neighbors) {
            // Break the loop if the current node or its neighbors are undefined
            break;
        }

        const neighbors = Array.from(currentNode.neighbors.entries());

        // Sort neighbors by a cost function that considers ratings, distance, and interests
        neighbors.sort((a, b) => {
            const distanceA = a[1];
            const distanceB = b[1];
            const ratingsA = graph.nodes.get(a[0]).ratings || 0;
            const ratingsB = graph.nodes.get(b[0]).ratings || 0;
            const interestA = graph.nodes.get(a[0]).interest || '';
            const interestB = graph.nodes.get(b[0]).interest || '';

            // Define weights for ratings, distance, and interests
            const ratingsWeight = 0.5;
            const distanceWeight = 0.3;
            const interestWeight = 0.2;

            // Calculate cost function
            const costA = ratingsWeight * ratingsA - distanceWeight * distanceA + calculateInterestScore(interestA, userInterests) * interestWeight;
            const costB = ratingsWeight * ratingsB - distanceWeight * distanceB + calculateInterestScore(interestB, userInterests) * interestWeight;

            return costB - costA; // Higher cost (better balance) first
        });

        // Find the next unvisited node to visit
        let nextNode = null;
        for (const [neighborId, distance] of neighbors) {
            const neighborInterest = graph.nodes.get(neighborId).interest || '';
            if (!visitedPlaces.has(neighborId) && interestsMatch(neighborInterest, userInterests) && totalDistance + distance <= maxDistancePerDay) {
                nextNode = neighborId;
                totalDistance += distance;
                visitedPlaces.add(neighborId); // Mark the neighbor as visited for the current day
                break;
            }
        }

        // If no unvisited neighbors with matching interests or within distance limit, break the loop
        if (!nextNode) {
            break;
        }

        // Update current node and add to route
        currentNodeId = nextNode;
        route.push(currentNodeId);
    }

    // Reset visited places for the next day

    return route;
}









module.exports = { getPlace }