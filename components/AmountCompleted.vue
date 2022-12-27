<template>
  <h2>{{ completed }}/{{ numberOfGames }}</h2>
</template>

<script>
export default {
  name: 'AmountCompleted',
  props: {
    numberOfGames: Number,
    completed: Number,
  },
}
</script>
