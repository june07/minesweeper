<template>
	<div class="cell" v-bind:class="[grassClass, explodedClass]">
		<div v-if="showing">
			{{ adjacents }}
		</div>
	</div>
</template>
<style>
  div.cell {
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
			adjacents: Number
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
				if (this.mine === 'o') {
					return false;
				} else {
					this.showing = !this.showing;
					return true;
				}
			},
			explode() {
				if (this.mine === 'o') {
					this.exploded = true;
				}
			}
		}
	}
</script>