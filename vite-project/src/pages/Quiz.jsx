import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import Question from "../components/Question";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc} from "firebase/firestore";
import { quizCollection, database } from "../firebase";
// .map(e => decode(e, { level: "html5" }) )
export default function Quiz() {
  const [questions, setQuestions] = useState();
  const [checking,setChecking] = useState()
  // useEffect(() => {
  //   console.log('pog')
  //   const unsnap = onSnapshot(quizCollection,(snapshot) => {
  //     const quizArr = snapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       id:doc.id
  //     }))
  //     setQuestions(quizArr)
  //   })
  //   return unsnap
  // },[])
  // async function createNewNote() {
  //   const res = await fetch('https://opentdb.com/api.php?amount=5')
  //   const data = await res.json()
  //   // const finnaly =  data.results.map((item, i) => {
  //   //   return {
  //   //     ...item,
  //   //     question: decode(item.question, { level: "html5" }),
  //   //     questionId: i,
  //   //     answers: [item.correct_answer, ...item.incorrect_answers].map(
  //   //       (e) => {
  //   //         return {
  //   //           questionId: i,
  //   //           answer: decode(e, { level: "html5" }),
  //   //           id: uniqid(),
  //   //           choosen: "",
  //   //         };
  //   //       }
  //   //     ).sort(() => Math.random() - 0.5),
  //   //   };
  //   // })
  //   const quizRef = await addDoc(database,data)
  //   setQuestions(quizRef)
  // }
  
  useEffect(() => {
    console.log('first')
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
              ).sort(() => Math.random() - 0.5),
            };
          })
        ),

        
      );
  }, []);

  console.log(questions)

  // question && console.log(...question.map(e => e))
  function checkingAnswers(){
    const btns = document.querySelectorAll('.question-btn input')
    const answers = document.querySelectorAll('.choosen input')
    const score = []
    answers.forEach(e => {
      console.log(e.attributes.correctanswer.value === false)
      if(e.attributes.correctanswer.value === 'true'){
        score.push(e)
      }
      
    })
    console.log(btns)
    for(var i = 0; i <  btns.length; i++) {
       btns[i].removeEventListener("onchange", answerClicked);
    }
    return score.length
   
  }
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
        checking={checking}
      
      />
    );
  });
  return (
    <div className="quiz">
      <div className="quiz-con">{qestionDOM}</div>
      <div className="quiz-end">
      {checking && <p className="quiz-end__score">You scored {checkingAnswers() + '/' + questions.length} correct answers</p>}
     {checking ? <Link to={'/'}><button className="quiz-end__btn play-again ">Play again</button></Link> : <button onClick={() => setChecking(true) + checkingAnswers()} className="quiz-end__btn checking">Check answers</button>}
      
      </div>
      
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
