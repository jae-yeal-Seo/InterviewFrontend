import * as React from 'react';
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

export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  const [inputDisabled, setInputDisabled] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // 면접질문이름 수정할 때 실행되는 함수
  const questionSetEdit = () => {
    setInputDisabled(false)
  }

  // 포커스해제시에 실행되는 함수
  const onBlur = () => {
    setInputDisabled(true)
  }




  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          면접질문 세트
        </ListSubheader>
      }
    >
      <ListItemButton 
      style={{ backgroundColor: 'transparent' }}>
        <TextField 
        id="outlined-basic" 
        variant="standard"
        disabled={inputDisabled}
        onBlur={onBlur}
        />
        <BsFillPencilFill onClick={questionSetEdit} style={{ marginLeft:20 }}/>
        {/* ?! 연필이 아니라 TextField를 클릭시에 abled로 하게 한다. */}
        {/* ?! TextField의 글씨를 진하게 한다. */}
        {open ? <ExpandLess onClick={handleClick} sx={{ ml:4 }}/> : <ExpandMore onClick={handleClick} sx={{ ml:4 }}/>}
      </ListItemButton>
      {/* ?! 위 아래 누를때만 효과 나오게 하기 */}
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
    </List>
  );
}
// ?! 질문세트 배열만들고 추가할 때 UI와 배열에도 추가되게끔한다. "몇번째"세트를 readonly해제 시킬건지 명시해야하기 때문에 저게 더 우선이다. 
// ?! 전체적인 가로크기 늘리기
// ?! +버튼 누를 때 면접질문 추가할 수 있게 하기
// ?! 