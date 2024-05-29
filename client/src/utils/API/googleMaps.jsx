import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// api key for google maps
const apiKey = "AIzaSyA1pDFcj5Ge7lM9Gpj4-b4aI874D0aG7iA";

// fetch hiking trails function
const Markers = ({ coords }) => {
  // use state to store error
  const [error, setError] = useState(null);
  // use state to store the trails
  const [trails, setTrails] = useState(null);

  // retrive the location as param and fetch the hiking trails near that location using useMapsLibrary
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  useEffect(() => {
    if (!placesLib || !map) return;

    console.log("coords...", coords);

    const request = {
      location: coords,
      radius: 500,
      query: "Hiking trails near me",
      type: "hiking_area",
      region: "us",
    };

    const service = new placesLib.PlacesService(map);
    service.textSearch(request, (results, status) => {
      console.log("results...", results);
      console.log("status...", status);
      if (status === placesLib.PlacesServiceStatus.OK) {
        const trailResults = results.map((trail) => ({
          placeId: trail.place_id,
          name: trail.name,
          location: {
            lat: trail.geometry.location.lat(),
            lng: trail.geometry.location.lng(),
          },
          rating: trail.rating,
          formatted_address: trail.formatted_address,
        }));
        setTrails(trailResults);
      } else {
        setError("Failed to fetch hiking trails data");
      }
    });
  }, [map, placesLib]);

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const [selectedTrail, setSelectedTrail] = useState({});

  const handleMarkerClick = (trail) => {
    setInfoWindowShown((isShown) => !isShown);
    setSelectedTrail(trail);
  };

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    // display list of trails with a Link to the trail page for each trail
    <>
      {trails &&
        trails.map((trail) => (
          <>
            <AdvancedMarker
              key={trail.placeId}
              position={trail.location}
              title={trail.name}
              onClick={() => {
                console.log("clicked on marker state.coordsResult", trail);
                handleMarkerClick(trail);
              }}
            />
          </>
        ))}
      {infoWindowShown && (
        <InfoWindow
          position={selectedTrail.location}
          onCloseClick={handleClose}
          options={{
            maxWidth: 300,
            pixelOffset: new window.google.maps.Size(0, -40),
          }}
        >
          <div>
            <h3>{selectedTrail.name}</h3>
            <p>{selectedTrail.formatted_address}</p>
            <p>Rating: {selectedTrail.rating}</p>
            <Link
              to={{
                pathname: `/trail/${selectedTrail.placeId}`,
              }}
              state={{ trail: selectedTrail }}
              onClick={handleClose}
            >
              View Trail
            </Link>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default function TrailsMap({ coords }) {
  return (
    // add advanced marker to display all trails on the map
    <APIProvider apiKey={apiKey}>
      <Map
        mapId={"trailsMap"}
        style={{ width: "50vw", height: "50vh" }}
        defaultCenter={coords}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Markers coords={coords} />
      </Map>
    </APIProvider>
  );
}
