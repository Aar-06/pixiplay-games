import { api } from "./api";

export function saveScore(userId, gameName, score) {
    return api(`/score/${userId}`, {
        method: "POST",
        body: JSON.stringify({
            gameName,
            score,
        }),
    });
}