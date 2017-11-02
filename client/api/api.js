import axios from "axios";

var api;

function checkENV () {
    if (ENV === "development") {
        api = axios.create({
            baseURL: "localhost:4200"
        });
    } else {
        api = axios.create({
            baseURL: window.location.origin
        });
    }
}

checkENV();
export default api;
