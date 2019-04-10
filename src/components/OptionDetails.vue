<template>
	<div class="details">
		<template v-if="item !== null">
			<div
			 class="availability-entry travelling-cart"
			 v-if="travellingCartAvailability"
			>
				<b>&bullet;&nbsp;Available From Travelling Cart</b>
			</div>
			<div
			 v-for="(availabilityEntry, i) in item.availability"
			 :key="i"
			 :class="['availability-entry', isVisible(i) ? '' : 'hidden']"
			>
				<div class="type">
					&bullet;&nbsp;{{ getAvailabilityTypeName(availabilityEntry) }}
				</div>
				<div class="info">
					<div
					 class="info-entry"
					 v-for="(infoEntry, entryIndex) in getAvailabilityEntryInfoEntries(availabilityEntry)"
					 :key="entryIndex"
					>
						{{ getEntryText(infoEntry) }}
					</div>
				</div>
			</div>
		</template>
		<div v-else></div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Items from '@/assets/data/items.json';

import AvailabilityOptionsProsa from '@/assets/data/prosa/availability_options.json';
import AvailabilityTypesProsa from '@/assets/data/prosa/availability_types.json';
import FarmCaveTypesProsa from '@/assets/data/prosa/farm_cave_types.json';
import FromTypesProsa from '@/assets/data/prosa/from_types.json';
import MonsterTypesProsa from '@/assets/data/prosa/monster_types.json';
import SeasonTypesProsa from '@/assets/data/prosa/season_types.json';
import TreeTypesProsa from '@/assets/data/prosa/tree_types.json';
import WeatherTypesProsa from '@/assets/data/prosa/weather_types.json';
import WhereTypesProsa from '@/assets/data/prosa/where_types.json';
import WhichTypesProsa from '@/assets/data/prosa/which_types.json';

import TravellingCart from '@/assets/data/travelling_cart.json';

@Component
export default class OptionDetails extends Vue {
	@Prop({ required: true }) option!: IBundleOption;
	@Prop({ required: true }) optionDotPath!: string;

	isVisible(index: number) {
		return this.$store.state.available.includes(
			`${this.optionDotPath}.${index}`
		);
	}

	get item(): IItem | null {
		if (this.option.type === 'item') {
			return Items[this.option.name] as IItem;
		} else if (this.option.type === 'money') {
			return null;
		} else {
			throw new Error(`${this.option} ain't no option!`);
		}
	}

	get travellingCartAvailability() {
		if (this.option.type === 'item') {
			return (
				TravellingCart.filter(
					entry =>
						entry.item === (this.option as IBundleOptionItem).name
				).length > 0
			);
		}

		return false;
	}

	getAvailabilityEntryInfoEntries(availabilityEntry: IAvailability) {
		const result = [];

		for (const entry of Object.entries(availabilityEntry)) {
			if (entry[0] !== 'type') {
				result.push(entry);
			}
		}

		return result;
	}

	getEntryText(infoEntry: [string, any]) {
		const entryMap = {
			where: WhereTypesProsa,
			which: WhichTypesProsa,
			from: FromTypesProsa,
			season: SeasonTypesProsa,
			option: FarmCaveTypesProsa,
			tree: TreeTypesProsa,
			monster: MonsterTypesProsa,
			weather: WeatherTypesProsa
		};

		let lead = this.getAvailabilityOptionName(infoEntry[0]);
		let value = infoEntry[1];

		switch (infoEntry[0] as keyof IAvailability) {
			case 'where':
			case 'which':
			case 'from':
			case 'season':
			case 'option':
			case 'tree':
			case 'monster':
			case 'weather':
				//@ts-ignore
				value = entryMap[infoEntry[0]][infoEntry[1]];
				break;
			case 'level':
				value = (infoEntry[1] as MineLevel).join(' - ');
				break;
			case 'time':
				value = (infoEntry[1] as Time)
					.map(num => `${num}⁰⁰`)
					.join(' - ');
				break;
			case 'chance':
			default:
				break;
		}

		return `${lead}: ${value}`;
	}

	getAvailabilityTypeName(availabilityEntry: IAvailability) {
		return AvailabilityTypesProsa[availabilityEntry.type] || 'Unknown';
	}

	getAvailabilityOptionName(optionName: string) {
		return (AvailabilityOptionsProsa as any)[optionName] || 'Unknown';
	}

	getMonsterTypeName(monsterName: Monster) {
		return MonsterTypesProsa[monsterName] || 'Unknown';
	}
}
</script>

<style scoped>
.availability-entry {
	padding-bottom: 4px;
}

.availability-entry.travelling-cart {
	padding-bottom: 8px;
}

.availability-entry .type {
	font-weight: bold;
}

.availability-entry .info {
	padding: 4px 18px;
	font-size: 14px;
	line-height: 20px;
}

.availability-entry.hidden {
	opacity: 0.4;
}
</style>
