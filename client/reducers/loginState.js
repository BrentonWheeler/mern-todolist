export default function(state=null, action){
  switch(action.type){
    case "USER_LOGIN":
      return {
          loggedIn: true,
          username: action.payload
        }
      break;
  }
    return {
        loggedIn: false,
        username: ''
      }
}
