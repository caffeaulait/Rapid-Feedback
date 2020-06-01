import React from 'react';


class CurrentMarkerView extends React.Component {
    render(){
        const selected = this.props.markers.map(marker => {
            return <span key={marker.Number} style={{marginLeft:'60px'}}>{marker.Name}</span>
        })
        return (
            <div>
                <label className="MarkerLabel"style={{fontSize: '30px',padding:'10px 20px',color:'black',marginLeft:'0',display:'inline-block'}}>Current Marker</label>
                <div className="selectedmarker" style={{display:'inline-block'}}>{selected}</div>
            </div>
            );
    }
}

export default  CurrentMarkerView;