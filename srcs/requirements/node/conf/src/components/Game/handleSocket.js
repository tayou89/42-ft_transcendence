import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { KEY, GAME_POSITION } from "./constant.js";
import { SOCKET } from "../Room/socket.js";

export function receiveGameData(socket, game, setGame) {
    const handleGameEvent = ({ ball, paddle, score }) => {
        if (game.score.p1 !== score[0] || game.score.p2 !== score[1])
            setGame((prev) => ({ ...prev, score: { p1: score[0], p2: score[1] }}));
        if (game.ball.x !== ball[0] || game.ball.y !== ball[1])
            setGame((prev) => ({ ...prev, ball: { x: ball[0], y: ball[1] }}));
        if (game.paddle.p1 !== paddle[0] || game.paddle.p2 !== paddle[1])
            setGame((prev) => ({ ...prev, paddle: { p1: paddle[0], p2: paddle[1] }}));
    };

    useEffect(() => {
        socket.on(SOCKET.EVENT.GAME, handleGameEvent);
        return (() => {
            socket.off(SOCKET.EVENT.GAME, handleGameEvent);
        })
    }, []);
}

export function receiveGameResult(socket, setResult, position) {
    const handleResultEvent = ({ p1, p2 }) => {
        const handleClickEvent = () => navigate("/main");

        if (position === GAME_POSITION.LEFT)
            setResult((_) => p1);
        else
            setResult((_) => p2);
        document.addEventListener("click", handleClickEvent);
        return (() => document.removeEventListener("click", handleClickEvent));
    };

    useEffect(() => {
        socket.on(SOCKET.EVENT.RESULT, handleResultEvent);
        return (() => socket.off(SOCKET.EVENT.RESULT, handleResultEvent));
    }, []);
}