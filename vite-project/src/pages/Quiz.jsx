import { useState, useEffect } from "react";
import { decode } from "html-entities";
import uniqid from 'uniqid';
import Question from "../components/Question";

export default function Quiz() {
  const [questions, setQuestion] = useState('');
  const [answersID, setAnswer] = useState('');
  const [questionsData, setQuestionData] = useState();
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
       setQuestionData(() => data)
       setQuestion(data.results.map((e) => ({
        ...e,
        answers: [...e.incorrect_answers, e.correct_answer],
      })))
      });
  }, []);


  // .map((e) => ({
  //   question: decode(e.question, { level: "html5" }),
  //   answers: decode(e.answers, { level: "html5" }),
  // }))

  function checkAnswers(){
     
  }
   const questionsDOM = questions.length !== 0 && questions.map((e) => {

     return <Question id={uniqid}  question={decode(e.question, { level: "html5" })} answers={e.answers.map(a => decode(a, { level: "html5" }))} />;
   });
  return (
    <main>
      <div className="quiz">
        <div className="quiz-con">
         {questionsDOM} 
          {/* <div className="question">
        <p className="question-title">How would one say goodbye in Spanish?</p>
        <div className="qustion-btns">
        <button className="question-btn">Adiós</button>
        <button className="question-btn">Hola</button>
        <button className="question-btn">Au Revoir</button>
        <button className="question-btn">Salir</button>
        </div>  
      </div>  */}
        </div>
       <button onClick={checkAnswers} className="btn answers-btn">Check answers</button>
      </div>
    </main>
  );
}
