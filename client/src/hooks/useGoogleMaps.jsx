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
const key = "AIzaSyA1pDFcj5Ge7lM9Gpj4-b4aI874D0aG7iA";

// fetch hiking trails function
export const useGoogleMaps = async () => {
  const initState = {
    location: { lat: 39.997246, lng: -105.280243 },
    radius: 500,
    query: "Hiking trails near me",
    type: "hiking_area",
    region: "us",
  };

  // set state to store trails
  const [trails, setTrails] = useState(null);

  const [googleMap, setGoogleMap] = useState(initState);

  // // useSatte to store the trails
  // const [state, setState] = useState({
  //   center: { lat: newLat, lng: newLng },
  //   coordsResult: [],
  // });

  // retrive the location as param and fetch the hiking trails near that location using useMapsLibrary
  // add api key to useMap
  const map = useMap(key);
  const placesLib = useMapsLibrary();

  useEffect(() => {
    const fetchHikingPlaces = () => {
      if (!placesLib || !map) return;

      const service = new placesLib.places.PlacesService(map);
      service.textSearch(initState, (results, status) => {
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
          setGoogleMap((prevState) => {
            console.log("prevState...", prevState);
            return {
              ...prevState,
              location: {
                lat: trails[0].location.lat,
                lng: trails[0].location.lng,
              },
            };
          });
          // set state to store the trails
          // setState({ ...state, coordsResult: trails });
        }
      });
    };

    fetchHikingPlaces();
  }, [googleMap.location.lat, googleMap.location.lng]);

  return {
    trails,
    googleMap,
  };

  //   return (
  //     <APIProvider apiKey={apiKey}>
  //       <Map
  //         mapStyle="mapbox://styles/mapbox/light-v9"
  //         initialViewState={{
  //           latitude: newLat,
  //           longitude: newLng,
  //           zoom: 12,
  //         }}
  //         width="100%"
  //         height="100%"
  //       >
  //         {state.coordsResult.map((trail, index) => (
  //           <AdvancedMarker
  //             key={index}
  //             latitude={trail.location.lat()}
  //             longitude={trail.location.lng()}
  //           >
  //             <InfoWindow>
  //               <div>
  //                 <h3>{trail.name}</h3>
  //                 <p>{trail.address}</p>
  //               </div>
  //             </InfoWindow>
  //           </AdvancedMarker>
  //         ))}
  //       </Map>
  //     </APIProvider>
  //   );
};
