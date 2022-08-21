import * as React from 'react';
import ReactDOM from 'react-dom'


import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
import { BsFillPencilFill, BsQuestionSquare } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { color } from '@mui/system';
import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SnackBarQuestionSetsEdit from '../items/SnackBarQuestionSetsEdit';
import SnackBarQuestionPlus from '../items/SnackBarQuestionPlus'


export default function NestedList({setQuestionNowFunc}) {
  const [open, setOpen] = React.useState([]);
  const [inputDisabled, setInputDisabled] = React.useState(true);
  const [questionset,setQuestionset] = React.useState()
  const [questionsets,setQuestionsets] = React.useState([])
  const [questions,setQuestions] = React.useState([])

  const [test,setTest] = React.useState(true)
  // 순서를 바꾸면 배열내에서 순서가 바뀌므로 따로 순서에 대해서 값을 만들어줄 필요가 없다.

  
  // 질문세트에서 질문여는 위아래버튼 누를 때
  const handleClick = (index) => {
    let newArray = [...open]
    newArray[index] = !newArray[index]
    setOpen(newArray);
  };

  // 수정아이콘 클릭시 실행되는 함수
  const questionSetEdit = () => {
    if(questionsets.length >= 1)
    setInputDisabled(false)
  }

  // 질문세트추가할 때
  const questionSetAdd = () => {
    if(questionset.length >= 1){
    setQuestions([...questions,[]])
  
    console.log(questionsets.length)
    
    axios.post('/questionsetadd',{
      questionset:questionset,
      sequence:questionsets.length
    })
    .then(res=>{
      setQuestionset("")
      setQuestionsets([...questionsets, res.data])
    })
    .catch(err => {
      console.log(err)
    })

  }
  }

  const nameInput = React.useRef([]);


  nameInput.current = questionsets.map((element, i) => nameInput.current[i] ?? React.createRef());
  // https://dev.to/nicm42/react-refs-in-a-loop-1jk4 참조


  // 질문세트 작성시 엔터 눌러도 추가되도록
  const onEnterPress = (e) => {
    if(e.key === 'Enter')
    questionSetAdd();
  }

  // N번째 questionset이 바뀔때 적용
  const questionsetChange = (e,index) => {
    let newArr = [...questionsets];
    newArr[index] = e.target.value
    setQuestionsets(newArr)
  }

  // 편집완료버튼 누를 때
  const storeQuestionsets = () => {
    setInputDisabled(true)
    // ?! 그리고 실제로 저장
  }

  // 질문세트에 질문을 추가한다. 
  const questionPlus = (onequestionsetId, questionIndex, questionsetIndex, question) => {
    let fakequestions = [...questions];
    fakequestions[questionsetIndex].push(question)
    setQuestions(fakequestions);
    console.log(onequestionsetId)
    axios.post('/questionadd',{
        question : question,
        questionIndex : questionIndex,
        questionsetIndex : questionsetIndex,
        onequestionsetId :onequestionsetId,
    })
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
    setTest(!test)
    // 배열 내부의 원소안에서 바뀐것이기 때문에 갯수변화를 했다고 인식하지 못한다. 그래서 test라는 값을 넣어서 강제로 state들을 다시 그리게 했다. 
  }

  const questionEdit = (e, index, index2) => {
    let fakeQuestions = [...questions]
    fakeQuestions[index][index2] = e.target.value;
    setQuestions(fakeQuestions)
  }

  const questionClick = (question) => {
    setQuestionNowFunc(question)
  }

  const deleteQuestionset = (index) => {
    let fakeQuestionSets = [...questionsets]
    fakeQuestionSets.splice(index,1)
    setQuestionsets(fakeQuestionSets)
    let fakeQuestions = [...questions]
    fakeQuestions.splice(index,1)
    setQuestions(fakeQuestions)

  }

  const forSetQuestionsets = (fakeQuestionSetArray) => {
    setQuestionsets(fakeQuestionSetArray)
  }

  const forSetQuestions = (fakeQuestions) => {
    setQuestions(fakeQuestions)
  }

  const forEmptyQuestions = (fakeArray) => {
    setQuestions(fakeArray)
  }


  React.useEffect(()=>{
    axios.get('userid')
    .then(res => {
      console.log(res.data.id)
      axios.get('getquestionsets/'+res.data.id)
      .then(res=>{
      console.log(res.data[1])
        let fakeQuestionSetArray = []
        for ( let i = 0 ; i<res.data[0].length ; i++){
          for( let j = 0 ; j<res.data[0].length ; j++){
            if(res.data[0][j].sequence === i){
              fakeQuestionSetArray.push(res.data[0][j])
            }
          }
        }
        var fakeArray = []
        for ( let i = 0 ; i<res.data[0].length ; i++){
          fakeArray.push([])
        }
        forEmptyQuestions(fakeArray)

        forSetQuestionsets(fakeQuestionSetArray)


        for( let i = 0 ; i < res.data[1].length ; i++ ){
          var fakeQuestions = [...questions]
          console.log(res.data[2])
          console.log(res.data[1][i].sequence)
          fakeQuestions[res.data[1][i].sequence] = res.data[1][i].name
        }
        if(fakeQuestions !== undefined){
        forSetQuestions(fakeQuestions)  
          console.log("fakeQuestions:"+fakeQuestions)
      }      
      })
      .catch(err=>console.log(err))
    })
    .catch(err => console.log(err))

  },[])

  React.useEffect(()=>{
    console.log("questions"+questions)
  },[questions])

  React.useEffect(()=>{
    console.log("questionsets"+questionsets)
  },[questionsets])

  // ?! 보낼때 questionsets를 보낸다. 그리고 sequence는 배열의 순서대로 입력한다. 

  // ?! 불러오기(해당유저의 질문세트 가져오기)

  // ?! 편집연필누르고 저장할 때 업데이트 할 수 있게 하기

  return (
    <>
    <List
      sx={{ width: '100%', minWidth:280, maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <p className='float-left' style={{ color:'gray', marginBottom:5, marginRight:5 }}>면접질문 세트</p>
      <SnackBarQuestionSetsEdit questionSetEdit={questionSetEdit} questionsets={questionsets} className='float-left mb-3'/>
      { (!inputDisabled && (questionsets.length>=1)) && <button onClick={storeQuestionsets} className='rounded-md text-white text-sm ml-2 bg-blue-700 w-20 h-8'>저장하기</button>}
      
           
  <div class="relative">
<input type="search" id="default-search" class="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={questionset} onKeyPress={onEnterPress} onChange={(e) => {setQuestionset(e.target.value)}} placeholder="질문세트를 추가하세요" required> 
  </input>
  <button onClick={questionSetAdd} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">추가</button>
</div>

          {
            questionsets && questionsets.map((onequestionset,index) => (
              <>
              <ListItemButton 
            style={{ backgroundColor: 'transparent' }}
            onClick={()=>{handleClick(index)}}
            >
              <TextField 
              id = "outlined-basic" 
              variant = "standard"
              disabled = {inputDisabled}
              value = {onequestionset.name}
              onChange={(e) => {
                questionsetChange(e,index)
              }}
              />
              <DeleteForeverIcon onClick={(e) => {
                e.stopPropagation()
                deleteQuestionset(index)
              }} className='ml-3'/>
              {open[index] ? <ExpandLess onClick={() => handleClick(index)} sx={{ ml:1 }}/> : <ExpandMore onClick={() => handleClick(index)} sx={{ ml:1 }}/>}
              </ListItemButton>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  questions[index] && questions[index].map((question,index2) => (
                       <ListItemButton sx={{ pl: 4 }}>
                       <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        defaultValue="Small"
                        variant="filled"
                        size="small"
                        value={question}
                        disabled={inputDisabled}
                        onChange={(e) => {
                          questionEdit(e,index,index2)
                        }}
                        onClick={()=>{
                          questionClick(question)
                        }}
                          />
                       {/* ?! 휴지통 버튼을 누를 때 해당 question/questionset을 제거하도록 한다. */}
                      </ListItemButton> 
                  ))
                }
              </List>
              <SnackBarQuestionPlus questionsetIndex={index} questionIndex={questions[index].length} questionPlus={questionPlus} questionsetId={onequestionset.id}/>
            </Collapse>
              </>
            ))
           }
    </List>
    </>
  );
}
