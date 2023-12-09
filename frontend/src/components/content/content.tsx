import { CssBaseline, Container} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QuizItem from '../quiz-list/quiz-list';
import ContentTop from './content-top';
import { ToastContainer } from 'react-toastify';

const defaultTheme = createTheme();

const Content = () => {

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
    <Container sx={{ py: 8 }} maxWidth="md">
      <ContentTop/>
      <QuizItem/>
    </Container>
    <ToastContainer/>
    </ThemeProvider>
  );
};

export default Content;
