import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";

// api key for google maps
const apiKey = "AIzaSyA1pDFcj5Ge7lM9Gpj4-b4aI874D0aG7iA";

// fetch hiking trails function
export const fetchHikingTrails = async (
  setTrails,
  setLoading,
  setError,
  newLat,
  newLng
) => {
  // useSatte to store the trails
  const [state, setState] = useState({
    center: { lat: newLat, lng: newLng },
    coordsResult: [],
  });

  // retrive the location as param and fetch the hiking trails near that location using useMapsLibrary
  const map = useMap();
  const placesLib = useMapsLibrary();

  setLoading(true);
  setError(null);
  setTrails(null);

  useEffect(() => {
    if (!placesLib || !map) return;

    const request = {
      location: { lat: newLat, lng: newLng },
      radius: 500,
      query: "Hiking trails near me",
      type: "hiking_area",
      region: "us",
    };

    const service = new placesLib.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      console.log("results...", results);
      console.log("status...", status);
      if (status === placesLib.places.PlacesServiceStatus.OK) {
        const trails = results.map((trail) => ({
          name: trail.name,
          location: trail.geometry.location,
          rating: trail.rating,
          address: trail.formatted_address,
        }));
        setTrails(trails);
        // set state to store the trails
        setState({ ...state, coordsResult: trails });
      } else {
        setError("Failed to fetch hiking trails data");
      }
      setLoading(false);
    });
  }, [newLat, newLng]);

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapStyle="mapbox://styles/mapbox/light-v9"
        initialViewState={{
          latitude: newLat,
          longitude: newLng,
          zoom: 12,
        }}
        width="100%"
        height="100%"
      >
        {state.coordsResult.map((trail, index) => (
          <AdvancedMarker
            key={index}
            latitude={trail.location.lat()}
            longitude={trail.location.lng()}
          >
            <InfoWindow>
              <div>
                <h3>{trail.name}</h3>
                <p>{trail.address}</p>
              </div>
            </InfoWindow>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
};
