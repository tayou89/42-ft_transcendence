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
            return (data);
        }
        catch (error) {
            console.error("Error", error);
        }
    }
    static async photo(path) {
        try {
            const url = DEFAULT_URL + path;
            const details = { method: 'GET', credentials: 'include' };
            const response = await fetch(url, details);

            console.log("This is photo response:", response);
            if (!response.ok)
                throw new Error(`response isn't ok for url ${url}`);
            return (response);
        }
        catch (error) {
            console.error("Error", error);
        }
    }
}

export default Fetch;