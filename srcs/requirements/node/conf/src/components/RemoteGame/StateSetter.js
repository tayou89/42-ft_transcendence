import { MyReact } from "../../MyReact/MyReact.js";
import RoomStateSetter from "../Room/StateSetter.js";

class RemoteGameStateSetter extends RoomStateSetter {
    static setGameData(newGameData, setGameData) {
         setGameData((prev) => ({ 
             ...prev, 
             ball: { x: newGameData.ball[0], y: newGameData.ball[1] },
             paddle: { p1: newGameData.paddle[0], p2: newGameData.paddle[1] },
             score: { p1: newGameData.score[0], p2: newGameData.score[1] }
         }));
    }
    static setGameResult(newGameResult, setGameResult) {
        setGameResult((prev) => ({ ...prev, result: newGameResult }));
    }
}

export default RemoteGameStateSetter;