<template>
	<div class="cell" v-bind:class="[grassClass, explodedClass]">
		<div class="adjacentValue" v-if="showing">
			{{ adjacents.length }}
		</div>
	</div>
</template>
<style>
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
  div.exploded {
  	background: red;
  }
</style>
<script>
	export default {
		name: 'cell',
		props: {
			mine: String,
			index: Number,
			adjacents: Array,
			adjacentCellIndexes: Array
		},
		data: function() {
			return {
				showing: false,
				exploded: false
			}
		},
		computed: {
			grassClass: function() {
				return this.index%2 ? 'lightgrass' : 'darkgrass';
			},
			explodedClass: function() {
				return this.exploded ? 'exploded' : '';
			}
		},
		methods: {
			reveal() {
				this.showing = true;
			},
			explode() {
				if (this.mine === 'o') {
					this.exploded = true;
				}
			}
		}
	}
</script>