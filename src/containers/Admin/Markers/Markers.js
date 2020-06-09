/* eslint-disable eqeqeq */
import React from 'react';
import SearchBar from '../../../components/SearchBar/SearchBar';
import CurrentMarkerView from '../../../components/CurrentMarkerView/CurrentMarkerView';
import * as actions from '../../../store/actions/markers';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Markers extends React.Component {
  state = {
    hasTerm: false,
    searchedMarker: [],
    isFound: false,
    isClick: false,
    id: null,
  };

  componentDidMount() {
    const pid = this.props.match.params.pid;
    this.setState({ id: pid });
    console.log(this.props);

    this.props.fetchCurrentMarkers(pid);

    console.log('fetching markers');
    this.props.fetchMarkers(pid);
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

  findMarkerIndex = (marker) => {
    let array = this.props.allMarkers.map((a) => a.Number);
    var index = array.indexOf(marker.Number);

    return index;
  };

  addMarker = (marker) => {
    // this.setState({ markers: [...this.state.markers, marker] })
    // let index = this.findMarkerIndex(marker);
    // let backUp = [...this.props.allMarkers];
    // backUp[index].isSelected = true;
    // this.setState({ allMarkers: backUp });
    // console.log("Addddddddd");
    this.props.addCurrentMarker(marker);
  };

  deleteMarker = (marker) => {
    // let backUp = [...this.state.markers];
    // let array = this.state.markers.map(a => a.Number);
    // var index = array.indexOf(marker.Number)
    // if (index !== -1) {
    //   backUp.splice(index, 1);
    //   this.setState({ markers: backUp });
    // }

    // this.props.deleteCurrentMarker(marker);

    // let index1 = this.findMarkerIndex(marker);
    // let backUp1 = [...this.props.allMarkers];
    // backUp1[index1].isSelected = false;
    // this.setState({ allMarkers: backUp1 });
    // console.log("Deleteeeeeeee");
    this.props.deleteCurrentMarker(marker);
  };

  search = (key, inputArray) => {
    console.log(key);
    console.log(inputArray);
    let array = [];
    for (let i = 0; i < inputArray.length; i++) {
      if (
        inputArray[i].Name == key ||
        inputArray[i].Number == key ||
        inputArray[i].Email == key
      ) {
        array.push(i);
      }
    }
    return array;
  };

  onClearArray = () => {
    this.setState({ searchedMarker: [] });
  };

  onSearchSubmit = (term) => {
    term === ''
      ? this.setState({ hasTerm: false })
      : this.setState({ hasTerm: true });
    console.log(term);
    this.setState({ isClick: true });
    let slots = [];
    slots = this.search(term, this.props.allMarkers);
    console.log(slots);
    if (slots.length > 0) {
      this.setState({ isFound: true });
      this.setState({
        searchedMarker: slots,
      });
    } else {
      this.setState({ searchedMarker: [] });
    }
  };

  goBack = () => {
    console.log('click');
    this.props.updateCurrentMarker(
      this.props.currentMarkers,
      this.state.id,
      this.props.previousMarkers
    );
    this.props.history.goBack();
  };

  // }

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }

    return (
      <div className='ui container'>
        <div style={{ marginTop: '30px', marginBottom: '20px' }}>
          <h1
            style={{
              color: '#003F8A',
              marginLeft: '0',
              fontSize: '60px',
              display: 'inline-block',
              width: '100%',
              marginRight: '-30%',
            }}
          >
            Add Marker
          </h1>
          <button
            style={{
              fontSize: '30px',
              padding: '10px 40px',
              color: 'white',
              background: '#003F8A',
              verticalAlign: 'top',
              borderRadius: '15px',
            }}
            onClick={this.goBack}
          >
            Confirm
          </button>
        </div>

        <CurrentMarkerView markers={this.props.currentMarkers} />
        <SearchBar
          allMarkers={this.props.allMarkers}
          addMarker={this.addMarker}
          deleteMarker={this.deleteMarker}
          onSubmit={this.onSearchSubmit}
          hasTerm={this.state.hasTerm}
          searchedMarker={this.state.searchedMarker}
          isFound={this.state.isFound}
          isClick={this.state.isClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    allMarkers: state.marker.markers,
    currentMarkers: state.marker.currentMarkers,
    previousMarkers: state.marker.previousMarkers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMarkers: (pid) => {
      dispatch(actions.onFetchMarkers(pid));
    },
    fetchCurrentMarkers: (pid) => {
      dispatch(actions.onFetchCurrentMarkers(pid));
    },
    addCurrentMarker: (marker) => {
      dispatch(actions.addSuccess(marker));
    },
    deleteCurrentMarker: (marker) => {
      dispatch(actions.deleteSuccess(marker));
    },
    updateCurrentMarker: (markers, projectId, previousMarkers) => {
      dispatch(actions.onUpdateMarkers(markers, projectId, previousMarkers));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Markers);
