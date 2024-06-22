import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import  tokenRefreshAndGoTo  from "../utility/tokenRefreshAndGoTo.js";
import { URL_PATH } from "../Game/constant.js";

class Fetch {
    static async setUserData(setFunction, userId = 0, index = -1) {
        const userData = await Fetch.userData(userId);

        if (index >= 0) 
            setFunction((prev) => (setArray(prev, userData, index)));
        else
            setFunction((prev) => (setObject(prev, userData)));
    }
    static async userData(id) {
        if (!id)
            throw Error(`Fetch.userData: id doesn't exist: ${id}`);
        try {
            const url = `${URL_PATH.BACK_API}/api/users/${id}`;
            const details = { method: 'GET', credentials: 'include' };
            const response = await fetch(url, details);
            const data = await response.json();

            if (data.detail)
				tokenRefreshAndGoTo("/home");
            if (!response.ok)
                throw new Error(`response isn't ok for url ${url}`);
            // data.photoURL = await this.#photoURL(`/api/users/${data.id}/avatar`);
            data.photoURL = "https://i.namu.wiki/i/pbiRSb1PcKUVrKoGIxrVY_sEWHxNH6jbRxYsZ4wCCv-FUe36aQF27YAokQnxERM_0keumIzF2DBOlY0Lh0qVvD4jzxoDnOQpO5g5RIo35LuhWSDIOxhTdU_IO2K7HGI9VfBUTjiICsX08gIoqprNtw.webp"
            return (data);
        }
        catch (error) {
            console.error("Error", error);
        }
    }
    static async #photoURL(path) {
        try {
            const url = URL_PATH.BACK_API + path;
            const details = { method: 'GET', credentials: 'include' };
            const response = await fetch(url, details);
            const blob = await response.blob();
            const photoURL = URL.createObjectURL(blob)

            if (!response.ok)
                throw new Error(`response isn't ok for url ${url}`);
            return (photoURL);
        }
        catch (error) {
            console.error("Error", error);
        }
    }
}

function setArray(prev, data, index) {
    const newArray = [...prev];
    
    if (!data)
        newArray[index] = {};
    else
        newArray[index] = data;
    return (newArray);
}

function setObject (prev, data) {
    if (!data)
        return ({});
    else
        return ({...prev, ...data});
}

export default Fetch;