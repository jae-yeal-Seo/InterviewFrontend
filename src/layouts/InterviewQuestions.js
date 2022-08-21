import * as React from 'react';

import axios from 'axios'
import {useState} from 'react'
import NestedList from '../components/NestedList'
import Button from '@mui/material/Button';



function InterviewQuestions({history}) {
  //스타일
 const [questionNow, setQuestionNow] = React.useState();

  const test = () => {
  axios.get('/api/test')
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
  }

  const setQuestionNowFunc = (questionNow) => {
    console.log(questionNow)
    setQuestionNow(questionNow)
  }
  


    return(
        <>  
         <div className='max-w-96'>
   <p className="float-left text-center text-4xl font-sans inline">{questionNow}</p>
        </div>
   <div className='float-right mr-32'>
      <NestedList setQuestionNowFunc={setQuestionNowFunc}/>
   </div>
        </>
    )
}

export default InterviewQuestions;