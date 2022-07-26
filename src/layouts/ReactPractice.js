import React from 'react'

function ReactPractice({history}) {

    const [practiceArray,setPracticeArray] = React.useState([])

    const inputNull = () => {
        setPracticeArray([...practiceArray,''])
        console.log(practiceArray)
    }

    return(
        <>
        <button onClick={inputNull}>
            ''넣어보기
        </button>
        </>
    )
}

export default ReactPractice;