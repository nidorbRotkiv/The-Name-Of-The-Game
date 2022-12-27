<template>
  <main>
    <h1 id="titleHeading">THE NAME OF THE GAME</h1>
    <div class="ranking">
      <div class="rankingItem">
        <h2 class="rankingItemRank">RANK</h2>
        <h2 class="rankingItemName">NAME</h2>
        <h2 class="rankingItemPoints">POINTS</h2>
      </div>
      <div v-for="item in ranking" :key="item.name" class="rankingItem">
        <h3 class="rankingItemRank">{{ item.rank + "." }}</h3>
        <h3 class="rankingItemName">{{ item.name }}</h3>
        <h3 class="rankingItemPoints">{{ item.points }}</h3>
      </div>
    </div>
    <div class="menu">
      <button id="big-btn" @click="mainMenu()" class="start-btn">
        PLAY AGAIN
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: "RankingPage",
  data() {
    return {
      ranking: [],
    };
  },
  methods: {
    async mainMenu() {
      location.reload();
    },
  },
  async created() {
    this.ranking = await fetch("api/ranking").then((res) => res.json());
    // sort ranking by points and give each item a rank
    this.ranking.sort((a, b) => b.points - a.points);
    this.ranking.forEach((item, index) => {
      item.rank = index + 1;
    });
  },
};
</script>

<style scoped>
.menu {
  margin-top: 4vh;
  margin-bottom: 4vh;
}

h2 {
  color: var(--lightgreen);
  font-size: large;
}
.rankingItem {
  word-break: break-all;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1vw;
  padding-top: 0.9vh;
  padding-bottom: 0.9vh;
  margin-left: 2vw;
  margin-right: 2vw;
  border-bottom: 1px solid var(--lightgreen);
  color: white;
}
</style>
