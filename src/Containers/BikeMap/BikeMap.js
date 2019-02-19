import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

class BikeMap extends Component {

  render() {
    return (
      <div className="map-container">
        <Map
          id="map"
          minZoom='3'
          maxZoom='19'
          center={[30, 0]}
          zoom='3'>
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom='19'
          />
        </Map>
      </div>  
    )
  }
}

export default BikeMap;
