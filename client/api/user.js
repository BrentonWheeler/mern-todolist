import api from "./api";

export function register (username, password) {
    api
        .post("http://localhost:4200/users/register/", {
            data: { username: username, password: password }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function login (username, password) {
    console.log("logging in");
    api
        .post("http://localhost:4200/users/login/", {
            data: { username: username, password: password }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
