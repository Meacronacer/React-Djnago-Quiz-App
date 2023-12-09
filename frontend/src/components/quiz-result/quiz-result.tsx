import { Container, Typography, Box, Card, Button } from "@mui/material"
import { useState } from 'react'
import BasicTabs from "./table-result";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useSaveQuizResultMutation } from "../../Redux/api/quizApi";
import { useNavigate, useParams } from "react-router-dom";
import { successSavedResult } from "../../messages/messages";
import { clearUserAnswers } from "../../Redux/slices/AnswersSlice";

interface quizInterface {
    userAnswers: boolean
    qIndex: number
    quizName: string
    score: number
    rightAnswers: number
    maxPoints: number
}

interface QuizResultProps {
    data: any[]
}


const QuizResult: React.FC<QuizResultProps> = ({data}) => {
    const [toggle, setToogle] = useState<boolean | string>(false)
    const { token } = useAppSelector((state) => state.authSlice)
    const { score, rightAnswers, maxPoints, userAnswers } = useAppSelector((state: { answers: any; }) => state.answers)
    const [saveQuizResult, {isLoading, isError, error}] = useSaveQuizResultMutation()
    const { quizSlug } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const saveResult = () => {
        saveQuizResult(
            {data:{
            'quiz': quizSlug,
            'answers': userAnswers
            },
            token,
        }
        ).unwrap().then(() => {
            successSavedResult()
            navigate('/')
        }).catch(err => {})
    } 

    return (
        <Container maxWidth='md'>
            <Box sx={{ minWidth: 275 }}>
            <Card component="div" variant="outlined" >
                <Typography sx={{ m: 5}} variant='h4' align="center">
                    Congrat Quiz is end <br/>
                    your questions result {rightAnswers} / {data.length} <br/>
                    you scored {score} points out of {maxPoints}
                </Typography>
                <Box sx={{ mb: 4}} textAlign='center'>
                    <Button sx={{ m: 2}} 
                    onClick={() => setToogle(!toggle)} 
                    color="secondary" 
                    variant="outlined">see more details</Button>
                    <Button onClick={() => dispatch(clearUserAnswers())} variant="outlined">Try one more time</Button>
                    <Button disabled={isLoading} onClick={saveResult} sx={{ m: 2}} variant="outlined">Save Result</Button>
                </Box>
            {toggle && <BasicTabs data={data}/>}
            </Card>
            </Box>
        </Container>
    )
}


export default QuizResult;