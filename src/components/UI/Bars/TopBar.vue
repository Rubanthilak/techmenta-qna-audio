<template>
  <div class="nav-bar">
    <div class="container grid">
      <div class="logo-wrapper">
        <h1 class="logo">TechMentā</h1>
      </div>
      <div class="search-wrapper">
        <input type="text" class="search-bar" placeholder="Search for mentors or questions">
      </div>
      <div class="links-wrapper">
        <button>Log in</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .grid {
    display: grid;
    grid-column-gap: 30px;
    grid-template-columns: 200px auto 300px;
  }
}

.logo-wrapper{
  display: flex;
  width: 200px;
  align-items: center;  
}

.links-wrapper{
  display: flex;
  width: 180px;
  align-items: center;
  justify-content: space-between;

  button{
    padding: 6px 20px;
  }
}

.logo {
  font-size: 20px;
  color: var(--text-color);
  font-weight: var(--medium);
  cursor: pointer;
}

.search-wrapper{
  justify-content: center;
  display: flex;
}

.search-bar{
  width: 100%;
  padding: 12px 10px;
  border-radius: 6px;
  border: none;
  outline: none;
  background: var(--primary-color-700);
  color: var(--primary-color-100);
  font-family: var(--font);
  font-weight: var(--medium)
}

</style>