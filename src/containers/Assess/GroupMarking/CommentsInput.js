import React, { Component } from 'react';


export default class CommentsInputs extends React.Component {

    state = {
        input: "",
        type: "Well"
    }

    submit = (e) => {
        e.preventDefault();
        this.props.addComments(this.state.input,this.state.type);
    }
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.submit(e)}>
                    <input type="text" style={{width:"70%",marginRight:"5%"}} onChange={(e) => this.setState({ input: e.target.value })} value={this.state.input}></input>
                    <select id="mySelect" style={{width:"20%"}} onChange={(e) => this.setState({ type: e.target.value })}>
                        <option value="Well">Well</option>
                        <option value="Normal">Normal</option>
                        <option value="Need Improve">Need Improve</option>
                    </select><br/>
                    <button type="submit" style={{marginTop:"2%", marginBottom:"2%",fontSize: '10px', padding: '5px 10px', color: 'white', background: '#003F8A'}}>Create Comments</button>
                </form>
            </div>
        )
    }
}