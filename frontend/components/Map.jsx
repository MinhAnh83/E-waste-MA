import { MapContainer, TileLayer, useMap, Marker,Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
export default function Map(){

    return(
<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{width:"700px",height:"400px"}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>

  <Marker position={[55.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    )
}