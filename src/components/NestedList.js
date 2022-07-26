import * as React from 'react';
import ReactDOM from 'react-dom'
import TextField from '@mui/material/TextField'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { BsFillPencilFill, BsQuestionSquare } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai'
import {AiOutlinePlusCircle} from 'react-icons/ai'


export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  const [inputDisabled, setInputDisabled] = React.useState([]);
  const [questionset,setQuestionset] = React.useState([])
  const [questionsets,setQuestionsets] = React.useState([])
  

  const handleClick = () => {
    setOpen(!open);
  };

  // 수정아이콘 클릭시 실행되는 함수
  const questionSetEdit = (index) => {
    let newArray = [...inputDisabled]
    newArray[index] = false
    setInputDisabled(newArray)
  }

  // 포커스해제시에 실행되는 함수
  const onBlur = (index) => {
    let newArray = [...inputDisabled]
    newArray[index] = true
    setInputDisabled(newArray)
  }

  const questionAdd = () => {
    setQuestionsets([...questionsets, questionset])
    setQuestionset("")
    // 만들어질 때도 Disalbed true로 하기
  }

// 테스트코드

  const nameInput = React.useRef([]);


  nameInput.current = questionsets.map((element, i) => nameInput.current[i] ?? React.createRef());
  // https://dev.to/nicm42/react-refs-in-a-loop-1jk4 참조

  const doFocus = (index) => {
  }

  const doBlur = (index) =>{
    nameInput.current[index].disabled = true;
  }

  const onEnterPress = (e) => {
    if(e.key === 'Enter')
    questionAdd();
  }

  const questionsetChange = (e,index) => {
    let newArr = [...questionsets];
    newArr[index] = e.target.value
    setQuestionsets(newArr)
  }

  React.useEffect(()=>{
    questionsets && questionsets.map((a,index) => {
      let newArray = [...inputDisabled]
      newArray[index] = true;
      setInputDisabled(newArray)
    })
  },[questionsets])


  return (
    <>
    <List
      sx={{ width: '100%', minWidth:280, maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          면접질문 세트
        </ListSubheader>
      }
    >
           
  
  <div class="relative">
  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
  <AiOutlinePlusCircle/>
  </div>
<input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={questionset} onKeyPress={onEnterPress} onChange={(e) => {setQuestionset(e.target.value)}} placeholder="질문세트를 추가하세요" required> 
  </input>
  <button onClick={questionAdd} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">추가</button>
</div>

          {
            questionsets.map((onequestionset,index) => (
              <>
              <ListItemButton 
            style={{ backgroundColor: 'transparent' }}>
              <TextField 
              id = "outlined-basic" 
              variant = "standard"
              disabled = {inputDisabled[index]}
              onBlur = {() => onBlur(index)}
              value = {onequestionset}
              onChange={(e) => {questionsetChange(e,index)}}
              />
              <BsFillPencilFill onClick={() => questionSetEdit(index)} style={{ marginLeft:20 }}/>
              {open ? <ExpandLess onClick={handleClick} sx={{ ml:4 }}/> : <ExpandMore onClick={handleClick} sx={{ ml:4 }}/>}
              {/* ExpandLess도, ExpandMore도 전부 index를 보내주어서 그 애만 open값을 조절하게 해야됨 */}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
              </>
            ))
           }
    </List>
    </>
  );
}
