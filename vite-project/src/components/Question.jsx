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

  const checkingStyles = {
    backgroundColor:btn.choosen ? btn.answer === props.questions.correct_answer ? '#94D7A2' : '#F8BCBC' :'transparent' ,
    opacity:!btn.choosen && '50%',
    border:btn.choosen &&  'none'
   }

  return (
  
    <div  key={btn.id} style={props.checking && checkingStyles} id={btn.id} className={btnName(btn.choosen)}>
      <input 
      className={btnName()}
      type="radio"
      id={btn.answer}
      name={props.index}
      value={btn.answer}
     
      checked={btn.choosen}
      correctanswer={(btn.answer === props.questions.correct_answer).toString()}
      onChange={(event) => props.checking ? null : props.answerClicked(event)}/>
 
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
