import { useEffect, useState } from "react";
import "../css/TripMap.css";

function TripMap() {
  useEffect(() => {
    const mapcontainer = document.getElementById("map");
    new window.naver.maps.Map(mapcontainer);
    // const map = new window.naver.maps.Map(mapcontainer);
  }, []);
  const [UserPosition, setUserPosition] = useState({
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    const getUserLocation = async () => {
      await navigator.geolocation.getCurrentPosition((success) => {
        // UserPosition = {
        //   latitude: success.coords.latitude,
        //   longitude: success.coords.longitude,
        // };
        setUserPosition({
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        });
      });
    };
    getUserLocation();
  }, []);

  return (
    <div id="map" className="Map">
      {/* {UserPosition.latitude === ""
        ? "loading"
        : `${Math.floor(UserPosition.latitude)}+${Math.floor(
            UserPosition.longitude
          )}`} */}
    </div>
  );
}

export default TripMap;
