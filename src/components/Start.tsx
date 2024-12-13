import { useMainContext } from "../state/context";
import { START_GAME_ACTION } from "../types/types";
import Button from "./Button";

export default function Start() {
    const {dispatch} = useMainContext();

    return <div className="start">
        <h2>Welcome to Futuram quiz</h2>
        <h3>I hope you came not to play but to win, so... let's play</h3>
        <div className="buttons">
            <Button onClick={() => dispatch({ type: START_GAME_ACTION, paylod: null })}>Play</Button>
        </div>
    </div>;
}