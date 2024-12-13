import { useMainContext } from "../state/context";
import { RESTART_GAME_ACTION } from "../types/types";

import Button from "./Button";

interface FinsihProps {
    scores: number
}

export default function Finsih({scores} : FinsihProps) {
    const {dispatch} = useMainContext();

    return <div className="finish">
        <h2>You did it!</h2>
        <h3>and you scores are...</h3>
        <h1>{Math.round(scores)}</h1>
        <div className="buttons">
            <Button onClick={() => dispatch({ type: RESTART_GAME_ACTION, paylod: null})}>Try again</Button>
        </div>
    </div>;
}