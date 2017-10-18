var endpoint = "http://localhost:4200";

if (process.env.PRODUCTION === true) {
    endpoint = "";
}

export default endpoint;
