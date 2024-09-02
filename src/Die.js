import React from "react";
import './index.css';

export default function Die(props){
    const styles = {
        background: props.isHeld? "#59E391" : "white"
    }
    return (
        <div onClick={props.holdDice}
        className="die-face" 
        style={styles}>
            <h3 className="die-num">{props.value}</h3>
        </div>
    )
}