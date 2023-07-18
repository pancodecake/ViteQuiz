import React from "react";
import { useState, useEffect } from "react";
export default function Question(props) {
  const btnCheckedStyle = {
    border: "none",
  };

  const parentId = props.id();
  let btnName = 'question-btn'
  const btns = props.answers.map((e) => {
    
    return (
      <button
        correctanswer={e === props.correctAnswer ? e : false}
        parentid={parentId}
        id={props.id()}
        key={props.id()}
        onClick={(event) => props.answerClicked(event, parentId)}
        className={btnName}
      >
        {e}
      </button>
    );
  })
  useEffect(() => {
   
  },[props.checking])
  
  // .map(btn => {
  //   console.log(btn.props.className)
  //   return btn
  // });
  


  // if(props.checking){

  //   for (let btn of btns) {
  //     console.log('pog',btnName);
  //     if (btn.props.className.includes("choosen")) {
  //       console.log(btn);
  //       if (btn.props.correctanswer) {
  //         btnName += "right";
  //       } else {
  //         btnName += "wrong";
  //       }
  //     } else {
  //       btnName += "unchoosen";
  //     }
  //   }
  // }

  return (
    <div id={parentId} className="question">
      <p className="question-title">{props.question}</p>
      <div className="qustion-btns">{btns}</div>
    </div>
  );
}
