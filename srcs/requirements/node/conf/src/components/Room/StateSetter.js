import { MyReact } from "../../MyReact/MyReact.js";
import Fetch from "./Fetch.js";

class StateSetter {
    async setPlayers(newPlayers, playerSetter) {
        const newPlayersArray = Object.values(newPlayers);

        await updatePlayers(newPlayersArray, playerSetter);
        updateReadyStatus(newPlayersArray, playerSetter);;;
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
        setGameResult((prev) => ({ ...prev, result: newGameResult }));
    }
}

async function updatePlayers(newPlayers, playerSetter) {
    const promises = newPlayers.map(newPlayer => Fetch.userData(newPlayer.pid));
    const updatedPlayers = await Promise.all(promises);

    playerSetter((prev) => {
        return ({...prev, players: updatedPlayers});
    });
} 

function updateReadyStatus(newPlayers, playerSetter) {
    newPlayers.forEach((newPlayer, index) => {
        if (newPlayer.pid) {
            playerSetter((prev) => ({ 
                ...prev, 
                players: prev.players.map((player, i) => (
                    i === index ? { ...player, ready: newPlayer.ready } : player))
            }));
        }
    });
}

export default StateSetter;