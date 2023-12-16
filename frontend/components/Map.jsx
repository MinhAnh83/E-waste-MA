import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useState, useEffect } from 'react'
import { icon } from "leaflet"
import { useMapEvents } from 'react-leaflet/hooks'
import "leaflet/dist/leaflet.css";
 
export default function Map({ markerList = [] ,
  center = [10.861481, 106.6194982], zoom = 16, 
  scrollWheelZoom = true, height = "300px", width = "100%", handleClickMapCb
}) {
  const [markers, setMarkers] = useState(markerList)
  const [selectedMarkerPosition, setSelectedMarkerPosition] = useState([0, 0])

  const getIcon = (marker) => {
    const ICON = icon({
      iconUrl: marker.iconUrl || "../assets/img/icon-location.png",
      iconSize: [35, 35],
    })
    return ICON
  }

  function Mark() {
    const map = useMapEvents({
      click: ({ latlng = {} }) => {
        console.log(latlng.lat)
        setSelectedMarkerPosition([latlng.lat, latlng.lng])
        console.log(latlng)
        handleClickMapCb && handleClickMapCb(latlng)
      },
    });
    return <Marker position={selectedMarkerPosition} icon={getIcon({})}></Marker>
  }

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom} style={{ height: height, width: width }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        markers.map((marker, index) => {
          return (<Marker position={marker.position} key={index}
                icon={getIcon(marker)}>
                  <Popup>
                    { marker.popupContent }
                  </Popup>
                </Marker>)
        })
      }
      {
        handleClickMapCb ? <Mark></Mark> : null
      }
    </MapContainer>
  )
}