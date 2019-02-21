import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search';
import MapSearch from '../../Components/MapSearch/MapSearch';
import L from 'leaflet';
import { connect } from 'react-redux';

export class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  markersToShow = () => {
    const cityIcon = new L.icon({
      iconSize: [15, 24.6],
      iconAnchor: [7.5, 24.6],
      popupAnchor: [1, -20],
      shadowSize: [24.6, 24.6],
      shadowUrl: require('../../images/marker-shadow.png'),
      iconUrl: require('../../images/marker-icon-violet.png')
    });

    return this.props.cities.map(network => {
      const { name, id} = network;
      const { city, country, latitude, longitude } = network.location;
      return (
        <Marker
          position={[latitude, longitude]}
          icon={cityIcon}
          key={id}
          id={id}>
          <Tooltip>{`${name}, ${city}, ${country}`}</Tooltip>
        </Marker>
      )
    });
  }

  render () {
    // This setTimeout is needed in order for map to render tiles properly. Found this suggested fix online - something about needing css modules to load first. It slows down the map a ton though.
    // setTimeout(() => {
    //   this.setState({ loading: false })
    // }, 0);
    return (
      <div className='map-container'>
        {!this.state.loading && 
          <Map
            onresize
            id='map'
            minZoom='3'
            maxZoom='19'
            center={[30, 0]}
            zoom='3'>
            {this.markersToShow()}
            {/* MapSearch is my withLeaflet wrapper on ReactLeafletZoomIndicator - I also tried wrapping it directly in this file */}
            <MapSearch />
            {/* ReactLeaflet search is the search bar component - see BikeMap.scss for styling I added */}
            <ReactLeafletSearch 
              id='search-bar'
              position='topright'
              inputPlaceholder="Search a location"
              showMarker={true}
            />
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              subdomains='abcd'
              minZoom='3'
              maxZoom='19'
              ext='png'
            />
          </Map>
        }
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