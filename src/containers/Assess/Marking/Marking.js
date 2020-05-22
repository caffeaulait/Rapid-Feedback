import React from 'react';
import MarkingTitle from "./MarkingTitle";
import MarkingList from './MarkingList';

class Marking extends React.Component {

    state = {
        assTarget: { Group: "Group2", Member: ["Alex", 'Allen', "Alice"] },
        assTime: { min: 6, sec: 0 },
        criteria: [{ id: "1", criteria: "Voice, peace and confidence", point: 10 },
        { id: "2", criteria: "Knowledge of Material", point: 10 },
        { id: "3", criteria: "Content", point: 10 },
        { id: "4", criteria: "Concluding remarks", point: 10 },
        { id: "5", criteria: "PPT", point: 10 }],
        result: [{ id: "1", point: 0, comment: '1' },
        { id: "2", point: 5, comment: '2' },
        { id: "3", point: 0, comment: '3' },
        { id: "4", point: 5, comment: '4' },
        { id: "5", point: 0, comment: '5' }],
        item:'',
        cid:""
        

    }

    updateItem = (content) => {
        this.setState({item:content});
    }

    setCid = (id) => {
        this.setState({cid:id});
    }

    goBack = () => {
        this.props.history.goBack();
    };

    addComments = () => {
        let target = this.state.result.filter((r) => r.id !== this.state.cid);
        let array = this.state.result.map(a => a.id);
        var index = array.indexOf(this.state.cid);
        let change = this.state.result[index];
        change.comment = this.state.item;
        this.setState({result:[...target,change]})
    }


    handleUpdatePoint = (value, id) => {
        let copy = this.state.result.filter((item) => {
            return item.id != id;
        });
        let target = this.state.result.filter((item) => {
            return item.id == id;
        });
        copy = [...copy, { id: id, point: Number(value), comment: target[0].comment }];
        this.setState({ result: copy })

    }
    render() {
        return (
            <div>
                <MarkingTitle assTarget={this.state.assTarget} assTime={this.state.assTime} result={this.state.result} criteria={this.state.criteria}></MarkingTitle>
                <MarkingList result={this.state.result} criteria={this.state.criteria} comments= {this.state.comments} updatePoint={this.handleUpdatePoint} setId = {this.setCid}  addComments={this.addComments} updateItem={this.updateItem}/>
                <div style={{ display:"table",width:"100%", bottom: "0", textAlign: "middle", marginTop:"2%" }}>
                    <div style={{ display:"table-cell",width:"45%",textAlign: "center"}}> <button style={{ position:"relative", top:"50%",left:"50",fontSize: '20px', padding: '15px 25px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "20%", verticalAlign: 'buttom'}} onClick={this.goBack} >Back</button></div>         
                    <div style={{ display:"table-cell",width:"45%",textAlign: "center"}}><button style={{ position:"relative", top:"50%",left:"50",fontSize: '20px', padding: '15px 25px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "20%", verticalAlign: 'buttom' }} onClick={this.goBackToProject}>Confirm</button></div>
                </div>
            </div>

        )
    }
}

export default Marking;