import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import InterviewQuestions from './layouts/InterviewQuestions'
import ReactPractice from './layouts/ReactPractice'
import axios from 'axios'

function App() {


  return (
    <>
    <div style = {{ marginLeft : 30, marginTop : 30}}>
    {/* 버전6부터는 Switch -> Routes, component -> element */}
      <Router>  
        <Routes>
    <Route path = "/" element={<InterviewQuestions/>} />
    <Route path = "/interviewquestions/" element={<InterviewQuestions/>}/>
    <Route path = "/reactpractice" element={<ReactPractice/>}/>
    </Routes>
    </Router>
    </div>
    {/* layout메뉴로 interviewquestions와 reactpractice를 만들고 그 밑에 컴포넌트를 띄우는 식으로 한다. */}
   </>
  );
}

export default App;
