import React from 'react';
import GroupAddCard from './GroupAddCard';

class GroupAddList extends React.Component {


    ChangeCurrentMarker = () => {
        console.log ("change");
    }
    

    render () {
        const addStudent = this.props.addStudent;
        const deleteStudent = this.props.deleteStudent;
       
        const students = this.props.searchedStudent.length == 0 ? this.props.allStudents.map (
            student => {
                
                return <GroupAddCard key={student.Number} student = {student} addStudent = {addStudent}  deleteStudent = {deleteStudent}/>
            }
        ) : this.props.searchedStudent.map (
            index => {
                return <GroupAddCard key={this.props.allStudents[index].Number} student = {this.props.allStudents[index]} addStudent = {addStudent}  deleteStudent = {deleteStudent}/>
            }
        )
        return (
            <tbody>
                {students} 
            </tbody>
        );
    }
}

export default GroupAddList;