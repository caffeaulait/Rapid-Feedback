import React from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "lightblue",
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);
  
  
const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });


const SelectStucCard = (props) => {

    const classes = useStyles();

        return (
            <div >
            {/* <Table responsive>
                <tbody>
                    <tr>
                    <td>{props.student.uni_student_number}</td>
                    <td>{props.student.first_name +" "+ props.student.last_name}</td>
                    <td>{props.student.is_assessed === 0 ? <button onClick={props.assess}>Assess</button> : "Assessed"}</td>
                    
                    </tr>
                </tbody>
            </Table> */}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    {/* <TableHead>
                    <TableRow>
                        <StyledTableCell>Number</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                    </TableRow>
                    </TableHead> */}
                    <TableBody>
                        <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                        {props.student.uni_student_number}
                        </StyledTableCell>
                        <StyledTableCell align="right">{props.student.first_name +" "+ props.student.last_name}</StyledTableCell>
                        <StyledTableCell align="right">{props.student.uni_email}</StyledTableCell>
                        <StyledTableCell align="right">{props.student.is_assessed === 0 ? <button onClick={props.assess}>Assess</button> : "Assessed"}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
          </div>


        );
}

export default SelectStucCard;