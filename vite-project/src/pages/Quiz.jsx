import { useState, useEffect } from "react";
import { decode } from "html-entities";
import uniqid from "uniqid";
import Question from "../components/Question";

export default function Quiz() {
  const [questions, setQuestion] = useState("");
  const [answerBtns, setAnswerBtns] = useState("");
  const [questionsData, setQuestionData] = useState();
  const [checking, setChecking] = useState(false);
  const [btnName, setBtnName] = useState('question-btn');
  const [currentBtn, setCurrentBtn] = useState();

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setQuestionData(() => data);
        setQuestion(
          data.results.map((e) => ({
            ...e,
            answers: [...e.incorrect_answers, e.correct_answer],
           
          }))
        );
      });
  }, []);
console.log(questions[0].answers)
//PUT THEM IN OBJECTS


  // .map((e) => ({
  //   question: decode(e.question, { level: "html5" }),
  //   answers: decode(e.answers, { level: "html5" }),
  // }))

function checkAnswers(){
  const btns = document.querySelectorAll('.question-btn')
  for (let btn of btns) {
      if (btn.props.className.includes("choosen")) {
        if (btn.props.correctanswer) {
          setBtnName(oldVal => oldVal += "right") ;
        } else {
          setBtnName(oldVal => oldVal += "wrong") ;
        }
      } else {
        setBtnName(oldVal => oldVal  += "unchoosen");
      }
    }
}
  function answerClicked(e,current) {
    setCurrentBtn(current)
    console.log(questions)
    console.log(this,e.target)
    // console.log(e.target.attributes.parentid.value)
    // e.target.classList.toggle("choosen");
    // const otherBtns = e.target
    //   .closest(".qustion-btns")
    //   .querySelectorAll(".question-btn");
    // for (let btn of otherBtns) {
    //   if (btn !== e.target) {
    //     btn.classList.remove("choosen");
    //   }
    // }
  }
  const questionsDOM =
    questions.length !== 0 &&
    questions.map((e) => {
      return (
        <Question
       
        btnName={btnName}
        setCurrentBtn={setCurrentBtn}
        setBtnName={setBtnName}
          setChecking={setChecking}
          checking={checking}
           checkAnswers={checkAnswers}
          correctAnswer={e.correct_answer}
          key={uniqid()}
          answerClicked={answerClicked}
          id={uniqid}
          question={decode(e.question, { level: "html5" })}
          answers={e.answers.map((a) => decode(a, { level: "html5" }))}
        />
      );
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
        <button onClick={() => checkAnswers()} className="btn answers-btn">
          Check answers
        </button>
      </div>
    </main>
  );
}
