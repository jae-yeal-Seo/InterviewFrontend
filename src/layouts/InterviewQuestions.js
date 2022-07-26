import axios from 'axios'
import {useState} from 'react'
import NestedList from '../components/NestedList'
import Button from '@mui/material/Button';


function InterviewQuestions({history}) {
  //스타일
  const space = {
    whiteSpace: "pre-wrap"
  }

  const test = () => {
  axios.get('/api/test')
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
  }
  

  //일반변수
    let arr2 = ['자기소개를 해주세요','자신의 성격의 장점과 단점을 말해주세요','로드맵은 뭔가요?','학생시절 가장 열심히 했던 활동에 대해 말씀해 주세요. \n팀프로젝트에서 담당한 부분을 좀 더 구체적으로 말씀해주세요','팀 프로젝트에서 힘들었던 에피소드와 어떻게 극복했는지 말씀해주세요 \n 그리고 느낀점을 말해주세요','일본취업동기에대해 말씀해주세요','가장 힘들었던 일과 어떻게 극복했는지 말씀해주세요','엔지니어로써 가장 중요하게 생각하는 것은 무엇인가요? \n 왜 내가 다루는 언어와 프레임워크에대한 이해도가 중요하다고 생각하나요? \n 계획을 세우고 코딩을 하는 것이 왜 중요하다고 생각하나요?','프레임워크에 대한 이해도가 중요하다고 생각한 계기가 있나요?','프로젝트에 대한 전반적인 설명','SEO란 무엇이라고 생각하는지','우리회사에 지원한 동기를 말해주세요','해보고 싶은 서비스가 있나요?','만들어보고 싶은 서비스가 있나요?','왜 프론트엔드, 백엔드에서 전부 일해보고 싶나요?','프론트엔드 개발자로 우리회사에서 어떻게 활약하고 싶은지 알려주세요','언어를 공부할 때 어떤식으로 하는지','언어를 공부할 때 어떤식으로 하는지','타사의 전형상황','우리회사와 그 회사의 어떤 부분을 보고서 지원했나요?','']
 
   
  //함수
  const rand = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const otherquestion = () => {
    let randomValue = rand(0,arr2.length-1)
    setQuestion(arr2[randomValue])
  }


  //useState
    const [question,setQuestion] = useState('');

    

    return(
        <>  
   <div 
   style={space}>
        {question}
   </div>
   <div>
    <Button variant="contained" onClick={otherquestion}>다른질문</Button>
    <button onClick={test}>서버와의 통신</button>
    <p>{arr2.length}</p>
   </div>
   <div className='float-right mr-32'>
      <NestedList/>
   </div>
        </>
    )
}

export default InterviewQuestions;