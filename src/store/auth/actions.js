let timer;
export default {
  tryAutoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = + tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
        context.dispatch("autoLogout")
    }, expiresIn);
    
    if (token && userId) {
      context.commit("setTokenInfo", {
        token: token,
        userId: userId,
      });
    }
  },
  async login(context, payload) {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrtGGTF-z7nvjV7HkDE_nv2lB66_rXgkw",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await res.json();

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    timer = setTimeout(() => {
        context.dispatch("autoLogout")
    }, expiresIn);

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    if (res.ok) {
      context.commit("setTokenInfo", {
        token: responseData.idToken,
        userId: responseData.localId,
      });
    } else {
      const err = new Error(
        responseData.message || "Failed to authenticate. Try again"
      );
      throw err;
    }
  },
  autoLogout(context){
    context.dispatch("logout");
    context.commit("setAutoLogout")
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setTokenInfo", {
      token: null,
      userId: null,
    });
  },
};
