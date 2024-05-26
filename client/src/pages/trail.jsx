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

export default function Trail() {
  //   const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [mapsLibrary, setMapsLibrary] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [advancedMarkerRef, setAdvancedMarkerRef] = useState(null);

  const { google } = useMapsLibrary();
  const { map: mapObject } = useMap();

  //   create test trail
  const trail = {
    placeId: "ChIJrTLr-GyuEmsRBfy61i59si0",
    latitude: 37.7749295,
    longitude: -122.4194155,
    name: "San Francisco",
    description: "San Francisco is a city in California, USA",
  };

  const placesLib = useMapsLibrary().maps("places");

  const getTrail = useCallback(async () => {
    try {
      const svc = new placesLib.PlacesService(map);
      svc.getDetails(
        {
          placeId: trail.placeId,
        },
        (place, status) => {
          if (status === placesLib.PlacesServiceStatus.OK) {
            //   setTrail(place);
          }
        }
      );
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [map, trail.placeId]);

  useEffect(() => {
    getTrail();
  }, [getTrail]);

  useEffect(() => {
    if (mapObject) {
      setMap(mapObject);
    }
  }, [mapObject]);

  useEffect(() => {
    if (google) {
      setMapsLibrary(google);
    }
  }, [google]);

  const handleMarkerClick = (marker) => {
    if (marker === advancedMarkerRef.current) {
      setInfoWindow(marker);
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {trail && (
        <div>
          <h1>{trail.name}</h1>
          <p>{trail.description}</p>
          <APIProvider>
            <Map
              initialViewState={{
                latitude: trail.latitude,
                longitude: trail.longitude,
                zoom: 10,
              }}
              width="100%"
              height="500px"
            >
              {map && mapsLibrary && (
                <AdvancedMarker
                  ref={setAdvancedMarkerRef}
                  map={map}
                  mapsLibrary={mapsLibrary}
                  latitude={trail.latitude}
                  longitude={trail.longitude}
                  onClick={handleMarkerClick}
                >
                  {infoWindow && (
                    <InfoWindow
                      anchor={infoWindow}
                      onCloseClick={() => setInfoWindow(null)}
                    >
                      <div>
                        <h2>{trail.name}</h2>
                        <p>{trail.description}</p>
                      </div>
                    </InfoWindow>
                  )}
                </AdvancedMarker>
              )}
            </Map>
          </APIProvider>
        </div>
      )}
    </div>
  );
}
