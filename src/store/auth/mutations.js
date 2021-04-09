export default {
    setTokenInfo(state,payload){
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
    },
    setAutoLogout(state){
        state.didAutoLogout = true;
    }
}