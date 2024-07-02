import { MyReact } from "../../MyReact/MyReact.js";
import Fetch from "./Fetch.js";

class RoomStateSetter {
    static async setPlayers(newPlayers, playerSetter) {
        const newPlayersArray = Object.values(newPlayers);

        await updatePlayers(newPlayersArray, playerSetter);
        updateReadyStatus(newPlayersArray, playerSetter);;;
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
            playerSetter((prev) => ({ ...prev, players: prev.players.map((player, i) => (
                    i === index ? { ...player, ready: newPlayer.ready } : player))
            }));
        }
    });
}

export default RoomStateSetter;