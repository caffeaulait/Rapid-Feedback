import React, { Component } from 'react';
import List from 'react-list-select'

export default class CommentsList extends React.Component {

    state = {
        one: ''
    }


    render() {
        let list = <List
            items={this.props.comments.map((comment) => {
                return comment.content;
            })}
            multiple={false}
            onChange={(selected) => {
                let array = this.props.comments.map((comment) => {
                    return comment.content;
                })

                this.setState({one:array[selected]})
                this.props.upItem(array[selected])
                this.props.setId(this.props.id)
            }}
        />
        return (
            <div>
                <div>{list}</div>
                <div>Comments Selected: <input type="text" value={this.state.one} ></input></div>
            </div>
        )
    }
}