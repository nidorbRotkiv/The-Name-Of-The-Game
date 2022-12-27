<template>
  <div id="border">
    <img
      v-bind:src="imageURL"
      alt="Game Cover"
      :style="{ filter: `blur(${blur}px)` }"
    />
  </div>
</template>

<script>
export default {
  name: 'GameCover',
  props: {
    blur: Number,
    imageURL: String,
  },
}
</script>

<style scoped>
#border {
  display: flex;
  justify-content: center;
  border-style: solid;
  border-radius: 30px;
  border-color: #646464;
  margin-top: 5vh;
  margin-bottom: 5vh;
  filter: drop-shadow(0 0 150px var(--darkgreen));
  /* makes cover go behind the hint element */
  position: relative;
  z-index: -1;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
}

img {
  border-radius: 10px;
  width: 40vh;
  height: 53vh;
  transition: all 0.3s;
  -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none;    
}
</style>
