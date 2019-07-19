<template>
  <div align="center">
    <div id="controlbar">
      <input type="button" id="resetButton" value="Reset" @click="$emit('resetButtonEvent')">
      <input type="checkbox" id="showCheckbox" v-model="mutableShow">
      <label for="showCheckbox">Show Mines</label>
    </div>
    <table class="game">
      <tbody v-bind:class="{ lose: exploded }">
        <tr v-for="row in initializedGameBoard" :key="row.id">
          <td v-for="cell in row" :key="cell.id">
            <div v-if="mutableShow">
              <span class="secret">{{ cell.value }}</span>
            </div>
            <Cell
              :mine="cell.value"
              :index="cell.index"
              :adjacents="cell.adjacents"
              @click.native="clickHandler"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
  table {
    border-spacing: 0px;
  }
  div#controlbar {
    padding-bottom: 10px;
  }
  tbody.lose {
    background: red;
  }
  td {
    border: 0px solid black;
    margin: 0px;
    padding: 0px;
    width: 25px;
    height: 25px;
  }
  span.secret {
    position: absolute; 
    font-size: x-small;
    color: lightgray;
  }
</style>
<script>
  import Vue from 'vue'
  import Cell from './Cell.vue'

  let CellClass = Vue.extend(Cell);

  export default {
    name: 'gameboard',
    components: {
      Cell
    },
    props: {
      width: Number,
      percent: Number,
      show: Boolean
    },
    data: function () {
      return {
        spaces: this.width*this.width,
        numberOfBombsToPlace: Math.floor((this.width*this.width)*(this.percent/100)),
        mutableShow: this.show,
        exploded: false
      }
    },
    computed: {
      initializedGameBoard: function() {
        return this.arrangeIntoRowsCols(this.randomlyMixBombs(this.numberOfBombsToPlace, this.spaces));
      }
    },
    methods: {
      randomlyMixBombs(bombCount, spaces) {
        let board = new Array(bombCount).fill('o');
        for(let length = board.length; board.length < spaces; length++) {
          let randomPosition = length - Math.floor(Math.random() * length);
          board.splice(randomPosition, 0, 'x');
        }
        return this.calculateAdjacencies(board);
      },
      calculateAdjacencies(board) {
        let width = Math.sqrt(board.length);
        let positionOffsets = {
          left: -1,
          lefttop: -(width+1),
          top: -width,
          righttop: -(width-1),
          right: 1,
          rightbottom: width+1,
          bottom: width,
          leftbottom: width-1
        }
        board = board.flatMap((cell, index, cells) => {
          let adjacents = 0;
          Object.values(positionOffsets).map((offset, i) => {
            let position = index + offset;
            if (position >= 0 && position < board.length && cells[position] === 'o') {
              adjacents++;
            }
            if (i === 7) return adjacents;
          });
          return {
            value: cell,
            adjacents
          };
        });
        return board;
      },
      arrangeIntoRowsCols(board) {
        let width = Math.sqrt(board.length),
          board2 = new Array(width).fill().map(() => new Array(width).fill());
        for(let index = 0, row = 0, col = 0; index < board.length; index++) {
          board2[row][col] = Object.assign(board[index], { index });
          if ((index+1)%width === 0) {
            row++;
            col = 0;
          } else {
            col++;
          }
        }
        return board2;
      },
      getCellByIndex(index) {
        let cells = Array.from(document.querySelectorAll('div.cell')).map(e => e.__vue__);
        let cell = cells.find(cell => cell.index === index);
        return cell;
      },
      clickHandler(event) {
        let cell = event.target;
        this.reveal(cell.__vue__);
      },
      explodeAllMines() {
        Array.from(document.querySelectorAll('div.cell')).map(e => e.__vue__.explode());
      },
      reveal(cell) {  
        if (! cell.reveal()) {
          this.explodeAllMines();
          this.mutableShow = true;
          console.log('You lose.');
        } else {
          // Uncover adjacent mines 
        }
      }
    }
  };
</script>