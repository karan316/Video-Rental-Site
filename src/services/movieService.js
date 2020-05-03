import http from "./httpService";
// import { apiUrl } from "../config.json";

// const apiEndPoint = apiUrl + "/movies";
const apiEndPoint = "/movies";

export function getMovies() {
    return http.get(apiEndPoint);
}

export function getMovie(movieId) {
    return http.get(apiEndPoint + "/" + movieId);
}

export function saveMovie(movie) {
    if (movie._id) {
        //updating the existing movie
        const body = { ...movie };
        delete body._id; //remove the id from the body of movie because put does not take id
        return http.put(apiEndPoint + "/" + movie._id, body);
    }

    //adding a new movie
    return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
    return http.delete(apiEndPoint + "/" + movieId);
}
