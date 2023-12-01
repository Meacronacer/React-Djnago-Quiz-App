import Header from "../header/header";
import Content from "../content/content";
import Footer from "../footer/footer";
import QuizDetail from "../quiz-detail/quiz-detail";
import QuizStart from "../quiz-start/quiz-start";
import QuizResult from "../quiz-result/quiz-result";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";

const App: FC = () => {
    return (
        <>
        <Header/>
        <Routes>
            <Route path='/' element={<Content/>} />
            <Route path='/:quizSlug' element={<QuizDetail/>} />
            <Route path='/:quizSlug/started' element={<QuizStart/>} />
            <Route path='/quiz-result' element={<QuizResult />} />
        </Routes>
        <Footer/>
        </>
    )
}

export default App;