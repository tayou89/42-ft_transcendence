import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";

class StateSetter {
    async setPlayers(newPlayers, currentPlayers, playerSetter) {
        const newPlayers = Object.values(newPlayers);
        const promises = []; 

        newPlayers.forEach((newPlayer, index) => {
            if (newPlayer?.pid !== currentPlayers[index]?.id)
                promises.push(Fetch.setUserData(playerSetter, newPlayer.pid, index));
            if ((newPlayer.pid && currentPlayers[index].id) && 
                (newPlayer.ready !== currentPlayers[index]?.ready))
                playerSetter((prev) => this.#getNewPlayers(prev, index));
        });
        await Promise.all(promises);
    }
    setGameData(newGameData, currentGameData, setGameData) {
        const currentBall = Object.values(currentGameData.ball);
        const currentPaddle = Object.values(currentGameData.paddle);
        const currentScore = Object.values(currentGameData.score);
        const [ newBall  newGameData.ball;

        if (game.ball.x !== ball[0] || game.ball.y !== ball[1])
            setGame((prev) => ({ ...prev, ball: { x: ball[0], y: ball[1] }}));
        if (game.paddle.p1 !== paddle[0] || game.paddle.p2 !== paddle[1])
            setGame((prev) => ({ ...prev, paddle: { p1: paddle[0], p2: paddle[1] }}));
        if (game.score.p1 !== score[0] || game.score.p2 !== score[1])
            setGame((prev) => ({ ...prev, score: { p1: score[0], p2: score[1] }}));
    }
    #getNewPlayers(prev, index) {
       const newArray = prev.map((player, i) => {
           if (i === index)
               return ({ ...player, ready: !player.ready });
           else
               return (player);
       });

        return (newArray);
    }
}



export default StateSetter;