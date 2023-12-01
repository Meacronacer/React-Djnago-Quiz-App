import { Card, CardContent, Typography, FormGroup, CardActions, Button} from '@mui/material'

interface Question {
    title: string;
    currentIq: number;
    maxIq: number;
    questions: any;
    answers: object;
    onNextQuestion: () => void;
}


const Questions = ({title, currentIq, maxIq, questions, answers, onNextQuestion}: Question) => {
  return (
    <Card component="form" variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {currentIq} Question of {maxIq}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {title}
        </Typography>

        <FormGroup>{questions}</FormGroup>
      </CardContent>
      <CardActions>
        <Button
          onClick={onNextQuestion}
          disabled={!Object.values(answers).includes(true)}
          fullWidth
          variant="outlined"
          size="small"
        >
          Next Question
        </Button>
      </CardActions>
    </Card>
  );
};


export default Questions