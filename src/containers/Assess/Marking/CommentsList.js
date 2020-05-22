import React, { Component } from 'react';
import List from 'react-list-select';
import "./CommentsList.css";

export default class CommentsList extends React.Component {

    state = {
        one: ''
    }


    render() {
        function comp(context, type) {
            return (
                <div className="comments">
                    <div className="context">{context}</div>
                    <div className="type">{type}</div>
                </div>
            )
        }
        
        let comps = [
            comp('Mike', 'mike@server.com'),
            comp('John', 'john@server.com'),
            comp('Bob', 'bob@server.com'),
            comp('Max', 'max@server.com'),
        ]
        


        let list = <List
            items={this.props.comments.map((comment) => {
                return comp(comment.content,comment.type);
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