import { useMainContext } from "./state/context";
import Finsih from "./components/Finish";
import Question from "./components/Question"
import Start from "./components/Start";
import data from "./data/questions.json";
import { STAGE_FINISH, STAGE_QUIZ, STAGE_START, TQuestion } from "./types/types";

const questions = data as TQuestion[];

function App() {
  const {state} = useMainContext();
  const question = questions[state.question];
  const isLast = questions.length - 1 === state.question;

  return (
    <>
      <h1>futurama quiz</h1>
      <main>
        {state.stage === STAGE_START && <Start />}
        {state.stage === STAGE_QUIZ && <Question number={state.question + 1} question={question} isLast={isLast} /> }
        {state.stage === STAGE_FINISH && <Finsih scores={state.score} />}
      </main>
    </>
  )
}

export default App
