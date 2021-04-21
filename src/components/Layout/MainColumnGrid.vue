<template>
    <div class="grid-container container">
        <div>
            <slot name="lhs"></slot>
        </div>
        <div>
            <slot name="feed"></slot>
        </div>
        <div>
            <slot name="rhs"></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>

.grid-container {
  display: grid;
  grid-column-gap: 30px;
  grid-template-columns: 200px auto 100px;
}

</style>