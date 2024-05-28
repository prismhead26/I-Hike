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
import { Link } from "react-router-dom";

// api key for google maps
const apiKey = "AIzaSyA1pDFcj5Ge7lM9Gpj4-b4aI874D0aG7iA";

// fetch hiking trails function
const MyMap = async ({ setTrails, setLoading, setError, coords }) => {
  // useSatte to store the trails
  const [state, setState] = useState({
    center: { lat: 39.997246, lng: -105.280243 } | coords,
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
      location: coords,
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
  }, [placesLib, map]);

  return (
    // display list of trails with a Link to the trail page for each trail
    <div>
      {state.coordsResult.map((trail, index) => (
        <div key={index}>
          {/* create Link for each trail to trail page with placeId */}
          <Link to={`/trail/${trail.placeId}`}>{trail.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default function TrailsMap({ setTrails, setLoading, setError, coords }) {
  return (
    // add advanced marker to display all trails on the map
    <APIProvider apiKey={apiKey}>
      <Map
        mapId={"trailsMap"}
        style={{ width: "50vw", height: "50vh" }}
        defaultCenter={{ lat: 39.997246, lng: -105.280243 } | coords}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <MyMap
          setTrails={setTrails}
          setLoading={setLoading}
          setError={setError}
          coords={coords}
        />
      </Map>
    </APIProvider>
  );
}
