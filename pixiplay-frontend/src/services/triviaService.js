import { api } from "./api";

export function getTrivia() {
    return api("/trivia");
}