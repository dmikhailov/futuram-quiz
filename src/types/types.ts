import { Dispatch } from 'react';

export type TChildren = JSX.Element | JSX.Element[] | React.ReactElement | React.ReactElement[] | string;

export interface OnlyChildrenProps {
    children: TChildren
}

export const STAGE_START = "start";
export const STAGE_QUIZ = "quiz";
export const STAGE_FINISH = "finish";
export type TStage = typeof STAGE_START | typeof STAGE_QUIZ | typeof STAGE_FINISH;

export type TState = {
    stage: TStage,
    question: number,
    score: number
};


export const START_GAME_ACTION = "start_game";
export const RESTART_GAME_ACTION = "restart_game";
export const ANSWER_QUESTION = "ansver_question";
export type TAction = {
    type: typeof START_GAME_ACTION | typeof RESTART_GAME_ACTION | typeof ANSWER_QUESTION,
    paylod: any
};


export type TContext = {
    state: TState;
    dispatch: Dispatch<TAction>;
};


export type TPayloadAnswerQuestion = {
    isLast: boolean;
    score: number
}

export type TQuestion = {
    text: string,
    options: string[],
    correctAnswer: number;
};