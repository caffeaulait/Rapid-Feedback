import React from 'react';
import MarkerCard from '../MarkerCard/MarkerCard';

class MarkerList extends React.Component {


    ChangeCurrentMarker = () => {
        console.log ("change");
    }
    

    render () {
        const addMarker = this.props.addMarker;
        const deleteMarker = this.props.deleteMarker;
       
        const markers = this.props.searchedMarker.length == 0 ? this.props.allMarkers.map (
            marker => {
                
                return <MarkerCard key={marker.Number} marker = {marker} addMarker = {addMarker}  deleteMarker = {deleteMarker}/>
            }
        ) : this.props.searchedMarker.map (
            index => {
                return <MarkerCard key={this.props.allMarkers[index].Number} marker = {this.props.allMarkers[index]} addMarker = {addMarker}  deleteMarker = {deleteMarker}/>
            }
        )
        return (
            <tbody className="MarkersTable">
                {markers} 
            </tbody>
        );
    }
}

export default MarkerList;