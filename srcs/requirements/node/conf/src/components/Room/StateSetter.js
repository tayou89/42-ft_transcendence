import { MyReact } from "../../MyReact/MyReact.js";
import Fetch from "./Fetch.js";

class StateSetter {
    async setPlayers(newPlayers, currentPlayers, playerSetter) {
        const players = Object.values(newPlayers);
        const promises = []; 

        players.forEach((newPlayer, index) => {
            if (newPlayer?.pid !== currentPlayers[index]?.id)
                promises.push(Fetch.setUserData(playerSetter, newPlayer.pid, index));
        });
        await Promise.all(promises);
        players.forEach((newPlayer, index) => {
            if (newPlayer.pid && (newPlayer.ready !== currentPlayers[index]?.ready))
                playerSetter((prev) => this.#getNewPlayers(prev, index, newPlayer.ready));
        });
    }
    setGameData(newGameData, currentGameData, setGameData) {
        if (currentGameData.ball.x !== newGameData.ball[0] || 
            currentGameData.ball.y !== newGameData.ball[1])
            setGameData((prev) => ({ 
                ...prev, ball: { x: newGameData.ball[0], y: newGameData.ball[1] }}));
        if (currentGameData.paddle.p1 !== newGameData.paddle[0] || 
            currentGameData.paddle.p2 !== newGameData.paddle[1])
            setGameData((prev) => ({ 
                ...prev, paddle: { p1: newGameData.paddle[0], p2: newGameData.paddle[1] }}));
        if (currentGameData.score.p1 !== newGameData.score[0] || 
            currentGameData.score.p2 !== newGameData.score[1])
            setGameData((prev) => ({ 
                ...prev, score: { p1: newGameData.score[0], p2: newGameData.score[1] }}));
    }
    setGameResult(newGameResult, setGameResult) {
        setGameResult((prev) => ({ ...prev, newGameResult }));
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