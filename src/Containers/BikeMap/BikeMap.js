import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer, withLeaflet } from 'react-leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search';
import L from 'leaflet';
import { connect } from 'react-redux';
import { fetchStations } from '../../thunks/fetchStations';
import { postFavorite } from '../../thunks/postFavorite';
import { deleteFavorite } from '../../thunks/deleteFavorite';
import PropTypes from 'prop-types';
import getDistance from 'geodist';

const MapSearch = withLeaflet(ReactLeafletSearch);

export class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      loading: true,
    }
  }

  getLocation = () => {
    this.setState({ lat: 0, lon: 0 });
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
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
    const { fetchStations, history } = this.props;
    fetchStations(e.target.options.id);
    localStorage.setItem('current-city', JSON.stringify(e.target.options.id));
    history.replace('/stations');
  }

  toggleFavorite = (e) => {
    const { id } = e.target.options;
    const { deleteFavorite, postFavorite, user, favorites } = this.props;
    favorites.includes(e.target.options.id) ? 
      deleteFavorite(id, user.id) :
      postFavorite(id, user.id);
    // this.setLocalStorage();
  }

  setLocalStorage = () => {
    localStorage.setItem('bike-stops', JSON.stringify(this.props.favorites));
  }

  createStationMarkers = (data, icon) => {
    return data.map(marker => {
      const { name, latitude, longitude, free_bikes, empty_slots, timestamp, id } = marker;
      const { favorites } = this.props;

      let newIcon;
      let buttonText;
      if (favorites.includes(id)) {
        newIcon = new L.icon({ ...icon, iconUrl: require('../../images/bike-purple.png') }); 
        buttonText = 'Click to remove from stops';
      } else {
        newIcon = new L.icon({ ...icon, iconUrl: require('../../images/bike.png') });
        buttonText = 'Click to add to stops';
      }
      
      const distance = getDistance({ lat: this.state.lat, lon: this.state.lon }, { lat: latitude, lon: longitude }, { exact: true, unit: 'mi' });
      const temp = new Date(timestamp);
      const date = temp.toDateString();
      const time = temp.toTimeString().substring(0,5);
      return (
        <Marker
          onClick={this.toggleFavorite}
          position={[latitude, longitude]}
          icon={newIcon}
          key={id}
          id={id}>
          <Tooltip className='tooltip'>{
            <div>
              <h4>{name}</h4>
              <p>Distance away: {distance.toFixed(1)} mi</p>
              <p>Empty slots: {empty_slots}</p>
              <p>Free bikes: {free_bikes}</p>
              <p>Updated: {date}, {time}</p>
              <p className='click-text'>{buttonText}</p>
            </div>
          }</Tooltip>
        </Marker>
      )
    });
  }

  createCityMarkers = (data, icon) => {
    return data.map(marker => {
      const { name, id } = marker;
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
    });
  }

  showMarkers = () => {
    const { pathname } = this.props.location;
    const { stations, cities, favorites } = this.props;
    let icon = {
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -25],
    };
    let data;

    switch (pathname) {
      case '/my-stops':
        data = stations.filter(station => favorites.includes(station.id));
        return this.createStationMarkers(data, icon)
      case '/stations':
        data = stations;
        return this.createStationMarkers(data, icon)
      default:
        const newIcon = new L.icon({
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
          shadowUrl: require('../../images/marker-shadow.png'),
          iconUrl: require('../../images/marker-icon-violet.png')
        });
        data = cities;
        return this.createCityMarkers(data, newIcon)
    }
  }

  componentDidMount() {
    this.getLocation();
    setTimeout(() => {
      this.setState({ loading: false })
    }, 100);
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
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> | <a href="http://api.citybik.es/v2/">CityBikes API</a>'
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
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchStations: (id) => dispatch(fetchStations(id)),
  deleteFavorite: (station, user) => dispatch(deleteFavorite(station, user)),
  postFavorite: (station, user) => dispatch(postFavorite(station, user))
});

BikeMap.propTypes = {
  cities: PropTypes.array,
  stations: PropTypes.array,
  favorites: PropTypes.array,
  fetchStations: PropTypes.func.isRequired,
}

BikeMap.defaultProps = {
  cities: [],
  stations: [],
  favorites: []
}

export default connect(mapStateToProps, mapDispatchToProps)(BikeMap);