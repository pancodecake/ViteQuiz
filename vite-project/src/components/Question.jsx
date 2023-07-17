import React from "react";
import { useState, useEffect } from "react";
export default function Question(props) { 
let lastClicked
  function asnwerClicked(e){
    lastClicked = e.target
    e.target.classList.toggle('choosen')

    console.log(e.target,lastClicked)
    // const otherBtns = e.target.closest('.qustion-btns').querySelectorAll('.question-btn')
    // for(let btn of otherBtns){
    //   if(btn !== e.target){
    //     console.log(btn)
    //   }
    // }
  }
  const btns = props.answers.map(e => {
    return (
<button id={props.id()} key={props.id()} onClick={(e) => asnwerClicked(e)} className="question-btn">{e}</button> 
    )
  })
  return (
  
   <div className="question">
        <p className="question-title">{props.question}</p>
        <div className="qustion-btns">
         {btns}
        </div>  
      </div>
     
   
  );
}
