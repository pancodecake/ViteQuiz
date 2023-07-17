import React from 'react'
import { Link } from "react-router-dom";
export default function Intro() {
  return (
    <div className="intro">
        <h1 className="intro-title">Quizzical</h1>
        <p className="intro-desc">Some description if needed</p>
       
        <Link to={'Quiz'}><button className="btn">Quiz</button></Link>
    </div>
  )
}
