import React from 'react';
import classes from "./Button.module.css";

const button = props => {
    return (
        <button 
        className={classes.button} 
        style = {{backgroundColor: props.backgroundcolor}}
        onClick = {props.clicked}
        id = {props.id}
        >{props.children}</button>);
}

export default button;