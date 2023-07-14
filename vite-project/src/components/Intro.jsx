import React from "react"
import { useState,useEffect } from "react";
export default function Sidebar(props) {
    return (
        <header>
            <h1 className="title">Quizzical</h1>
            <span className="description">Some description if needed</span>
            <button className="start-quiz">Start quiz</button>
        </header>
    )
}
