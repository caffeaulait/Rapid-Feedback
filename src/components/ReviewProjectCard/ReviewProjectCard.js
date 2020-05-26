import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 20,
      color: "#black"
    },
  });

const ReviewProjectCard = (props) => {
    const classes = useStyles();

    
      return (
        <div >
            {/* <div>
                <ul>
                    <li onClick={props.review}>{props.project.subject_code +" "+ props.project.proj_name}</li>
                </ul>
            </div> */}
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    >
                    {props.project.subject_code +" "+ props.project.subject_name +" "+ props.project.proj_name}
                    </Typography>
                </CardContent>
                <CardActions style={{float:"right"}}>
                    <Button size="small" onClick={props.review}>See Review</Button>
                </CardActions>
            </Card>
            <br/>
        </div>
      );
}

export default ReviewProjectCard;