import { Container, Box, Checkbox, FormControlLabel, } from "@mui/material";
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useGetQuizQuestionsQuery } from "../../Redux/api/quizApi";
import { addAnswer, nextQuestion, changeScore, changeMaxpoints} from "../../Redux/slices/AnswersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import QuizResult from "../quiz-result/quiz-result";
import Questions from "./questions";

const QuizStart: React.FC = () => {
    const { quizSlug } = useParams()
    const [answers, setAnswers] = useState<any>({})
    const [listState, setListState] = useState<any>({})
    const dispatch = useAppDispatch()
    const { qIndex,userAnswers } = useAppSelector(state => state.answers)
    const { data = [], isLoading } = useGetQuizQuestionsQuery(quizSlug) 

    if (isLoading) {
        return null
    }

    const onCheckBox = (e:any, index:any) => {
      for (let i = 0; i < data[qIndex].answers.length; i++) {
      }
      setListState({
        ...listState,
        [index]: e.target.checked
      })
      setAnswers({
          ...answers,
          [e.target.name]: e.target.checked
      })
    }
  
    const onNextQuestion = () => {
        let keys = Object.keys(answers).filter((item:any) => answers[item])
        let findWrongUserAns = false

        for (let i = 0; i < data[qIndex].answers.length; i++) {
          // console.log(data[qIndex].answers[i], data[qIndex].answers[i][i])
          if (keys.includes(data[qIndex].answers[i][i]) && !data[qIndex].answers[i]['correct']) {
            findWrongUserAns = true
            break
          }
        }

        if (!findWrongUserAns) {
          dispatch(changeScore(data[qIndex]['score'] * keys.length))
        }
        dispatch(changeMaxpoints(data[qIndex].answers.filter((item:any) => item.correct).length * data[qIndex]['score']))
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