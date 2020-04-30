import React from 'react';


class CurrentMarkerView extends React.Component {
    render(){
        const selected = this.props.markers.map(marker => {
            return <span style={{marginLeft:'60px'}}>{marker.Name}</span>
        })
        return (
            <div>
                <button style={{fontSize: '15px',padding:'10px 20px',color:'white',background:'#15A44F',marginLeft:'120px',display:'inline-block'}}>Current Marker</button>
                <div style={{display:'inline-block'}}>{selected}</div>
            </div>
            );
    }
}

export default  CurrentMarkerView;