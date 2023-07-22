import React from "react";
import { useState, useEffect } from "react";
export default function Question(props) {
 


const btns = props.questions.answers.map(btn => {

  return (
    <button choosen={btn.choosen} onClick={(event) => props.answerClicked(event)} className="question-btn" key={btn.id} id={btn.id} >
      {btn.answer}
    </button>
  )
})


  return (
    <div  className="question">
      <p className="question-title">{props.questions.question}</p>
      <div className="qustion-btns">{btns}</div>
    </div>
  );
}
