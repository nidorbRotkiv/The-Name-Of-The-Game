<template>
  <div id="timeBar" class="progress">
    <div class="progressFill">
      <span class="progressText">20 P</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  methods: {
    updateTimer(val, points) {
      val = Math.round(val)
      if (val == 0) {
        this.$el.querySelector('.progressFill').style.transition = 'all 0.2s'
      } else {
        this.$el.querySelector('.progressFill').style.transition = `all 1s`
      }
      this.$el.querySelector('.progressFill').style.width = `${val}%`
      this.$el.querySelector('.progressText').textContent = points + ' P'
    },
  },
}
</script>

<style scoped>
.progress {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  position: relative;
  width: 100%;
  height: 8vh;
  background: var(--barBackGround);
}

.progressFill {
  max-width: 100%;
  width: 0%;
  height: 100%;
  background-image: linear-gradient(
    to left,
    var(--lightgreen),
    var(--darkgreen)
  );
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.progressText {
  cursor: default;
  word-spacing: -2vh;
  position: absolute;
  top: 0;
  font-size: 5vh;
  left: 1vw;
  color: whitesmoke;
  transform: perspective(200px) rotateX(15deg);
  font-family: PressStart2P;
  background: var(--gradientTitle);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  filter: drop-shadow(4px 5px rgb(0, 0, 0));
}
</style>
