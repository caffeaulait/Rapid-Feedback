import React from 'react';
import './SearchBar.css';
import MarkerList from '../MarkerList/MarkerList';
import SearchBox from '../SearchBox/SearchBox';

class SearchBar extends React.Component {
  state = { term: '' };

  onFormSubmit = (term) => {
    console.log("I'm here" + this.state.term);
    // this.props.onSubmit(this.state.term);
    this.props.onSubmit(term);
  };
  onChange = (term) => {
    this.setState({ term: term });
  };

  listSearchedMarker = () => {
    if (this.state.term === '') {
      console.log('Original');
      return (
        <MarkerList
          allMarkers={this.props.allMarkers}
          addMarker={this.props.addMarker}
          deleteMarker={this.props.deleteMarker}
        />
      );
    } else {
      console.log('Change');
      return (
        <MarkerList
          allMarkers={this.props.searchedMarker}
          addMarker={this.props.addMarker}
          deleteMarker={this.props.deleteMarker}
        />
      );
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const list = () => {
      if (this.state.term === '') {
        console.log('Original');
        return (
          <MarkerList
            allMarkers={this.props.allMarkers}
            addMarker={this.props.addMarker}
            deleteMarker={this.props.deleteMarker}
          />
        );
      } else {
        console.log('Change');
        return (
          <MarkerList
            allMarkers={this.props.searchedMarker}
            addMarker={this.props.addMarker}
            deleteMarker={this.props.deleteMarker}
          />
        );
      }
    };

    return (
      <div className='titleAndSearch'>
        <table
          style={{
            marginLeft: '0',
            marginRight: '50px',
            marginTop: '30px',
            marginBottom: '20px',
            width: '130%',
            textAlign: 'left',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '40px solid transparent',
                fontSize: '30px',
              }}
            >
              <th>Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>
                {/* <form onSubmit={this.onFormSubmit} className="form">
                                    <div className="search-box">
                                        <input className="search-txt" type="text" value={this.state.term} placeholder='Search' onChange={e => this.setState({ term: e.target.value })}></input>
                                        <img src={Search} onClick={this.onFormSubmit}></img>
                                    </div>
                                </form> */}
                <SearchBox
                  onSubmit={this.props.onSubmit}
                  term={this.onChange}
                ></SearchBox>
              </th>
            </tr>
          </thead>

          {this.state.term ? (
            <MarkerList
              allMarkers={this.props.allMarkers}
              searchedMarker={this.props.searchedMarker}
              addMarker={this.props.addMarker}
              deleteMarker={this.props.deleteMarker}
            />
          ) : (
            <MarkerList
              allMarkers={this.props.allMarkers}
              searchedMarker={[]}
              addMarker={this.props.addMarker}
              deleteMarker={this.props.deleteMarker}
            />
          )}

          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default SearchBar;
