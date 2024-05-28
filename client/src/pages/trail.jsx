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
import { useLocation } from "react-router-dom";

// api key for google maps
const apiKey = "AIzaSyA1pDFcj5Ge7lM9Gpj4-b4aI874D0aG7iA";

const CustomMap = () => {
  let trailCoords = [];
  // retrieve the trail from the state that was passed from link in Home.jsx
  const location = useLocation();
  const { state: props } = location;
  console.log("props...", props);

  //   const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const map = useMap();
  const placesLib = useMapsLibrary("places");

  //   create test trail
  const trail = {
    placeId: "ChIJ88_pHgHsa4cR9lKp4yqutgQ",
    latitude: 39.997246,
    longitude: -105.280243,
    location: { lat: 39.997246, lng: -105.280243 },
    name: "Enchanted Mesa Trail",
    description: "Enchanted Mesa Trail is a trail in Colorado, USA",
  };

  const [state, setState] = useState({
    center: { lat: trail.latitude, lng: trail.longitude },
    trail: [],
  });

  const center = trail.location;

  useEffect(() => {
    if (!placesLib || !map) return;

    //  display the trail on the map from placeId
    const request = {
      placeId: trail.placeId,
      fields: ["name", "geometry", "formatted_address"],
    };

    const service = new placesLib.PlacesService(map);
    service.getDetails(request, (place, status) => {
      if (status === placesLib.PlacesServiceStatus.OK) {
        console.log("place...", place);
        console.log("place location...", place.geometry.location.lat());
        console.log("place location...", place.geometry.location.lng());
        trailCoords.push(place);
        setState({
          trail: trailCoords,
        });
        console.log("state...", state);
        setLoading(false);
      }
    });
  }, [placesLib, map]);

  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {trail && (
        <div>
          <h1>{trail.name}</h1>
          <p>{trail.description}</p>
          <Map
            mapId={"map"}
            style={{ width: "50vw", height: "50vh" }}
            defaultCenter={center}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            {/* diplay advanced marker and infoWindow */}
            {map && (
              <>
                <AdvancedMarker
                  key={trail.placeId}
                  position={trail.location}
                  title={trail.name}
                  onClick={() => {
                    console.log("clicked on marker", state.trail);
                    handleMarkerClick();
                  }}
                  ref={markerRef}
                />
                {infoWindowShown && (
                  <InfoWindow
                    anchor={marker}
                    onCloseClick={handleClose}
                    options={{ maxWidth: 300 }}
                  >
                    <div>
                      <h1>{state.trail.name}</h1>
                      <p>{trail.description}</p>
                    </div>
                  </InfoWindow>
                )}
              </>
            )}
          </Map>
        </div>
      )}
    </div>
  );
};

export default function Trail() {
  return (
    <APIProvider apiKey={apiKey}>
      <CustomMap />
    </APIProvider>
  );
}
