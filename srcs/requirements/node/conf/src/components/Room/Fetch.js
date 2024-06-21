import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { DEFAULT_URL} from "../Game/constant.js";

class Fetch {
    static setUserData(setFunction, userId = 0, index = -1) {
        useEffect(() => {
            const setData = async() => { 
                const userData = await Fetch.userData(userId);

                if (index >= 0) 
                    setFunction((prev) => (setArray(prev, userData, index)));
                else
                    setFunction((prev) => (setObject(prev, userData)));
            };
            setData();
        }, []);
    }
    static async userData(id) {
        if (!id)
            throw Error(`Fetch.userData: id doesn't exist: ${id}`);
        try {
            const url = `${DEFAULT_URL}/api/users/${id}`;
            const details = { method: 'GET', credentials: 'include' };
            const response = await fetch(url, details);
            const data = await response.json();

            if (data.detail)
				tokenRefreshAndGoTo("/home");
            if (!response.ok)
                throw new Error(`response isn't ok for url ${url}`);
            // data.photoURL = await this.#photoURL(`/api/users/${data.id}/avatar`);
            data.photoURL = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.health.chosun.com%2Fsvc%2Fnews_view.html%3Fcontid%3D2023071701758&psig=AOvVaw1pSpRlHndYU03ECJlCuCyF&ust=1718971063768000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDPgq-Q6oYDFQAAAAAdAAAAABAE";
            return (data);
        }
        catch (error) {
            console.error("Error", error);
        }
    }
    static async #photoURL(path) {
        try {
            const url = DEFAULT_URL + path;
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