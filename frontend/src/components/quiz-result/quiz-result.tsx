import { Container, Typography, Box, Card, Button } from "@mui/material"
import BasicTabs from "./table-result";


const QuizResult = ({data}: any) => {

    return (
        <Container sx={{ py: 8}} maxWidth='md'>
            <Box sx={{ minWidth: 275 }}>
            <Card component="div" variant="outlined" >
                <Typography sx={{ m: 5}} variant='h4' align="center">
                    Congrat Quiz is end <br/>
                    your result: 4 / 6
                </Typography>
                <Box sx={{ mb: 4}} textAlign='center'>
                    <Button color="secondary" sx={{ m: 2}} variant="outlined">see more details</Button>
                    <Button variant="outlined">Try one more time</Button>
                </Box>
                <BasicTabs data={data}/>
            </Card>
            </Box>
        </Container>
    )
}


export default QuizResult;