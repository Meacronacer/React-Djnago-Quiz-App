import { CssBaseline, Container} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QuizItem from '../quiz-list/quiz-list';
import ContentTop from './content-top';

const defaultTheme = createTheme();

const Content = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
    <Container sx={{ py: 8 }} maxWidth="md">
      <ContentTop/>
      <QuizItem/>
    </Container>
    </ThemeProvider>
  );
};

export default Content;
