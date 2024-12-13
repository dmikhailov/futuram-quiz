import { FC, useReducer, createContext, useContext } from 'react';
import { reducer } from './reducer';
import { INITIAL_STATE } from './state';
import { OnlyChildrenProps, TContext, TState, TAction } from '../types/types';

export const Context = createContext({} as TContext);

export const ContextProvider: FC<OnlyChildrenProps> = ({ children }) => {
    const [state, dispatch] = useReducer<(state: TState, action: TAction) => TState>(reducer, INITIAL_STATE);
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
};

export const useMainContext = () => {
    return useContext(Context);
  };