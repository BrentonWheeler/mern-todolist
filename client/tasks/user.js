import axios from "axios";

export function register (username, password) {
    axios
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
    axios
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
