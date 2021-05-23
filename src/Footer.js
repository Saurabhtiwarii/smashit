import React from 'react'

function Footer(props) {
    return (
        <div className="game__footer">   
        
        <div className="score-board">Score: <span className="score">{props.score}</span></div>
      </div>
    )
}
export default Footer;

