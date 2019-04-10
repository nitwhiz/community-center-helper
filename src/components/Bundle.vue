<template>
	<div class="bundle">
		<h2 @click="closed = !closed"><span class="done">{{ isDone }}</span>&nbsp;{{ bundle.name }}&nbsp;<span>({{ slotsFilled }}/{{ slotsAvailable }})</span></h2>
		<div
		 class="image-wrapper"
		 v-if="!closed"
		>
			<img
			 :src="bundleImage"
			 :alt="bundle.name"
			>
		</div>
		<div
		 v-if="!closed"
		 class="reward"
		>
			<div class="bullet">Reward:</div>
			<div class="image">
				<img
				 :src="rewardImage"
				 alt="reward"
				>
			</div>
			<div class="type">
				{{ bundle.reward.amount }}&times;&nbsp;{{ rewardItemName }}
			</div>
		</div>
		<div
		 v-if="!closed"
		 class="options"
		>
			<Option
			 v-for="(option, optionIndex) in bundle.options"
			 :key="optionIndex"
			 :option="option"
			 :optionDotPath="`${bundleDotPath}.${optionIndex}`"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Option from '@/components/Option.vue';

import Items from '@/assets/data/items.json';

@Component({
	components: {
		Option
	}
})
export default class Bundle extends Vue {
	@Prop({ required: true }) bundleDotPath!: string;
	@Prop({ required: true }) bundle!: IBundle;

	closed = false;

	get bundleImage() {
		console.log(this.bundleDotPath);

		return require(`@/assets/img/${this.bundleDotPath
			.split('.')
			.pop()}_bundle.png`);
	}

	get isDone() {
		return this.slotsFilled >= this.slotsAvailable ? '✔️' : '❌';
	}

	get slotsFilled() {
		return Math.min(
			(this.$store.state.settings.completedOptions as string[]).filter(
				option => Boolean(option.match(new RegExp(this.bundleDotPath)))
			).length,
			this.slotsAvailable
		);
	}

	get slotsAvailable() {
		return this.bundle.slots;
	}

	get rewardItemName() {
		return Items[this.bundle.reward.item].name;
	}

	get rewardImage() {
		return require(`@/assets/img/${this.bundle.reward.item}.png`);
	}
}
</script>

<style scoped>
.bundle {
	margin: 8px;
	padding: 8px;
	background-color: rgba(255, 255, 255, 0.5);
	border-top: 2px solid rgba(223, 223, 223, 0.5);
	border-radius: 6px;
}

.bundle .image-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 12px;
}

.bundle .image-wrapper img {
	display: block;
}

.bundle h2 {
	text-align: center;
	cursor: pointer;
}

.bundle h2 span.done {
	line-height: 20px;
}

.bundle .options {
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 8px;
}

.bundle .reward {
	display: flex;
	flex-direction: row;
	margin-bottom: 12px;
}

.bundle .reward > div {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px 3px;
}

.bundle .reward .bullet {
	font-weight: bold;
}
</style>
