import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField'

import axios from 'axios'


export default function SnackBarQuestionPlus({questionPlus, questionsetIndex, questionIndex, questionsetId}) {
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const questionsetChange = (e) => {
    setQuestion(e.target.value)
  }

  // 엔터눌렀을 때 질문 추가
  const onEnterPress = (e) => {
    if(e.key === 'Enter' && question.length !== 0){
      questionButtonPlus()
    }
    
  }

  // 버튼 눌렀을 때 질문 추가
  const questionButtonPlus = () => {
    console.log(questionsetId)
    if(question.length !== 0)
    questionPlus(questionsetId,questionIndex,questionsetIndex,question)
    setQuestion("")
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
        <div className="ml-7">
      <TextField 
              id = "outlined-basic" 
              variant = "standard"
              value = {question}
              onChange={(e) => {
                questionsetChange(e)
              }}
              onKeyPress={(e)=>{onEnterPress(e)}}
              />

      <button onClick={()=>{
         handleClick()
         questionButtonPlus()
      }} className='rounded-md text-white text-sm ml-2 bg-blue-700 w-16 h-8'>Enter</button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </div>
  );
}
