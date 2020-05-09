import React from 'react';


class CurrentMarkerView extends React.Component {
    render(){
        const selected = this.props.markers.map(marker => {
            return <span style={{marginLeft:'60px'}}>{marker.Name}</span>
        })
        return (
            <div>
                <label style={{fontSize: '30px',padding:'10px 20px',color:'black',marginLeft:'120px',display:'inline-block'}}>Current Marker</label>
                <div style={{display:'inline-block'}}>{selected}</div>
            </div>
            );
    }
}

export default  CurrentMarkerView;