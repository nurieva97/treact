import React, {Component} from 'react';
import { Card } from 'antd';
import {connect} from "react-redux";
import {deleteElement, getElement} from '../actions';
/*
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
*/

class Element extends Component{

    constructor(props){
        super(props);
        this.state = {
            zoom: 13,
        }
    }

    componentWillMount() {
        this.props.onGetElement(this.props.match.params.elementId)
    }


    render(){
        const position = [this.props.lat, this.props.lng];

        return(
            <div>
                <Card
                    title={this.props.title || "Loading ..."}
                    style={{ width: 300 }}
                >
                    <p>Широта: {this.props.lat || ""}</p>
                    <p>Долгота: {this.props.lng || ""}</p>
                </Card>
               {/* <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </Map>*/}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state.element;
};

const mapDispatchToProps = dispatch => {
    return {
        onGetElement: id => {
            dispatch(getElement(id));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Element);