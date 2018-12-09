import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap,Marker } from "react-google-maps";

const VehicleMap = withScriptjs(withGoogleMap((props) =>{
            //console.log(props);
             var lat=props.location.lat; 
             var lng=props.location.lng; 
             //console.log(lat,lng);
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  lat, lng:lng } }
        >
       <Marker
          position={props.location}
          //icon={}
       />;
      </GoogleMap>
    );
  }
))

export default VehicleMap;