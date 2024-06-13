import { DEFAULT_URL} from "./constant.js";

class Fetch {
    static async myData() {
        try {
            const url = `${DEFAULT_URL}/api/users/me`;
            const details = { method: 'GET', credentials: 'include' };
            const response = await fetch(url, details);
            const myData = await response.json();

            if (!response.ok)
                throw new Error(`response isn't ok for url ${url}`);
            return (myData);
        }
        catch (error) {
            console.error("Error", error);
        }
    }
}

export default Fetch;