import React from "react";
import { useState, useEffect } from "react";
export default function Second(props) {
  return (
    <main>
      <div className="question">
        <p className="question-title">How would one say goodbye in Spanish?</p>
        <div className="qustion-btns">
        <button className="question-btn">Adiós</button>
        <button className="question-btn">Hola</button>
        <button className="question-btn">Au Revoir</button>
        <button className="question-btn">Salir</button>
        </div>  
      </div> 
    </main>
  );
}
