import { useEffect, useRef, useState } from "react";
import { useMainContext } from "../state/context";
import { ANSWER_QUESTION, TQuestion } from "../types/types";

import Button from "./Button";

interface QuestionProps {
    number: number,
    question: TQuestion,
    isLast: boolean
}

const WAITING = "waiting";
const ANSWERED = "answered";
const SHOW_CORRECT = "show_correct";
const NEXT_QUESTION = "next_question";

const MAX_TIME = 5000;
const INIT_STATE: QuestionState = { answer: null, state: WAITING };

interface QuestionState {
    answer: number | null,
    state: typeof WAITING | typeof ANSWERED | typeof SHOW_CORRECT | typeof NEXT_QUESTION;
}

export default function Question({ number, question, isLast = false }: QuestionProps) {
    const { dispatch } = useMainContext();
    const [state, setState] = useState<QuestionState>({ ...INIT_STATE });
    const progress = useRef<HTMLProgressElement>(null);

    useEffect(() => {
        let remainingTime: number = MAX_TIME;
        let timer: ReturnType<typeof setTimeout> | null = null;

        if (state.state === WAITING) {
            timer = setInterval(() => {
                remainingTime -= 100;
                if (progress.current) {
                    if (remainingTime < 0) {
                        progress.current.value = 0;
                    } else {
                        progress.current.value = remainingTime * 100 / MAX_TIME;
                    }
                }
            }, 100);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [state.state]);

    useEffect(() => {
        let lastTimer: ReturnType<typeof setTimeout>;

        if (state.state === WAITING) {
            lastTimer = setTimeout(() => {
                setState(state => ({
                    ...state,
                    state: ANSWERED
                }));
            }, MAX_TIME);
        }

        if (state.state === ANSWERED) {
            setTimeout(() => {
                setState(state => {
                    return {
                        ...state,
                        state: SHOW_CORRECT
                    };
                });
            }, 1000)
        }

        if (state.state === SHOW_CORRECT) {
            setTimeout(() => {
                setState(state => {
                    return {
                        ...state,
                        state: NEXT_QUESTION
                    };
                });
            }, 1000)
        }

        if (state.state === NEXT_QUESTION) {
            let score:number = 0;
            if (state.answer === question.correctAnswer && progress.current) {
                score = progress.current.value || 1;
            }
            setTimeout(() => {
                setState({ ...INIT_STATE });
                dispatch({ type: ANSWER_QUESTION, paylod: { isLast, score } });
            }, 1000)
        }

        return () => {
            if (lastTimer) clearTimeout(lastTimer);
        };
    }, [state.state])

    const handlerClick = (answer: number) => {
        setState(state => {
            return {
                ...state,
                state: ANSWERED,
                answer
            };
        });
    };

    return <div className="question">
        <h2>Question N{number}</h2>
        <h3>{question.text}</h3>
        <div className="buttons">
            {question.options.map((option, idx) => {
                const disabled = state.state !== WAITING;
                let className = "";
                if (idx === state.answer) {
                    className += " choosen";
                }

                if (state.state === SHOW_CORRECT && idx === question.correctAnswer) {
                    className += " correct";
                }
                return <Button key={idx} onClick={() => handlerClick(idx)} disabled={disabled} className={className}>
                    {option}
                </Button>;
            })}
        </div>
        <progress ref={progress} max="100" value={100} className={state.state !== WAITING ? "hiiden" : ""}></progress>
    </div>;
}