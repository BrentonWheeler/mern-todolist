export const loginAction = username => {
    console.log("user logged in: ", username);
    return {
        type: "USER_LOGIN",
        payload: username
    };
};
