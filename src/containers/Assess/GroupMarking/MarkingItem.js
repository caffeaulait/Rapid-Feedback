/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react';
import Slider from './Slider';
import button from '../../../assets/images/aButton.png';
import './MarkingItem.css';
import Modal from './CommentsModal.js';
export default class MarkingItem extends React.Component {
  state = {
    point: null,
  };

  componentDidMount() {
    this.setState({ point: this.props.result.point });
  }

  commentConstructure = () => {
    let comment = '';
    for (var key in this.props.result.comments) {
      if (this.props.result.comments.hasOwnProperty(key)) {
        comment += key + ' : ' + this.props.result.comments[key].content + '\n';
        console.log(key + ' -> ' + this.props.result.comments[key]);
      }
    }
  };

  render() {
    let commentsss = '';
    let greenStyle = {
      backgroundColor: 'green',
      width: 33.33 + '%',
      height: '10%',
      display: 'table-cell',
    };
    let redStyle = {
      backgroundColor: 'red',
      width: 33.33 + '%',
      height: '10%',
      display: 'table-cell',
    };
    let yellowStyle = {
      backgroundColor: 'yellow',
      width: 33.33 + '%',
      height: '10%',
      display: 'table-cell',
    };
    // eslint-disable-next-line eqeqeq
    if (this.props.result != undefined) {
      console.log(this.props.result);
      console.log(this.props.criteria.id);

      commentsss = '';
      let types = [];
      for (var key in this.props.result.comment) {
        if (this.props.result.comment.hasOwnProperty(key)) {
          commentsss +=
            key + ' : ' + this.props.result.comment[key].content + '\n';
          types.push(this.props.result.comment[key].type);
          console.log(key + ' -> ' + this.props.result.comment[key]);
          console.log('types.........');
          console.log(types);
        }
      }
      console.log('types.........');
      console.log(types);
      let Normal =
        (types.filter((v) => v === 'Neutral').length / types.length) * 100;

      let Well =
        (types.filter((v) => v === 'Positive').length / types.length) * 100;
      let Improve =
        (types.filter((v) => v === 'Negative').length / types.length) * 100;

      greenStyle = {
        backgroundColor: 'green',
        width: Well + '%',
        height: '10%',
        display: Well == 0 ? 'none' : 'table-cell',
      };
      redStyle = {
        backgroundColor: 'red',
        width: Improve + '%',
        height: '10%',
        display: Improve == 0 ? 'none' : 'table-cell',
      };
      yellowStyle = {
        backgroundColor: 'yellow',
        width: Normal + '%',
        height: '10%',
        display: Normal == 0 ? 'none' : 'table-cell',
      };
    }

    return (
      <div className='all'>
        <div className='first'>
          <p className='content'>{this.props.criteria.content}</p>
          <p className='points'>{this.props.result.point}</p>
          {this.props.close ? (
            <></>
          ) : (
            <div className='bar'>
              <div className='green' style={greenStyle}>
                &nbsp;
              </div>
              <div className='yellow' style={yellowStyle}>
                &nbsp;
              </div>
              <div className='red' style={redStyle}>
                &nbsp;
              </div>
            </div>
          )}
        </div>
        <div className='second'>
          {this.props.close ? (
            <></>
          ) : (
            <Slider
              point={this.props.result.point}
              updatePoint={this.props.updatePoint}
              fullPoint={this.props.criteria.points}
              id={this.props.criteria.id}
            />
          )}
          <div className='comments'>
            <textarea
              className='commentsArea'
              placeholder='Here is your comments...'
              disabled
              value={commentsss}
            ></textarea>
            <input
              data-toggle='modal'
              data-target={'#commentsModal' + this.props.criteria.id}
              className='addButton'
              type='image'
              src={button}
              onClick={this.addComments}
              alt='image'
            ></input>
          </div>
        </div>
        <Modal
          target={this.props.target}
          addComments={this.props.addComments}
          setId={this.props.setId}
          id={this.props.criteria.id}
          content={this.props.criteria.content}
          updateItem={this.props.updateItem}
        />
      </div>
    );
  }
}
