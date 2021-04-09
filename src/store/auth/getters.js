export default {
    isAuthenticated(state) {
        return state.user.loggedIn;
    },
    getUserData(state){
        return state.user.data
    }
}