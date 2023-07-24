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
          data.results.map((item,i) => {
            return {
              ...item,
              question: decode(item.question, { level: "html5" }),
              questionId:i,
              answers: [item.correct_answer, ...item.incorrect_answers].map(
                (e) => {
                  return {
                    questionId:i,
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
  // console.log(questions)

  const qestionDOM = questions?.map((question, i) => {
    // const [id,choosen,answer] = e.answers.map(answer => {})
    function answerClicked(event) {
      setQuestions((oldVal) => {
        return oldVal.map((item) => {
          // console.log(item.answers.filter(e => e.questionId === parseFloat(event.target.attributes.parentquestion.value)))
          let res = item.answers.map((e) => {

            // if( e.questionId === parseFloat(event.target.attributes.parentquestion.value)){
            //   if(e.choosen === true && e.choosen !== false ){
            //     console.log('pog',e.choosen)
            //    return e
            //   }else{
            //     console.log('nope',e.choosen)
            //     return  e.id === event.target.id ? {...e,choosen:!e.choosen} : e
            //   }

            // }else{
            //   return e
            // }
            // return e.questionId === parseFloat(event.target.attributes.parentquestion.value) ?    : e
             return e.id === event.target.id ? {...e,choosen:!e.choosen} : e 
          })

          
          
          return { ...item, answers: res };
        });
      });
    }
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
