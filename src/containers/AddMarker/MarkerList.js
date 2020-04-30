import React from 'react';
import MarkerCard from './MarkerCard';

class MarkerList extends React.Component {


    ChangeCurrentMarker = () => {
        console.log ("change");
    }
    

    render () {
        const addMarker = this.props.addMarker;
        const deleteMarker = this.props.deleteMarker;
       
        const markers = this.props.searchedMarker.length == 0 ? this.props.allMarkers.map (
            marker => {
                
                return <MarkerCard marker = {marker} addMarker = {addMarker}  deleteMarker = {deleteMarker}/>
            }
        ) : this.props.searchedMarker.map (
            index => {
                return <MarkerCard marker = {this.props.allMarkers[index]} addMarker = {addMarker}  deleteMarker = {deleteMarker}/>
            }
        )
        return (
            <tbody>
                {markers} 
            </tbody>
        );
    }
}

export default MarkerList;