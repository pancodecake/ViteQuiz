import React from "react";
import { useState, useEffect } from "react";
export default function Question(props) { 
  const parentId = props.id()
  const btns = props.answers.map((e) => {
   
    return (
<button parentId={parentId} id={props.id()} key={props.id()} onClick={(event) => props.answerClicked(event,parentId)} className="question-btn">{e}</button> 
    )
  })
  return (
  
   <div id={parentId}  className="question">
        <p className="question-title">{props.question}</p>
        <div className="qustion-btns">
         {btns}
        </div>  
      </div>
     
   
  );
}
