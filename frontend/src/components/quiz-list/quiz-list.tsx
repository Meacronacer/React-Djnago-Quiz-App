import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { useGetQuizListQuery } from "../../Redux/api/quizApi";
import { useNavigate } from "react-router-dom";


const QuizItem = () => {

  const navigate = useNavigate()
  const {data: quizList = [], isLoading} = useGetQuizListQuery(null)

  if (isLoading) {
    return null
  }

  return (
    <Grid container spacing={4}>
        {quizList.map((item:any) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography>
                  category | {item.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => navigate(item.slug)} 
                size="small">More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

export default QuizItem