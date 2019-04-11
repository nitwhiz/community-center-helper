<template>
	<div :class="['room', roomDotPath]">
		<h1><span class="done">{{ isDone }}</span>&nbsp;{{ room.name }}</h1>
		<div class="reward">Reward: {{ room.reward }}</div>
		<div class="bundles">
			<Bundle
			 v-for="(bundleName) in room.bundles"
			 :key="bundleName"
			 :bundle="getBundle(bundleName)"
			 :bundleDotPath="`${roomDotPath}.${bundleName}`"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Bundle from '@/components/Bundle.vue';

import Bundles from '@/assets/data/bundles.json';

@Component({
	components: {
		Bundle
	}
})
export default class Room extends Vue {
	@Prop({ required: true }) roomDotPath!: string;
	@Prop({ required: true }) room!: IRoom;

	get bundleCount() {
		return this.room.bundles.length;
	}

	get bundlesDone() {
		return (this.$store.state.settings.completedOptions as string[]).filter(
			option => Boolean(option.match(new RegExp(this.roomDotPath)))
		).length;
	}

	get isDone() {
		return this.bundlesDone >= this.bundleCount ? '✔️' : '❌';
	}

	getBundle(identifier: BundleIdentifier) {
		return Bundles[identifier];
	}
}
</script>

<style scoped>
.room {
	padding: 12px;
	overflow: hidden;
	background-color: #f1f1f1;
	border: 1px solid #dfdfdf;
	border-bottom: 3px solid #dfdfdf;
	border-radius: 8px;
}

.room h1 {
	text-align: center;
}

.room h1 span.done {
	line-height: 20px;
}

.room.bulletin {
	background-color: #b66a27;
}

.room.fishtank {
	background-color: #3d87db;
}

.room.boiler {
	background-color: #925966;
}

.room.pantry {
	background-color: #cd985c;
}

.room.vault {
	background-color: #a08f96;
}

.room.crafts {
	background-color: #d3d1fc;
}

.room .reward {
	font-weight: bold;
	text-align: center;

	margin-bottom: 24px;
}

.room .bundles {
	display: grid;
}
</style>
