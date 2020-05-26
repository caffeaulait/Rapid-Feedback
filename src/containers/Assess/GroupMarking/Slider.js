import React from 'react';
import styled from 'styled-components';

const sliderThumbStyles = (props) => (`
  width: 25px;
  height: 25px;
  background: #003f8a;
  cursor: pointer;
  outline: 5px solid #333;
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .value {
    flex: 1;
    font-size: 2rem;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

export default class Slider extends React.Component {
  state = {
    value: 0
  }

  componentDidMount() {
      this.setState({value:this.props.point});
  }



  handleOnChange = (e) => {
    const { value } = e.target;
    this.props.updatePoint(value, this.props.id);
    this.setState({ value });
  }

  render() {
    return (
      <Styles>
        <input type="range" min={0} max={this.props.fullPoint} value={this.state.value} className="slider" onChange={this.handleOnChange} />
        <div className="value" style={{marginLeft:"2%"}}>{this.state.value + " / " + this.props.fullPoint}</div>
      </Styles>
    )
  }
}