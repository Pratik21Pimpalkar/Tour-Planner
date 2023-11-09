const fs = require('fs');
const csv = require('csv-parser');

class Graph {
    constructor() {
        this.nodes = new Map();
    }
    addNode(id, lat, lng, ratings, interest, spendtime) {
        this.nodes.set(id, { id, lat, lng, ratings, interest, spendtime, neighbors: new Map() });
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
                const { id, lat, lng, ratings, interest, spendtime } = row;
                graph.addNode(id, parseFloat(lat), parseFloat(lng), parseFloat(ratings), interest, parseFloat(spendtime));
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
    const filePath = './data.csv';
    const startingNodeId = 3;
    const numberOfNodes = 10;
    try {
        const graph = await readNodesFromCSV(filePath);
        // Add edges to the graph based on distances between nodes
        graph.nodes.forEach((node1) => {
            graph.nodes.forEach((node2) => {
                if (node1 !== node2) {
                    graph.addEdge(node1.id, node2.id);
                }
            });
        });
        // console.log(graph);
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
        // const numberOfDays = 3; // Set the desired number of days
        // const userInterests = ['religious', 'wildlife', 'park', 'literature', 'fun', 'shopping']; // Set user interests
        // const dayWiseTour = createDayWiseTour(graph, startingNodeId, numberOfDays, userInterests);

        // console.log(dayWiseTour);

        // Find the best route starting from the specified node
        const userInterests = [""]
        const bestRoute = findBestRoute(graph, startingNodeId, numberOfNodes, userInterests);

        const tour = bestRoute.map((id) => graph.nodes.get(id));
        // const tour = bestRoute.map((id) => csvData.find((i) => i.id === id));
        res.json({ bestRoute: tour });
    } catch (error) {
        console.error('Error reading CSV file:', error);
        res.status(500).json({ error: 'Error reading CSV file' });
    }
}

// function findBestRoute(graph, startingNodeId, numberOfNodes) {
//     const visited = new Set();
//     const route = [startingNodeId + ''];
//     visited.add(startingNodeId + '')
//     let currentNodeId = startingNodeId;

//     while (route.length < numberOfNodes) {
//         visited.add(currentNodeId);
//         const currentNode = graph.nodes.get(currentNodeId + '');

//         if (!currentNode || !currentNode.neighbors) {
//             // Break the loop if the current node or its neighbors are undefined
//             break;
//         }

//         const neighbors = Array.from(currentNode.neighbors.entries());

//         // Sort neighbors by distance and rating
//         neighbors.sort((a, b) => {
//             const distanceA = a[1];
//             const distanceB = b[1];
//             const ratingsA = graph.nodes.get(a[0]).ratings || 0;
//             const ratingsB = graph.nodes.get(b[0]).ratings || 0;

//             // Define weights for ratings and distance
//             const ratingsWeight = 0.6; // Adjust based on your priorities
//             const distanceWeight = 0.4; // Adjust based on your priorities

//             // Calculate cost function
//             const costA = ratingsWeight * ratingsA - distanceWeight * distanceA;
//             const costB = ratingsWeight * ratingsB - distanceWeight * distanceB;

//             return costB - costA;
//         });
//         // Find the next unvisited node to visit
//         let nextNode = null;
//         for (const [neighborId, _] of neighbors) {
//             if (!visited.has(neighborId)) {
//                 nextNode = neighborId;
//                 break;
//             }
//         }

//         // If no unvisited neighbors, break the loop
//         if (!nextNode) {
//             break;
//         }

//         // Update current node and add to route
//         currentNodeId = nextNode;
//         route.push(currentNodeId);
//     }

//     return route;
// }

// ...

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

function createDayWiseTour(graph, startingNodeId, numberOfDays, userInterests) {
    const dayWiseTour = [];

    for (let day = 1; day <= numberOfDays; day++) {
        const dailyTour = findBestRoute(graph, startingNodeId, 6, userInterests);
        dayWiseTour.push({ day, places: dailyTour });

        // Update starting node for the next day
        if (dailyTour.length > 0) {
            startingNodeId = dailyTour[dailyTour.length - 1];
        } else {
            // If no places are visited, break the loop
            break;
        }
    }

    return dayWiseTour;
}





module.exports = { getPlace }