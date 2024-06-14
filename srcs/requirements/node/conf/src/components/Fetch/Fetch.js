import { DEFAULT_URL} from "./constant.js";

class Fetch {
    static async myData() {
        try {
            const url = `${DEFAULT_URL}/api/users/me`;
            const details = { method: 'GET', credentials: 'include' };
            const response = await fetch(url, details);
            const data = await response.json();

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