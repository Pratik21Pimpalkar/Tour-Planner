// "use client"

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { markerData } from "./constants";
// import * as tt from "@tomtom-international/web-sdk-maps";

const Map = () => {
    const tourData = useSelector(state => state.tripPlan)
    const MAX_ZOOM = 27;
    const mapElement = useRef();
    const [map, setMap] = useState({});
    const [mapInitialized, setMapInitialized] = useState(false);

    useEffect(() => {
        const initTT = async () => {
            try {
                const tt = await import('@tomtom-international/web-sdk-maps');
                const ts = await import("@tomtom-international/web-sdk-services");

                let map = tt.map({
                    key: 'mYu59YkyE6SjkvR1ABG179pVhTRvVBc6',
                    container: mapElement.current,
                    center: [79.06169371534256, 21.17697597847198],
                    zoom: 10,
                });
                map.on('load', () => {
                    map.addControl(new tt.GeolocateControl());
                    map.addControl(new tt.FullscreenControl());
                    map.addControl(new tt.NavigationControl());
                    map.addControl(new tt.ScaleControl());
                    tourData.data && tourData.data?.tourPlan?.length > 0 && tourData.data?.tourPlan?.forEach(async (marker, index) => {
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
                            .setLngLat([marker.lon, marker.lat])
                            .addTo(map);

                        const popup = new tt.Popup({ offset: 30, className: 'custom-popup' })
                            .setHTML(`<h3>${index + 1} - ${marker.name}</h3>`);
                        markerElement.setPopup(popup);

                        // Add route to next marker (if not the last marker)
                        if (index < tourData.data.tourPlan.length - 1) {
                            const routes = await ts.services
                                .calculateRoute({
                                    key: 'mYu59YkyE6SjkvR1ABG179pVhTRvVBc6',
                                    locations: [
                                        { lat: marker.lat, lon: marker.lon },
                                        { lat: tourData.data.tourPlan[index + 1].lat, lon: tourData.data.tourPlan[index + 1].lon }
                                    ],
                                })

                            // console.log(routes)
                            const routeCoordinates = routes.routes[0].legs[0].points.map(point => {
                                return [point.lon, point.lat];
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
                    const center = new tt.LngLat(tourData.data.tourPlan[0].lon, tourData.data.tourPlan[0].lat);
                    map.setCenter(center)
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
        <div className="p-4 ">
            <div className="h-[25rem] w-4/5 mx-auto">
                <div ref={mapElement} className="mapDiv w-full h-full" />
            </div>

            <div>
                <p className="text-center my-2 text-2xl font-bold text-slate-800">Place You Can Visit</p>
                <p className="text-center mb-10 text-sm font-bold text-slate-800">Cost effective plan in this order</p>
            </div>
            <div className="grid grid-cols-4     gap-3">
                {
                    tourData.data && tourData.data?.tourPlan?.map((data, index) => (
                        <div className="p-3 bg-slate-300 w-full rounded-md shadow-xl">
                            <p className="text-lg font-medium uppercase text-gray-700 my-2 ">{index + 1}{"."} {data.name}</p>
                            <p className="text-sm font-normal italic">{data.formatted}</p>
                            <p className="flex flex-wrap gap-2 mt-2">{data.categories.map((s) => {
                                return <span className="text-xs p-2 bg-slate-500 rounded-sm text-white">{s}</span>
                            })}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Map