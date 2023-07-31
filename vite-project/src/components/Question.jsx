import React from "react";
import { useState, useEffect } from "react";
export default function Question(props) {
 
function btnName(status,marked){

  let originName = 'question-btn'
 
      switch (status) {
      case true:
        return originName += ' choosen'
      case false:
        return originName
    }
  
  return 'question-btn'
}

const btns = props.questions.answers.map(btn => {

  return (

    <div id={btn.id} className={btnName()}>
      <input 
      className={btnName()}
      type="radio"
      id={btn.answer}
      name={props.index}
      value={btn.answer}
      key={btn.id}
      checked={btn.choosen}
      choosen={btn.choosen + ''}
      onChange={(event) => props.answerClicked(event)}/>
 
  <label htmlFor={btn.answer}>{btn.answer}</label>
  </div>

  )
})


  return (
    <div parentquestion={props.index} className="question">
      <p className="question-title">{props.questions.question}</p>
      <div className="qustion-btns">{btns}</div>
    </div>
  );
}
