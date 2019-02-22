import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer, withLeaflet } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { ReactLeafletSearch } from 'react-leaflet-search';
import L from 'leaflet';
import { connect } from 'react-redux';
import { fetchStations } from '../../thunks/fetchStations';

const MapSearch = withLeaflet(ReactLeafletSearch);

export class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      loading: true,
      markers: 'cities',
    }
  }

  getLocation = () => {
    this.setState({ lat: 0, lon: 0, markers: 'cities'});
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
        <Tooltip className='tooltip'>{<h4>You Are Here</h4>}</Tooltip>
      </Marker>
    )
  }

  getStations = (e) => {
    this.props.fetchStations(e.target.options.id);
    this.setState({ markers: 'stations' });
  }

  showMarkers = () => {
    let icon;
    if (this.state.markers === 'cities') {
      icon = new L.icon({
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowUrl: require('../../images/marker-shadow.png'),
        iconUrl: require('../../images/marker-icon-violet.png')
      })
    } else {
      icon = new L.icon({
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -25],
        iconUrl: require('../../images/bike.png')
      })
    }

    const data = this.state.markers === 'cities' ? this.props.cities : this.props.stations;

    return data.map(marker => {
      if (this.state.markers === 'cities') {
        const { name, id} = marker;
        const { city, country, latitude, longitude } = marker.location;
        return (
          <Marker
            onClick={this.getStations}
            position={[latitude, longitude]}
            icon={icon}
            key={id}
            id={id}>
            <Tooltip className='tooltip'>{
              <div>
                <h4>{name}</h4>
                <h4>{city}, {country}</h4>
                <p className='click-text'>Click to view stations</p>
              </div>}
            </Tooltip>
          </Marker>
        )
      } else {
        const { name, latitude, longitude, free_bikes, empty_slots, id } = marker;
        return (
          <Marker
            position={[latitude, longitude]}
            icon={icon}
            key={id}
            id={id}>
            <Tooltip className='tooltip'>{
              <div>
                <h4>{name}</h4>
                <p>empty slots: {empty_slots},</p>
                <p>free bikes: {free_bikes}</p>
                <p className='click-text'>Click to add to stops</p>
              </div>
            }</Tooltip>
          </Marker>
        )
      }
    });
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { lat, lon, loading } = this.state;
    return (
      <div className='map-container'>
        {!loading && <i onClick={this.getLocation} className="fas fa-location-arrow"></i>}
        {!loading && 
          <Map
            id='map'
            minZoom='3'
            maxZoom='19'
            center={[lat, lon]}
            zoom='13'>
            {this.showCurrentLocation()}
            {this.showMarkers()}
            <MapSearch 
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

export const mapDispatchToProps = (dispatch) => ({
  fetchStations: (id) => dispatch(fetchStations(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BikeMap);