import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_FAVORITE, ADD_FUTURE } from "../utils/mutations";
//import { getHikeIdFromPlaceId } from '../../../server/utils/hikeUtils';

// api key for google maps
const apiKey = "AIzaSyA1pDFcj5Ge7lM9Gpj4-b4aI874D0aG7iA";

const CustomMap = () => {
  // retrieve the trail from the state that was passed from link in Home.jsx
  const trail = useLocation().state?.trail;
  console.log("trail State...", trail);

  const map = useMap();

  // create a reference for the marker and infoWindow
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
          <p>{trail.formatted_address}</p>
          <a
            className="btn btn-primary mb-3"
            // add a link to google maps directions to the trail using the trail placeId
            href={`https://www.google.com/maps/dir/?api=1&destination=${trail.location.lat},${trail.location.lng}`}
            // href={`https://www.google.com/maps/search/?api=1&query=${trail.name}`}
            target="_blank"
            rel="noreferrer"
          >
            Google Directions to {trail.name}
          </a>
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

const Trail = () => {
  const trail = useLocation().state?.trail;

  const [addFavoriteHike] = useMutation(ADD_FAVORITE);
  const [addFutureHike] = useMutation(ADD_FUTURE);

  const handleAddFavorite = async () => {
    try {
      await addFavoriteHike({ variables: { hike: trail } });
    } catch (e) {
      console.error("Error adding to favorite hikes:", e.message);
    }
  };

  const handleAddFuture = async () => {
    try {
      await addFutureHike({ variables: { hike: trail } });
    } catch (e) {
      console.error("Error adding to future hikes:", e.message);
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      <CustomMap />
      {trail && (
        <div>
          <button onClick={handleAddFavorite}>Add to Favorite Hikes</button>
          <button onClick={handleAddFuture}>Add to Future Hikes</button>
        </div>
      )}
    </APIProvider>
  );
};

export default Trail;
