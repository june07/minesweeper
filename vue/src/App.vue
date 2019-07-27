<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Game :width="difficulty" :percent="percent" :show="false" :key="gameId"
      @resetButtonEvent="reset()"
      @resetButtonEvent:difficulty="reset('difficulty', $event)"
      @resetButtonEvent:percent="reset('percent', $event)"
    />
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    Game
  },
  data: function() {
    return {
      gameId: this.uuidv4(),
      difficulty: 12,
      percent: 50
    }
  },
  methods: {
    reset(setting, event) {
      if (event !== undefined) {
        setting === 'difficulty' ? this.difficulty = parseInt(this.validateDifficulty(event)) : this.percent = parseInt(this.validatePercent(event));
      }
      this.gameId = this.uuidv4();
      return this.gameId;
    },
    validatePercent(value) {
      return (value === "" || isNaN(value) || value < 0 || value > 100) ? 50 : value;
    },
    validateDifficulty(value) {
      return (value === "" || isNaN(value) || value < 2) ? 12 : value
    },
    // BEGIN https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    // END
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
