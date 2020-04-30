import React from 'react';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import CurrentMarkerView from './CurrentMarkerView';

class App extends React.Component {

  state = {
    markers: [],
    allMarkers: [{ Number: "1", Name: "Doe", Email: 'test@gmail.com', isSelected: false },
    { Number: "2", Name: "John", Email: 'test@gmail.com', isSelected: false },
    { Number: "3", Name: "Alice", Email: 'test@gmail.com', isSelected: false }],
    hasTerm: false,
    searchedMarker: [],
    isFound: false,
    isClick: false
  }
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     lat: null,
  //     errorMessage: ''
  //   }
  //   window.navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       this.setState({lat:pos.coords.latitude})
  //     },
  //     (err) => {
  //       this.setState({errorMessage: err.message})
  //     }
  //   );

  findMarkerIndex= (marker) => {
    let array = this.state.allMarkers.map(a => a.Number);
    var index = array.indexOf(marker.Number)

    return index;
  }

  addMarker = (marker) => {
    this.setState({ markers: [...this.state.markers, marker] })
    let index = this.findMarkerIndex(marker);
    let backUp = [...this.state.allMarkers];
    backUp[index].isSelected = true;
    this.setState({ allMarkers: backUp });
    console.log("Addddddddd");
  }

  deleteMarker = (marker) => {
    let backUp = [...this.state.markers];
    let array = this.state.markers.map(a => a.Number);
    var index = array.indexOf(marker.Number)
    if (index !== -1) {
      backUp.splice(index, 1);
      this.setState({ markers: backUp });
    }


    let index1 = this.findMarkerIndex(marker);
    let backUp1 = [...this.state.allMarkers];
    backUp1[index1].isSelected = false;
    this.setState({ allMarkers: backUp1 });
    console.log("Deleteeeeeeee");


  }

  search = (key, inputArray) => {
    console.log(key);
    console.log(inputArray);
    let array = [];
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].Name == key || inputArray[i].Number == key || inputArray[i].Email == key) {
        array.push(i);
      }
    }
    return array;
  }

  onClearArray = () => {
    this.setState({ searchedMarker: [] });
  };

  onSearchSubmit = (term) => {
    term === '' ? this.setState({ hasTerm: false }) : this.setState({ hasTerm: true })
    console.log(term);
    this.setState({ isClick: true });
    let slots = [];
    slots = this.search(term, this.state.allMarkers);
    console.log(slots);
    if (slots.length > 0 ) {
      this.setState({ isFound: true });
      this.setState(
        {
          searchedMarker: slots
        })

    } else {
      this.setState({ searchedMarker: [] })
    }
  }


  // }

  render() {
    return (
      <div classNme="ui container">
        <NavBar />
        <div style={{ marginTop: '30px', marginBottom: '20px' }}>
          <h1 style={{ color: '#003F8A', marginLeft: '120px', fontSize: '60px', display: 'inline-block', width: '100%', marginRight: '-30%' }}>Add Marker</h1>
          <button style={{ fontSize: '30px', padding: '10px 40px', color: 'white', background: '#003F8A', verticalAlign: 'top', borderRadius: '15px' }}>Confirm</button>
        </div>

        <CurrentMarkerView markers={this.state.markers} />
        <SearchBar allMarkers={this.state.allMarkers} addMarker={this.addMarker} deleteMarker={this.deleteMarker} onSubmit={this.onSearchSubmit}
          hasTerm={this.state.hasTerm} searchedMarker={this.state.searchedMarker} isFound={this.state.isFound} isClick={this.state.isClick} />
      </div>
    );
  }
};

export default App;