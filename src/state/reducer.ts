import {
    TState, TAction,
    TPayloadAnswerQuestion,
    STAGE_START, STAGE_QUIZ, STAGE_FINISH,
    START_GAME_ACTION, RESTART_GAME_ACTION, ANSWER_QUESTION
} from '../types/types';

const MIN_SCORE = 50;
const MAX_SCORE = 100;

export function reducer(state: TState, action: TAction): TState {
    switch (action.type) {
        case START_GAME_ACTION:
            return {
                ...state,
                stage: STAGE_QUIZ,
                question: 0,
                score: 0
            };

        case RESTART_GAME_ACTION:
            return {
                ...state,
                stage: STAGE_START
            };

        case ANSWER_QUESTION:
            {
                const paylod = action.paylod as TPayloadAnswerQuestion;
                let score = 0; 
                if (paylod.score !== 0) {
                    score = MIN_SCORE + ((paylod.score - 1) / (100 - 1)) * (MAX_SCORE - MIN_SCORE);
                }
                if (paylod.isLast) {
                    return {
                        ...state,
                        stage: STAGE_FINISH,
                        score: state.score + score
                    };
                } else {
                    return {
                        ...state,
                        question: (state.question || 0) + 1,
                        score: state.score + score
                    };
                }
            }
    }
    return state;
}