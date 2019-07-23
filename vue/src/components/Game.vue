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
        exploded: false,
        regions: null
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
      getRegionIndexes(region, width) {
        switch (region) {
          case 'top':
            return new Array(width-2).fill().map((e, i) => {
              return i+1;
            }); break;
          case 'right':
            return new Array(width-2).fill().map((e, i) => {
              return width*(i+2)-1;
            }); break;
          case 'left':
            return new Array(width-2).fill().map((e, i) => {
              return width*(i+1);
            }); break;
          case 'bottom':
            return new Array(width-2).fill().map((e, i) => {
              return width*width-(width-i-1);
            }); break;
          case 'topleftcorner': return 0; break;
          case 'toprightcorner': return width-1; break;
          case 'bottomleftcorner': return width*width-(width); break;
          case 'bottomrightcorner': return width*width-1; break;
        }
      },
      calculateAdjacencies(board) {
        let self = this;
        function getPositionOffsetsForCell(cellIndex) {
          if (self.regions.innerCells.find(cell => cell === cellIndex)) {
            return positionOffsets;
          } else {
            let region = Object.entries(self.regions).filter(region => !region[0].match(/(outerCells|innerCells)/)).find(region => {
              let regionCells = (region[1].cells instanceof Array) ? region[1].cells : [ region[1].cells ];
              if (regionCells.find(cell => cell === cellIndex) !== undefined) return true;
            });
            return region[1].offsets;
          }
        }
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
        this.regions = {
          top: {
            cells: this.getRegionIndexes('top', width),
            offsets: Object.fromEntries(Object.entries(positionOffsets).filter(e => !e[0].match(/(lefttop|top|righttop)/)))
          },
          right: {
            cells: this.getRegionIndexes('right', width),
            offsets: Object.fromEntries(Object.entries(positionOffsets).filter(e => !e[0].match(/(right|righttop|rightbottom)/)))
          },
          bottom: {
            cells: this.getRegionIndexes('bottom', width),
            offsets: Object.fromEntries(Object.entries(positionOffsets).filter(e => !e[0].match(/(rightbottom|bottom|leftbottom)/)))
          },
          left: {
            cells: this.getRegionIndexes('left', width),
            offsets: Object.fromEntries(Object.entries(positionOffsets).filter(e => !e[0].match(/(left|lefttop|leftbottom)/)))
          },
          topleftcorner: {
            cells: this.getRegionIndexes('topleftcorner', width),
            offsets: Object.fromEntries(Object.entries(positionOffsets).filter(e => !e[0].match(/(leftbottom|left|lefttop|top|righttop)/)))
          },
          toprightcorner: {
            cells: this.getRegionIndexes('toprightcorner', width),
            offsets: Object.fromEntries(Object.entries(positionOffsets).filter(e => !e[0].match(/(lefttop|top|righttop|right|rightbottom)/)))
          },
          bottomleftcorner: {
            cells: this.getRegionIndexes('bottomleftcorner', width),
            offsets: Object.fromEntries(Object.entries(positionOffsets).filter(e => !e[0].match(/(lefttop|left|leftbottom|bottom|rightbottom)/)))
          },
          bottomrightcorner: {
            cells: this.getRegionIndexes('bottomrightcorner', width),
            offsets: Object.fromEntries(Object.entries(positionOffsets).filter(e => !e[0].match(/(leftbottom|bottom|rightbottom|right|righttop)/)))
          }
        }
        //let board = new Array(this.width*this.width).fill();
        this.regions.outerCells = Object.values(this.regions).map(r => r.cells).flatMap(cell => cell).sort((a,b) => a-b);
        this.regions.innerCells = board.map((cell, i) => this.regions.outerCells.find(i2 => i === i2) ? 0 : i).filter(cell => cell !== 0)
        // Need to do this for each of the regions.  Thus I need to calculate the center region.
        board = board.flatMap((cell, index, cells) => {
          let adjacents = [],
            positionOffsetsForCell = getPositionOffsetsForCell(index);

          Object.entries(positionOffsetsForCell).map((offset, i, offsets) => {
            let position = index + parseInt(offset[1]);
            if (cells[position] === 'o') {
              adjacents.push(offset);
            }
            if (i === offsets.length-1) return adjacents;
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