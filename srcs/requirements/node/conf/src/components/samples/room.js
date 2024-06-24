import MyReact, { useEffect, useState } from "../../MyReact/MyReact";

function Room() {
    const [votesToSkip, votesToSkipSet] = useState(0);
    const [guestCanPause, guestCanPauseSet] = useState(false);
    const [isHost, isHostSet] = useState(false);
    const roomCode = "VTHXTH"; 
    useEffect(() => {
        fetch('http://localhost:8000/api/get-room?code=' + roomCode)
            .then(response => response.json())
            .then(data => {
                votesToSkipSet(_ => data.votes_to_skip);
                guestCanPauseSet(_ => data.guest_can_pause);
                isHostSet(_ => data.is_host);
            });
    }, []);

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause}</p>
            <p>Host: {isHost}</p>
        </div>
    )
}

export default Room;