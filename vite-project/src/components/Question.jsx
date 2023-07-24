import React from "react";
import { useState, useEffect } from "react";
export default function Question(props) {
 
function btnName(status,marked){

  let originName = 'question-btn'
 
  status === true && console.log(props.index)


    switch (status) {
      case true:
        return originName += ' choosen'
      case false:
        return originName
    }
  
  return 'question-btn'
}
const arr = []
const btns = props.questions.answers.map(btn => {
  arr.push(btn.choosen)
  console.log(arr)
  return (
    <button parentquestion={props.index} onClick={(event) => props.answerClicked(event)} className={btnName(btn.choosen)} key={btn.id} id={btn.id} >
      {btn.answer}
    </button>
  )
})


  return (
    <div parentquestion={props.index}   className="question">
      <p className="question-title">{props.questions.question}</p>
      <div className="qustion-btns">{btns}</div>
    </div>
  );
}
