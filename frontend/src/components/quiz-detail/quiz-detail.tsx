import { useParams, useNavigate } from "react-router-dom";
import { useGetQuizDetailQuery } from "../../Redux/api/quizApi";
import { Container, Box, Button, Typography } from "@mui/material";


const QuizDetail = () => {
  const navigate = useNavigate()
  const { quizSlug } = useParams();
  const { data = [], isLoading } = useGetQuizDetailQuery(quizSlug);

  if (isLoading) {
    return null;
  }

  return (
    <Container style={{ background: '#f2f6fc', marginTop:'100px' }} sx={{ py: 2 }} maxWidth='md'>
        <Typography align="center" variant="h3">
            {data.name}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Category: {data.category} <br/>
              Questions: 15 <br/>
              Time: 10 minutes
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
        <Box textAlign='right'>
            <Button onClick={() => navigate(`../${quizSlug}/started`)}
             variant='contained'>
                Start Quiz
            </Button>
        </Box>
    </Container>
  );
};

export default QuizDetail;
