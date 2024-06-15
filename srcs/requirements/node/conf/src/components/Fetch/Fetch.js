import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { DEFAULT_URL} from "./constant.js";

class Fetch {
    static setUserData(data, setData, userId = "me", id = "default") {
        useEffect(() => {
            const callMyData = async() => { 
                const userData = await this.userData(userId);

                console.log(id, data);
                setData((prev) => ({...prev, ...userData}));
                console.log(userData);
                console.log(id, data);
                // setData(() => userData);
            };
            callMyData();
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
            data.photoURL = await this.#photoURL(`/api/users/${data.id}/avatar`);
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

export default Fetch;