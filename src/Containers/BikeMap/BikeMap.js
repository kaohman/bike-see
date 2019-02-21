import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer, withLeaflet } from 'react-leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search';
import L from 'leaflet';
import { connect } from 'react-redux';

const ReactLeafletSearchWithLeaflet = withLeaflet(ReactLeafletSearch);

export class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 50.7506298,
      lon: -100.99664349999999,
      loading: true,
      userChange: false,
    }
  }

  getLocation = () => {
    this.setState({
      lat: 0,
      lon: 0
    })
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        loading: false,
      });
    });
  }

  showCurrentLocation = () => {
    const { lat, lon } = this.state;
    return (
      <Marker
        position={[lat, lon]}
        key={'geoloc'}
        id={'geoloc'}>
        <Tooltip>You are here</Tooltip>
      </Marker>
    )
  }

  markersToShow = () => {
    const cityIcon = new L.icon({
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
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
  componentDidMount() {
    this.getLocation();
  }

  render() {
    // This setTimeout is needed in order for map to render tiles properly. Found this suggested fix online - something about needing css modules to load first. It slows down the map a ton though.
    // setTimeout(() => {
    //   this.setState({ loading: false })
    // }, 100);
    const { lat, lon, loading } = this.state;
    return (
      <div className='map-container'>
        <i onClick={this.getLocation} className="fas fa-location-arrow"></i>
        {!loading && 
          <Map
            onViewportChange={() => this.setState({ userChange: true})}
            id='map'
            minZoom='3'
            maxZoom='19'
            center={[lat, lon]}
            zoom='12'>
            {this.showCurrentLocation()}
            {this.markersToShow()}
            <ReactLeafletSearchWithLeaflet 
              position='topright'
              inputPlaceholder="Search by location"
              showMarker={false}
              showPopup={true}
              openSearchOnLoad={true}
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