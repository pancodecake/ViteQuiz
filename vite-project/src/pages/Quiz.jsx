import { useState, useEffect } from "react";
import { decode } from "html-entities";
import uniqid from "uniqid";
import Question from "../components/Question";
// .map(e => decode(e, { level: "html5" }) )
export default function Quiz() {
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((item) => {
            return {
              ...item,
              question:decode(item.question, { level: "html5" }),
              answers: [item.correct_answer, ...item.incorrect_answers].map(
                (e) => {
                  return {
                    answer: decode(e, { level: "html5" }),
                    id: uniqid(),
                    choosen: false,
                  };
                }
              ),
            };
          })
        )
      );
  }, []);
  // question && console.log(...question.map(e => e))

 const qestionDOM = questions?.map((question,i) => {
  console.log(questions[i])
  // const [id,choosen,answer] = e.answers.map(answer => {})
  function answerClicked(event){
  //  setQuestions(oldVal => {
  //    return {...oldVal,answers:oldVal[i].answers.map(e => { return e.id === event.target.id ? {...e,choosen:!e.choosen} : e })}
  //   })
   
  }
    return <Question answerClicked={answerClicked} key={uniqid()}  questions={question} setQuestions={setQuestions} index={i}  />;
  });
  return (
    <div className="quiz">
      <div className="quiz-con">
    {qestionDOM}
      </div>
    </div>
  );
}
