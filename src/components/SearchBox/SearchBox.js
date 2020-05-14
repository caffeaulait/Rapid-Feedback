import React from 'react';
import Search from '../../assets/images/search.png';
import './SearchBox.css';

export default class SearchBox extends React.Component {


    state = { term: '' };




    onFormSubmit = () => {
        this.props.onSubmit(this.state.term);
        this.props.term(this.state.term)
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="form">
                <div className="search-box">
                    <input className="search-txt" type="text" value={this.state.term} placeholder='Search' onChange={e => {this.setState({ term: e.target.value })}}></input>
                    <img src={Search} onClick={this.onFormSubmit}></img>
                </div>
            </form>
        );
    }

}