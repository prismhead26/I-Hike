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
  // retrieve the trail from the state that was passed from link in Home.jsx
  const trail = useLocation().state?.trail;
  console.log("trail State...", trail);

  const map = useMap();

  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <div>
      {trail && trail.location && (
        <div>
          <h1>{trail.name}</h1>
          <p>{trail.description}</p>
          <Map
            mapId={"map"}
            style={{ width: "50vw", height: "50vh" }}
            defaultCenter={trail.location}
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
                    console.log("clicked on marker state.coordsResult", trail);
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
                      <h1>{trail.name}</h1>
                      <p>{trail.formatted_address}</p>
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
