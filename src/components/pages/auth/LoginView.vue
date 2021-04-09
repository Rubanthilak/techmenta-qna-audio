<template>
  <div class="container">
    <div class="card">
      <h2>Welcome</h2>
      <p class="subs">
          By logging in you accept our <span>Privacy Policy</span> and 
          <span>Terms of Service</span>.
      </p>
      <form @submit.prevent="validateCredentials" class="login-form flex">
        <input type="email" v-model="email" placeholder="Email"/>
        <input type="password" v-model="password" placeholder="Password"/>
        <p class="error-msg" v-if="errorMessage">{{errorMessage}}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      errorMessage: null
    };
  },
  methods: {
    async validateCredentials() {
      if (this.email && this.password) {
        try{
           await this.$store.dispatch(
            "login",
            {
            email: this.email,
            password: this.password,
            }
          );
          this.$router.replace("/");
        }
        catch(err){
          this.errorMessage = err.message;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.error-msg{
  color: var(--red);
  margin-top: 0px;
  margin-bottom:10px;
  max-width: 350px;
  font-size: 12px;
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
}

.card {
  padding: 25px;
  background: var(--primary-color-800);
  display: inline-block;
  border-radius: 8px;

.subs {
     max-width: 350px;
     font-size: 14px;
     margin-top: 10px;

     span{
         font-weight: var(--bold);
     }
  }
}

.login-form {
  flex-direction: column;
  max-width: 350px;
  max-height: 350px;
  margin-top: 25px;

  input {
    margin-bottom: 25px;
    padding: 12px 10px;
    border-radius: 6px;
    border: none;
    outline: none;
    background: var(--primary-color-700);
    color: var(--primary-color-100);
    font-family: var(--font);
    font-weight: var(--medium);
  }
}
</style>