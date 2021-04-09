export default {
    isAuthenticated(state) {
        return state.token ? true : false;
    },
    didAutoLogout(state){
        return state.didAutoLogout;
    }
}