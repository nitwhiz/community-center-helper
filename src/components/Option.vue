<template>
	<div :class="['option', isVisible ? '' : 'hidden']">
		<div class="head">
			<div class="checkbox">
				<input
				 type="checkbox"
				 v-model="completed"
				 @change="checkChange"
				>
			</div>
			<div
			 class="amount"
			 v-if="isItem"
			>
				{{ itemAmount }}&times;
			</div>
			<div class="image">
				<img
				 :src="image"
				 :alt="imageAlt"
				>
			</div>
			<div class="name">
				<div v-if="isItem">
					{{ itemName }}
				</div>
				<div v-if="isMoney">
					{{ option.amount }}g
				</div>
			</div>
		</div>
		<OptionDetails
		 :option="option"
		 :optionDotPath="optionDotPath"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import OptionDetails from '@/components/OptionDetails.vue';

import Items from '@/assets/data/items.json';

@Component({
	components: {
		OptionDetails
	}
})
export default class Option extends Vue {
	@Prop({ required: true }) optionDotPath!: string;
	@Prop({ required: true }) option!: IBundleOption;

	completed = false;

	created() {
		this.completed = this.$store.state.settings.completedOptions.includes(
			this.optionDotPath
		);
	}

	checkChange() {
		if (this.completed) {
			this.$store.commit('setOptionCompleted', this.optionDotPath);
		} else {
			this.$store.commit('unsetOptionCompleted', this.optionDotPath);
		}
	}

	get isVisible() {
		return !this.$store.state.settings.completedOptions.includes(
			this.optionDotPath
		);
	}

	get isItem() {
		return this.option.type === 'item';
	}

	get isMoney() {
		return this.option.type === 'money';
	}

	get itemName() {
		if (this.option.type === 'item') {
			return Items[this.option.name].name;
		} else {
			return 'unknown';
		}
	}

	get itemAmount() {
		if (this.option.type === 'item') {
			return this.option.amount || 1;
		} else {
			return '0';
		}
	}

	get image() {
		if (this.option.type === 'item') {
			return require(`@/assets/img/${this.option.name}.png`);
		} else if (this.option.type === 'money') {
			return require(`@/assets/img/gold.png`);
		}
	}

	get imageAlt() {
		return this.option.type;
	}
}
</script>

<style scoped>
.head {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 0 8px 0;
}

.head > div {
	margin-right: 4px;
	display: flex;
	align-items: center;
}

.option.hidden {
	opacity: 0.4;
}

.option {
	padding: 12px;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 6px;
	border-bottom: 2px solid rgba(0, 0, 0, 0.15);
}
</style>
