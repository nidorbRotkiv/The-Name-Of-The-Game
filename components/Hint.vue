<template>
  <button>
    <i @click="giveHint()" id="popup" class="fa-solid fa-lightbulb">
      <span :class="{ show: showHint }" class="popuptext" id="myPopup">{{ hint }}</span>
    </i>
  </button>
</template>

<script>
export default {
  name: 'Hint',
  props: {
    hint: String,
    showHint: Boolean,
  },
  methods: {
    giveHint() {
      this.$emit('giveHint')
    },
  },
}
</script>

<style scoped>
#popup {
  color: white;
  font-size: 1.5em;
}

#popup:hover {
  color: yellow;
}

/* The actual popup */
#popup .popuptext {
  font-size: medium;
  padding: 0.7vw;
  visibility: hidden;
  min-width: 40vh;
  max-width: 50vh;
  background-color: var(--barBackGround);
  color: white;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  right: 3vw;
}

#popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
