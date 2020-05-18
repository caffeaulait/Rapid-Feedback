import React, { Component } from 'react';

export default class CommentsInputs extends React.Component {

    state = {
        input:""
    }

    submit = (e) => {
        e.preventDefault();
        this.props.addComments(this.state.input);
    }
    render () {
        return (
            <div>
                <form onSubmit={(e) => this.submit(e)}>
                    <input type="text" onChange={(e) => this.setState({input:e.target.value})} value={this.state.input}></input>
                    <button type="submit">Create Comments</button>
                </form>
            </div>
        )
    }
}