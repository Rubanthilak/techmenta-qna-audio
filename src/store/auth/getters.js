export default {
    isAuthenticated(state) {
        return state.user.loggedIn;
    },
    user(state){
        return state.user
    }
}