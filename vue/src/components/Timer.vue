<template>
    <div id="timer">
        <div id="clock">
          
          <span class="time">{{ time }}</span>
          
          <div v-if="showTimerControls" class="btn-container">
            <a id="start" @click="start">Start</a>
            <a id="stop" @click="stop">Stop</a>
            <a id="reset" @click="reset">Reset</a>
          </div>
          
          
          <div class="text">
            <a href="https://june07.com" target="_blank">@june07</a>
          </div>
      </div>
    </div>
</template>
<style scoped>
  $color: rgb(200, 200, 200);
  $color-light: white;

  @import url('https://fonts.googleapis.com/css?family=Share+Tech+Mono');

  #timer {
    background-color: rgb(10, 10, 10);

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: stretch;
    align-items: center;
  }
  #clock {
    font-family: 'Share Tech Mono', sans-serif;
    order: 0;
    flex: 0 1 auto;
    align-self: center;

    color: $color;
    //text-shadow: 0px 0px 25px $color;
  }
  .time {
    font-size: xx-large !important;
  }
  .text {
    margin-top: 30px;
    font-size: 1em;
    color: rgba($color, .15);
    text-align: center;
  }
  .text a {
    text-decoration: none;
    color: inherit;

    transition: color .1s ease-out;

    &:hover {
      color: $color;
    }
  }
  .btn-container {
    display: flex;
    margin-top: 15px;
  }
  .btn-container a {
    text-align: center;
    font-family: 'Share Tech Mono', sans-serif;
    background: transparent;
    //border: 3px solid $color;
    border: none;
    color: $color;
    padding: 10px 15px;
    text-transform: uppercase;
    font-size: 20px;
    cursor: pointer;
    //text-shadow: 0px 0px 10px $color;

    flex-grow: 1;

    transition: color .1s ease-out;

    &:hover {
      color: $color-light;
    }
  }
</style>
<script>
    export default {
        name: 'timer',
        data: function() {
            return {
              showTimerControls: false,
              time: '00:00:00.000',
              timeBegan: null,
              timeStopped: null,
              stoppedDuration: 0,
              started:  null,
              running: false
            }
        },
        methods: {
            start() {
              if(this.running) return;
              
              if (this.timeBegan === null) {
                this.reset();
                this.timeBegan = new Date();
              }

              if (this.timeStopped !== null) {
                this.stoppedDuration += (new Date() - this.timeStopped);
              }

              this.started = setInterval(this.clockRunning, 10);  
              this.running = true;
            },
            stop() {
              this.running = false;
              this.timeStopped = new Date();
              clearInterval(this.started);
            },
            reset() {
              this.running = false;
              clearInterval(this.started);
              this.stoppedDuration = 0;
              this.timeBegan = null;
              this.timeStopped = null;
              this.time = "00:00:00.000";
            },
            clockRunning(){
              var currentTime = new Date()
              , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
              , hour = timeElapsed.getUTCHours()
              , min = timeElapsed.getUTCMinutes()
              , sec = timeElapsed.getUTCSeconds()
              , ms = timeElapsed.getUTCMilliseconds();

              this.time = 
                this.zeroPrefix(hour, 2) + ":" + 
                this.zeroPrefix(min, 2) + ":" + 
                this.zeroPrefix(sec, 2) + "." + 
                this.zeroPrefix(ms, 3);
            },
            zeroPrefix(num, digit) {
              var zero = '';
              for(var i = 0; i < digit; i++) {
                zero += '0';
              }
              return (zero + num).slice(-digit);
            }
        }
    }
</script>