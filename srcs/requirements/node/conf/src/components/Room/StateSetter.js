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