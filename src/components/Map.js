import React from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer, } from 'react-leaflet'
import './map.css'
import L from 'leaflet';
import { showDataOnMap } from '../utils';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = ({ mapCountries, center, zoom, casesType }) => {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                {/* <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                /> */}
                <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
                />
                <Marker position={center}>
                    {/* <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup> */}
                    {/* {mapCountries.map((country) => (
                        <Popup>
                            {country.country}
                        </Popup>
                    ))} */}
                </Marker>
                {showDataOnMap(mapCountries, casesType)}
            </LeafletMap>
        </div>
    )
};

export default Map;
