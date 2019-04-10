import Vue from 'vue';
import Vuex, { MutationTree, ActionTree } from 'vuex';
import VuexPersist from 'vuex-persist';

import Rooms from '@/assets/data/rooms.json';
import Bundles from '@/assets/data/bundles.json';
import Items from '@/assets/data/items.json';
import TravellingCart from '@/assets/data/travelling_cart.json';

const vuexPersist = new VuexPersist({
	key: 'sdv-cc-guide',
	storage: localStorage
});

Vue.use(Vuex);

const getAllAvailableOptions = () => {
	const available: string[] = [];

	for (const roomName in Rooms) {
		const dotPath = [];

		dotPath.push(roomName);

		for (const bundleName of Rooms[roomName as RoomIdentifier].bundles) {
			const bundle = Bundles[bundleName as BundleIdentifier] as IBundle;

			dotPath.push(bundleName);

			for (const bundleOption in bundle.options as IBundleOption[]) {
				dotPath.push(bundleOption);

				const option = bundle.options[bundleOption] as IBundleOption;

				if (option.type === 'item') {
					const item = Items[option.name] as IItem;

					if (item.availability) {
						for (const availabilityOption in item.availability) {
							dotPath.push(availabilityOption);

							available.push(dotPath.join('.'));

							dotPath.pop();
						}
					}
				}

				dotPath.pop();
			}

			dotPath.pop();
		}

		dotPath.pop();
	}

	return available;
};

const isFilteredBy = (state: RootState, prop: keyof StateFilterMap) => {
	return state.settings.filters.filter(filter => prop in filter).length > 0;
};

const getFilter = <K extends keyof StateFilterMap, T extends StateFilterMap[K]>(
	state: RootState,
	prop: keyof StateFilterMap
): T => {
	return state.settings.filters.filter(filter => prop in filter)[0] as T;
};

const removeFilter = (state: RootState, prop: keyof StateFilterMap) => {
	state.settings.filters = state.settings.filters.filter(
		filter => !(prop in filter)
	);
};

const addFilter = <K extends keyof StateFilterMap, T extends StateFilterMap[K]>(
	state: RootState,
	prop: K,
	value: T[keyof T]
) => {
	state.settings.filters.push(({
		[prop]: value
	} as unknown) as StateFilter);
};

const setFilter = <K extends keyof StateFilterMap, T extends StateFilterMap[K]>(
	state: RootState,
	prop: K,
	value: T[keyof T]
) => {
	if (!isFilteredBy(state, prop)) {
		addFilter(state, prop, value);
	} else {
		(getFilter(state, prop) as T)[prop as keyof T] = value;
	}
};

const keepAvailabilityOption = (entry: string, filter: StateFilter) => {
	const [
		,
		bundleName,
		bundleOptionIndex,
		optionAvailabilityIndex
	] = entry.split('.');

	const bundle = Bundles[bundleName as BundleIdentifier] as IBundle;
	const bundleOption = bundle.options[parseInt(bundleOptionIndex, 10)];

	if (bundleOption.type === 'money') {
		/**
		 * we got tha money
		 */
		return true;
	}

	const availabilityOptionItem = Items[bundleOption.name] as IItem;

	if (!availabilityOptionItem.availability) {
		/**
		 * nobody cares
		 */
		return true;
	}

	const availabilityOption =
		availabilityOptionItem.availability[
			parseInt(optionAvailabilityIndex, 10)
		];

	if ('season' in filter && filter.season !== 'none') {
		/**
		 * season filter
		 */

		if ('season' in availabilityOption) {
			return availabilityOption.season === filter.season;
		}

		return true;
	} else if ('weather' in filter && filter.weather !== 'none') {
		/**
		 * weather filter
		 */

		if ('weather' in availabilityOption) {
			return availabilityOption.weather === filter.weather;
		}

		return true;
	} else if ('farmCave' in filter && filter.farmCave !== 'none') {
		/**
		 * farmCave filter
		 */

		if (availabilityOption.type === 'farm_cave') {
			return availabilityOption.option === filter.farmCave;
		}

		return true;
	}

	return true;
};

export default new Vuex.Store<RootState>({
	plugins: [vuexPersist.plugin],
	state: {
		settings: {
			filters: [
				{ season: 'none' },
				{ weather: 'none' },
				{ farmCave: 'none' }
			],
			completedOptions: []
		},
		/**
		 * available item availabilities + items available
		 */
		available: []
	},
	mutations: {
		setSeason(state, season: MayBe<Season>) {
			setFilter(state, 'season', season);
		},
		setWeather(state, weather: MayBe<Weather>) {
			setFilter(state, 'weather', weather);
		},
		setFarmCave(state, farmCave: MayBe<FarmCaveOption>) {
			setFilter(state, 'farmCave', farmCave);
		},
		updateAvailable(state) {
			/**
			 * filters out availability of bundle-options
			 */

			state.available = getAllAvailableOptions().filter(entry => {
				/**
				 * if any filter fails, this availability is out
				 */
				return !state.settings.filters
					.map(filter => {
						return keepAvailabilityOption(entry, filter);
					})
					.includes(false);
			});
		},
		setOptionCompleted(state, optionDotPath: string) {
			if (state.settings.completedOptions.includes(optionDotPath)) {
				return;
			}

			state.settings.completedOptions.push(optionDotPath);
		},
		unsetOptionCompleted(state, optionDotPath: string) {
			if (!state.settings.completedOptions.includes(optionDotPath)) {
				return;
			}

			state.settings.completedOptions.splice(
				state.settings.completedOptions.indexOf(optionDotPath),
				1
			);
		},
		setAllAvailable(state) {
			state.available = getAllAvailableOptions();
		},
		reset(state) {
			setFilter(state, 'season', 'none');
			setFilter(state, 'weather', 'none');
			setFilter(state, 'farmCave', 'none');

			state.settings.completedOptions.length = 0;

			state.available = getAllAvailableOptions();

			window.location.reload();
		}
	},
	actions: {
		init({ commit }) {
			commit('setAllAvailable');
			commit('updateAvailable');
		},
		setSeason({ commit }, season: MayBe<Season>) {
			commit('setSeason', season);
			commit('updateAvailable');
		},
		setWeather({ commit }, weather: MayBe<Weather>) {
			commit('setWeather', weather);
			commit('updateAvailable');
		},
		setFarmCave({ commit }, farmCave: MayBe<FarmCaveOption>) {
			commit('setFarmCave', farmCave);
			commit('updateAvailable');
		},
		reset({ commit }) {
			commit('reset');
			// commit('updateAvailable');
		}
	}
});
