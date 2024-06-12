import { KEY, DIRECTION } from "./constant.js"

class EventHandler {
    static keyDown(event) {
        if (KEY.UP.includes(event.key))
            return (DIRECTION.UP);
        else if (KEY.DOWN.includes(event.key))
            return (DIRECTION.DOWN);
    }
    static keyUp(event) {
        if (KEY.UP.includes(event.key) || KEY.DOWN.includes(event.key))
            return (DIRECTION.NONE);
    }
}

export default EventHandler;