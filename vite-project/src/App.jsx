import { useState } from 'react'
import {   createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route} from "react-router-dom";
  //styles

import './scss/normalize.css'
import './scss/main.scss'
//pages
import Intro from './pages/Intro';
import Quiz from './pages/Quiz';
//loaders

const theRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route index element={<Intro/>}/>
    <Route   path='Quiz' element={<Quiz/>}/>
    </>
   
  )
)


function App() {
  return (
    <RouterProvider router={theRouter} />
  )
}

export default App
