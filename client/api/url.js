var endpoint = "http://localhost:4200";

if (process.env.PRODUCTION === true) {
    // Having it empty on production allows url to be relative to where its being called from
    endpoint = "";
}

export default endpoint;
