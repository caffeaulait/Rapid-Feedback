/* eslint-disable eqeqeq */
import React from 'react';
import List from 'react-list-select';
import './CommentsList.css';

export default class CommentsList extends React.Component {
  state = {
    one: '',
  };

  render() {
    console.log('target....');
    console.log(this.props.target);
    function comp(context, type) {
      return (
        <div className='comments'>
          <div className='context'>{context}</div>
          <div className='type'>{type}</div>
        </div>
      );
    }

    let list =
      this.props.comments == undefined ? (
        'loading'
      ) : (
        <List
          items={this.props.comments.map((comment) => {
            return comp(comment.content, comment.type);
          })}
          multiple={false}
          onChange={(selected) => {
            let array = this.props.comments.map((comment) => {
              return comment.content;
            });

            this.setState({ one: array[selected] });
            // this.props.upItem(array[selected],this.props.comments[selected].type)
            this.props.upItem(this.props.comments[selected]);
            this.props.setId(this.props.id);
          }}
        />
      );
    return (
      <div>
        <div>{list}</div>
        <div>
          Comments Selected:{' '}
          <input type='text' value={this.state.one} readOnly></input>
        </div>
      </div>
    );
  }
}
