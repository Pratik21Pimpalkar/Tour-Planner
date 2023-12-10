// "use client"

import { useEffect, useRef, useState } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { markerData } from "./constants";
// import * as tt from "@tomtom-international/web-sdk-maps";

const Map = () => {
    const MAX_ZOOM = 27;
    const mapElement = useRef();
    const [mapLongitude, setMapLongitude] = useState( 79.06169371534256);
    const [mapLatitude, setMapLatitude] = useState(  21.17697597847198);
    const [mapZoom, setMapZoom] = useState(13);
    const [map, setMap] = useState({});
    const [mapInitialized, setMapInitialized] = useState(false);
    const increaseZoom = () => {
        if (mapZoom < MAX_ZOOM) {
            setMapZoom(mapZoom + 1);
        }
    };

    const decreaseZoom = () => {
        if (mapZoom > 1) {
            setMapZoom(mapZoom - 1);
        }
    };

    const updateMap = () => {
        map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
        map.setZoom(mapZoom);
    };
    useEffect(() => {
        const initTT = async () => {
            try {
                const tt = await import('@tomtom-international/web-sdk-maps');
                const ts = await import("@tomtom-international/web-sdk-services");

                let map = tt.map({
                    key: 'mYu59YkyE6SjkvR1ABG179pVhTRvVBc6',
                    container: mapElement.current,
                    center: [mapLongitude, mapLatitude],
                    zoom: mapZoom,
                });
                map.on('load', () => {
                    map.addControl(new tt.GeolocateControl());
                    map.addControl(new tt.FullscreenControl());
                    map.addControl(new tt.NavigationControl());
                    map.addControl(new tt.ScaleControl());
                    markerData.forEach(async (marker, index) => {
                        const color = [
                            "#FF5733", "#FFC300", "#4CAF50", "#3498DB", "#9B59B6",
                            "#E74C3C", "#2ECC71", "#3498DB", "#F39C12", "#E74C3C",
                            "#2E86C1", "#27AE60", "#FF6347", "#FFD700", "#32CD32",
                            "#4169E1", "#8A2BE2", "#FF4500", "#00CED1", "#9400D3",
                            "#FF1493", "#FFA07A", "#00FF7F", "#1E90FF", "#9932CC",
                            "#DC143C", "#00FA9A", "#4682B4", "#8B008B", "#FFD700",
                            "#ADFF2F", "#FF69B4", "#FF6347", "#7CFC00", "#8A2BE2",
                            "#00BFFF", "#FF8C00", "#48D1CC", "#800080", "#FF4500"
                        ];
                        const markerElement = new tt.Marker({ color: color[index % 40] })
                            .setLngLat([marker.lng, marker.lat])
                            .addTo(map);

                        const popup = new tt.Popup({ offset: 30, className: 'custom-popup' })
                            .setHTML(`<h3>${index + 1} - ${marker.name}</h3>`);
                        markerElement.setPopup(popup);

                        // Add route to next marker (if not the last marker)
                        if (index < markerData.length - 1) {
                            const routes = await ts.services
                                .calculateRoute({
                                    key: 'mYu59YkyE6SjkvR1ABG179pVhTRvVBc6',
                                    locations: [
                                        { lat: marker.lat, lon: marker.lng },
                                        { lat: markerData[index + 1].lat, lon: markerData[index + 1].lng }
                                    ],
                                })

                            // console.log(routes)
                            const routeCoordinates = routes.routes[0].legs[0].points.map(point => {
                                // console.log(point)
                                return [point.lng, point.lat];
                            })
                            console.log(routeCoordinates);

                            map.addSource(`route-${index}`, {
                                type: 'geojson',
                                data: {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: routeCoordinates,
                                    },
                                },
                            });

                            map.addLayer({
                                id: `route-${index}`,
                                type: 'line',
                                source: `route-${index}`,
                                layout: {
                                    'line-join': 'round',
                                    'line-cap': 'round',
                                },
                                paint: {
                                    'line-color': color[index % 40],
                                    'line-width': 5,
                                },
                            });
                        }
                    });
                })
                setMap(map); setMapInitialized(true);
                return () => map.remove();

            } catch (error) {
                console.error("Error initializing TomTom map:", error);
            }
        };
        initTT();
        if (!mapInitialized) {
            initTT();
        }

        return () => {
            // Cleanup function (e.g., remove event listeners, clear intervals)
            // This will be called when the component unmounts
            if (mapInitialized) {
                setMapInitialized(false);
            }
        };

    }, [mapInitialized]);

    return (
        <div className="h-[800px] w-[1000px] flex justify-center">
            <div ref={mapElement} className="mapDiv w-full h-full" />
        </div>
    )
}

export default Map