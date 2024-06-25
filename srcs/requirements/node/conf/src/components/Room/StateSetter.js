import { MyReact } from "../../MyReact/MyReact.js";
import Fetch from "./Fetch.js";

class StateSetter {
    async setPlayers(newPlayers, playerSetter) {
        const players = Object.values(newPlayers);
        const promises = []; 

        players.forEach((newPlayer, index) => {
                promises.push(Fetch.setUserData(playerSetter, newPlayer.pid, index));
        });
        await Promise.all(promises);
        players.forEach((newPlayer, index) => {
            if (newPlayer.pid)
                playerSetter((prev) => this.#getNewPlayers(prev, index, newPlayer.ready));
        });
    }
    setGameData(newGameData, setGameData) {
         setGameData((prev) => ({ 
             ...prev, 
             ball: { x: newGameData.ball[0], y: newGameData.ball[1] },
             paddle: { p1: newGameData.paddle[0], p2: newGameData.paddle[1] },
             score: { p1: newGameData.score[0], p2: newGameData.score[1] }
         }));
    }
    setGameResult(newGameResult, setGameResult) {
        setGameResult((prev) => ({ ...prev, ...newGameResult }));
    }
    #getNewPlayers(prev, index, readyStatus) {
       const newArray = prev.map((player, i) => {
           if (i === index)
               return ({ ...player, ready: readyStatus });
           else
               return (player);
       });
        return (newArray);
    }
}

export default StateSetter;