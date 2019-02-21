import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

export class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  markersToShow = () => {
    return this.props.cities.map(network => {
      const { name, id} = network;
      const { city, country, latitude, longitude } = network.location;
      return (
        <Marker
          position={[latitude, longitude]}
          key={id}
          id={id}>
          <Tooltip>{`${name}, ${city}, ${country}`}</Tooltip>
        </Marker>
      )
    });
  }

  render () {
    // This setTimeout is needed in order for map to render tiles properly. Need css modules to load first.
    setTimeout(() => {
      this.setState({ loading: false })
    }, 100);
    return (
      <div className='map-container'>
        {!this.state.loading && <Map
          onresize
          id='map'
          minZoom='3'
          maxZoom='8'
          center={[30, 0]}
          zoom='3'>
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains='abcd'
            minZoom='3'
            maxZoom='19'
            ext='png'
          />
          {this.markersToShow()}
        </Map>}
      </div>  
    )
  }
}

export const mapStateToProps = (state) => ({
  cities: state.cities,
  stations: state.stations,
  favorites: state.favorites,
});

export default connect(mapStateToProps)(BikeMap);
