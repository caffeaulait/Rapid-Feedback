import React from 'react';

class MarkerCard extends React.Component {

    constructor(props) {
        super (props);

        this.ButtonRef = React.createRef();
    }

    ChangeCurrentMarker = () => {
        const text = this.ButtonRef.current.innerText === "Add" ? "Delete":"Add";
        this.ButtonRef.current.innerText === "Add" ? this.props.addMarker(this.props.marker):this.props.deleteMarker(this.props.marker);
        this.ButtonRef.current.innerText = text;
        
        console.log (this.props.deleteMarker);
    }

    render() {
        return (
            <tr style={{ borderBottom: '40px solid transparent',fontSize:'20px'}}>
                <td>{this.props.marker.Number}</td>
                <td>{this.props.marker.Name}</td>
                <td>{this.props.marker.Email}</td>
                <td><button ref={this.ButtonRef} onClick={this.ChangeCurrentMarker} style={{ fontSize: '20px', padding: '8px 30px', color: 'white', background: '#003F8A', verticalAlign: 'top', borderRadius: '15px' }}>{this.props.marker.isSelected ? "Delete" : "Add"}</button></td>
            </tr>
        );
    }
}

export default MarkerCard;