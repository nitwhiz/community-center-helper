<template>
	<div class="settings">
		<div class="option">
			<div class="name">Farm Map</div>
			<div class="control">
				<select
				 name="farmmap"
				 v-model="farmMap"
				 @change="farmMapChanged"
				>
					<option value="none">Default</option>
					<option value="forest_farm">Forest</option>
					<option value="riverlands_farm">Riverlands</option>
					<option value="wilderness_farm">Wilderness</option>
					<option value="hilltop_farm">Hill-Top</option>
				</select>
			</div>
		</div>
		<div class="option">
			<div class="name">Farm Cave</div>
			<div class="control">
				<select
				 name="farmcave"
				 v-model="farmCave"
				 @change="farmCaveChanged"
				>
					<option value="none">None</option>
					<option value="mushroom">Mushroom</option>
					<option value="fruit_bat">Fruit Bat</option>
				</select>
			</div>
		</div>
		<div class="option">
			<div class="name">Season</div>
			<div class="control">
				<select
				 name="season"
				 v-model="season"
				 @change="seasonChanged"
				>
					<option value="none">None</option>
					<option value="spring">Spring</option>
					<option value="summer">Summer</option>
					<option value="fall">Fall</option>
					<option value="winter">Winter</option>
				</select>
			</div>
		</div>
		<div class="option">
			<div class="name">Weather</div>
			<div class="control">
				<select
				 name="weather"
				 v-model="weather"
				 @change="weatherChanged"
				>
					<option value="none">None</option>
					<option value="sunny">Sunny</option>
					<option value="rainy">Rainy</option>
				</select>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Settings extends Vue {
	season = this.currentSeason;
	weather = this.currentWeather;
	farmCave = this.currentFarmCave;
	farmMap = this.currentFarmMap;

	get currentSeason() {
		//@ts-ignore
		return this.$store.state.settings.filters.filter(filter =>
			Boolean(filter.season)
		)[0].season;
	}

	get currentWeather() {
		//@ts-ignore
		return this.$store.state.settings.filters.filter(filter =>
			Boolean(filter.weather)
		)[0].weather;
	}

	get currentFarmCave() {
		//@ts-ignore
		return this.$store.state.settings.filters.filter(filter =>
			Boolean(filter.farmCave)
		)[0].farmCave;
	}

	get currentFarmMap() {
		//@ts-ignore
		return this.$store.state.settings.filters.filter(filter =>
			Boolean(filter.farmMap)
		)[0].farmMap;
	}

	seasonChanged() {
		this.$store.dispatch('setSeason', this.season);
	}

	weatherChanged() {
		this.$store.dispatch('setWeather', this.weather);
	}

	farmCaveChanged() {
		this.$store.dispatch('setFarmCave', this.farmCave);
	}

	farmMapChanged() {
		this.$store.dispatch('setFarmMap', this.farmMap);
	}
}
</script>

<style scoped>
.settings {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	padding: 0 24px 24px 24px;
}

.settings .option {
	width: 20%;
}

@media screen and (max-width: 850px) {
	.settings .option {
		width: 100%;
	}

	.settings .option .control input,
	.settings .option .control select {
		width: 100% !important;
		margin-bottom: 24px;
	}
}

.settings .option .name {
	font-weight: bold;
}

.settings .option .control input,
.settings .option .control select {
	width: 90%;

	font-size: 18px;
	padding: 8px;
	background: none;
	color: white;
	border: none;
	border-bottom: 2px solid rgba(255, 255, 255, 0.6);

	outline: none;
}

.settings .option .control select option {
	color: black;
}
</style>
