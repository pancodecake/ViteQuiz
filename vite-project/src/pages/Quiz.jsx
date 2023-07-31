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
          data.results.map((item, i) => {
            return {
              ...item,
              question: decode(item.question, { level: "html5" }),
              questionId: i,
              answers: [item.correct_answer, ...item.incorrect_answers].map(
                (e) => {
                  return {
                    questionId: i,
                    answer: decode(e, { level: "html5" }),
                    id: uniqid(),
                    choosen: "",
                  };
                }
              ),
            };
          })
        )
      );
  }, []);
  // question && console.log(...question.map(e => e))

  function answerClicked(event) {
    setQuestions((oldVal) => {
      return oldVal.map((item) => {
        let res = item.answers.map((e) => {
          if (
            e.questionId === parseFloat(
              event.target.closest(".question").attributes.parentquestion.value
            )
          ) {
            if (e.id === event.target.parentElement.id) {
              return { ...e, choosen: !e.choosen };
            } else {
              return { ...e, choosen: false };
            }
          } else {
            return e;
          }
        });
        return { ...item, answers: res };
      });
    });
  }
  const qestionDOM = questions?.map((question, i) => {
    return (
      <Question
        answerClicked={answerClicked}
        key={uniqid()}
        questions={question}
        setQuestions={setQuestions}
        index={i}
      />
    );
  });
  return (
    <div className="quiz">
      <div className="quiz-con">{qestionDOM}</div>
    </div>
  );
}
// return oldVal.map((item) => {

//   let res = item.answers.map((e) => {
//     if( e.id === event.target.id){

//       return { ...e, choosen: !e.choosen }
//     }else{
//       return e
//     }

//   });

//   return { ...item, answers: res };
// });
