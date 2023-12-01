import { Container, Box, Checkbox, FormControlLabel, } from "@mui/material";
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useGetQuizQuestionsQuery } from "../../Redux/api/quizApi";
import { addAnswer, nextQuestion } from "../../Redux/slices/Answers";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import QuizResult from "../quiz-result/quiz-result";
import Questions from "./questions";

const QuizStart: React.FC = () => {
    const { quizSlug } = useParams()
    const [answers, setAnswers] = useState({})
    const [listState, setListState] = useState<any>({})
    const dispatch = useAppDispatch()
    const { userAnswers, qIndex} = useAppSelector(state => state.answers)
    const { data = [], isLoading } = useGetQuizQuestionsQuery(quizSlug) 

    if (isLoading) {
        return null
    }

    const onCheckBox = (e:any, index:any) => {
      setListState({
        ...listState,
        [index]: e.target.checked
      })
      setAnswers({
          ...answers,
          [e.target.name]: e.target.checked
      })
    }
  
    console.log(userAnswers)
    console.log(qIndex)
    const onNextQuestion = () => {
        dispatch(addAnswer(answers))
        dispatch(nextQuestion())
        setAnswers({})
        setListState({})
    }
    

    const questions = data[qIndex]?.answers && data[qIndex].answers.map((item:any, index:any) => {
      return <FormControlLabel defaultChecked={false} key={index}
          control={
            <Checkbox checked={listState[index] || false} onChange={(e) => onCheckBox(e, index)} name={item[index]} />
          }
          label={item[index]}/>
    })


    return (
        <Container sx={{ py: 8 }} maxWidth='md'>
            <Box sx={{ minWidth: 275 }}>
          {data.length > qIndex ? 
          <Questions 
            title={data[qIndex].question}
            maxIq={data.length}
            currentIq={qIndex + 1}
            questions={questions}
            onNextQuestion={onNextQuestion}
            answers={answers}
          /> : <QuizResult data={data}/>}
        </Box>
        </Container>
      );
}

export default QuizStart;