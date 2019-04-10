<template>
	<div id="app">
		<header>
			<h1>Stardew Valley Community Center Helper</h1>
			<div class="subtitle">made by <a href="https://nitwhiz.xyz/">nitwhiz</a>, images from the <a href="https://stardewvalleywiki.com/">official wiki</a></div>
			<Settings />
		</header>
		<main>
			<div class="rooms">
				<Room
				 v-for="(room, roomName) in allRooms"
				 :key="roomName"
				 :room="room"
				 :roomDotPath="roomName"
				/>
			</div>
			<div class="reset">
				<button @click="$store.dispatch('reset')">Reset Everything</button>
			</div>
		</main>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Room from '@/components/Room.vue';
import Settings from '@/components/Settings.vue';

import Rooms from '@/assets/data/rooms.json';
import TravellingCart from '@/assets/data/travelling_cart.json';

@Component({
	components: {
		Settings,
		Room
	}
})
export default class App extends Vue {
	mounted() {
		this.$store.commit('setAllAvailable');

		// this.$store.commit('setSeason', 'summer');
	}

	get allRooms() {
		return Rooms;
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Salsa|Overlock:400,700');

* {
	box-sizing: border-box;
}

html,
body {
	margin: 0;
	padding: 0;
}

body {
	background-color: #f1f1f1;
	font-family: 'Overlock', sans-serif;
}

header {
	background-color: #008465;
	color: white;
	overflow: hidden;
}

header h1 {
	padding: 24px 24px 0 24px;
	margin: 0;
	font-family: 'Salsa', sans-serif;
	font-weight: normal;
}

header .subtitle {
	padding: 0 0 24px 24px;
}

header .subtitle a {
	color: white;
	font-size: 20px;
}

.reset {
	display: flex;
	justify-content: flex-end;
}

.reset button {
	margin: 12px;

	background: none;
	border: 1px solid rgba(255, 255, 255, 0.25);
	outline: none;
	color: black;
	border-radius: 4px;
	padding: 8px;
	font-size: 16px;

	cursor: pointer;
	background-color: #ccc;
}

.rooms {
	overflow: hidden;

	margin: 12px;

	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-row-gap: 12px;
	grid-column-gap: 12px;
}

@media screen and (max-width: 1600px) {
	.rooms {
		grid-template-columns: repeat(5, 1fr);
	}
}

@media screen and (max-width: 1550px) {
	.rooms {
		grid-template-columns: repeat(4, 1fr);
	}
}

@media screen and (max-width: 1280px) {
	.rooms {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media screen and (max-width: 970px) {
	.rooms {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media screen and (max-width: 650px) {
	.rooms {
		grid-template-columns: 1fr;
	}
}
</style>
