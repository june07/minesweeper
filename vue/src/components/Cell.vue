<template>
    <div class="cell" v-bind:class="[grassClass, explodedClass, dirtClass, delayClass]">
        <div class="adjacentValue" v-if="showing">
            {{ adjacents.length }}
        </div>
        <div class="flag" v-if="hasFlag">
            <v-icon color="#B71C1C">mdi-flag-triangle</v-icon>
        </div>
    </div>
</template>
<style>
    .flag {
        position: relative;
        left: 0;
        top: 0;
        pointer-events: none;
    }
  div.adjacentValue {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  div.cell {
    display: table;
    width: 30px;
    height: 30px;
  }
  div.lightgrass {
    background: #A6D785;
  }
  div.darkgrass {
    background: #BCED91;
  }
  div.dirt {
    background: #c2b280;
  }
  div.exploded {
    background: red;
  }
  .animation-delay-0 {
    animation-delay: 100ms !important;
  }
  .animation-delay-1 {
    animation-delay: 200ms !important;
  }
  .animation-delay-2 {
    animation-delay: 300ms !important;
  }
  .animation-delay-3 {
    animation-delay: 400ms !important;
  }
  .animation-delay-4 {
    animation-delay: 500ms !important;
  }
  .animation-delay-5 {
    animation-delay: 600ms !important;
  }
  .animation-delay-6 {
    animation-delay: 700ms !important;
  }
  .animation-delay-7 {
    animation-delay: 800ms !important;
  }
  .animation-delay-8 {
    animation-delay: 900ms !important;
  }
  .animation-delay-9 {
    animation-delay: 1000ms !important;
  }
  .jello-horizontal {
    -webkit-animation: jello-horizontal 0.9s both;
            animation: jello-horizontal 0.9s both;
}
/* ----------------------------------------------
 * Generated by Animista on 2019-7-26 10:41:45
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation jello-horizontal
 * ----------------------------------------
 */
@-webkit-keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}
@keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}
.puff-out-center {
    -webkit-animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
            animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2019-7-26 11:32:48
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation puff-out-center
 * ----------------------------------------
 */
@-webkit-keyframes puff-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(2px);
            filter: blur(2px);
    opacity: 0;
  }
}
@keyframes puff-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(2px);
            filter: blur(2px);
    opacity: 0;
  }
}

</style>
<script>
    export default {
        name: 'cell',
        props: {
            width: Number,
            row: Number,
            mine: String,
            index: Number,
            adjacents: Array,
            adjacentCellIndexes: Array
        },
        data: function() {
            return {
                showing: false,
                exploded: false,
                hasFlag: false
            }
        },
        computed: {
            grassClass: function() {
                return this.row%2 || Math.pow(this.width, 2)%2 ? (this.index%2 ? 'lightgrass' : 'darkgrass') :
                    (this.index%2 ? 'darkgrass' : 'lightgrass');
            },
            explodedClass: function() {
                return this.exploded ? 'puff-out-center exploded' : '';
            },
            dirtClass: function() {
                return this.showing ? 'jello-horizontal dirt' : '';
            },
            delayClass() {
                return 'animation-delay-' + Math.ceil(10 - Math.random() * 10);
            }
        },
        methods: {
            reveal() {
                this.hasFlag = false;
                this.showing = true;
            },
            explode() {
                if (this.mine === 'o') {
                    this.exploded = true;
                }
            },
            toggleFlag() {
                this.hasFlag = !this.hasFlag;
            }
        }
    }
</script>