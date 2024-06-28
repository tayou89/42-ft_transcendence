import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { URL_PATH } from "../Game/constant.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo.js";

class Fetch {
    static async userData(id) {
        try {
			if (!id)
				throw Error(`Fetch.userData: id doesn't exist: ${id}`);
            const path = id === "me" ? `/api/${id}` : `/api/users/${id}`;
            const url = `${URL_PATH.BACK_API}${path}`;
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
			return ({});
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

export default Fetch;