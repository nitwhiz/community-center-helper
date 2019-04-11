import Rooms from '@/assets/data/rooms.json';
import Bundles from '@/assets/data/bundles.json';
import Items from '@/assets/data/items.json';
import TravellingCart from '@/assets/data/travelling_cart.json';

declare global {
	type RoomIdentifier = keyof typeof Rooms;
	type BundleIdentifier = keyof typeof Bundles;
	type ItemIdentifier = keyof typeof Items;

	type IRoom = {
		name: string;
		reward: string;
		bundles: BundleIdentifier[];
	};

	type IRooms = { [K in RoomIdentifier]: IRoom };

	type Season = 'spring' | 'summer' | 'fall' | 'winter';

	type MineLevel = [number, number?];
	type Time = [number, number];

	type FarmCaveOption = 'fruit_bat' | 'mushroom';
	type TappingTree = 'mushroom' | 'maple' | 'oak' | 'pine';

	type Where =
		| 'pierre_flower_dance'
		| 'marnie'
		| 'mines'
		| 'skull_cavern'
		| 'rivers'
		| 'secret_woods'
		| 'mountain_lake'
		| 'cindersap_forest'
		| 'sewer'
		| 'ocean'
		| 'lakes'
		| 'forest_pond'
		| 'desert';

	type Which =
		| 'forest_farm'
		| 'riverlands_farm'
		| 'wilderness_farm'
		| 'cow'
		| 'chicken'
		| 'goat'
		| 'sheep'
		| 'rabbit'
		| 'duck'
		| 'pig'
		| 'apple'
		| 'apricot'
		| 'orange'
		| 'peach'
		| 'pomegranate'
		| 'cherry'
		| 'oil_maker'
		| 'loom'
		| 'recycler'
		| 'cheese_press'
		| 'bee_house'
		| 'preserves_jar'
		| 'furnace'
		| 'keg'
		| 'transmute_fe'
		| 'transmute_au';

	type From =
		| 'copper_bar'
		| 'iron_bar'
		| 'truffle'
		| 'soggy_newspaper'
		| 'copper_ore'
		| 'iron_ore'
		| 'gold_ore';

	type Weather = 'rainy' | 'sunny';

	type AvailabilityType =
		| 'foraging'
		| 'shop'
		| 'farming'
		| 'farm_cave'
		| 'tapping'
		| 'tilling_soil'
		| 'tilling_artifact'
		| 'drop'
		| 'chopping'
		| 'pickaxe'
		| 'chopping_large'
		| 'crates'
		| 'boxes'
		| 'map'
		| 'mines'
		| 'crops'
		| 'animal'
		| 'machine'
		| 'tree'
		| 'fishing'
		| 'crab_pot'
		| 'crafting'
		| 'geode'
		| 'omni_geode'
		| 'frozen_geode'
		| 'magma_geode'
		| 'cooking'
		| 'aquamarine_nodes'
		| 'fishing_treasure'
		| 'harvest';

	type Monster =
		| 'blue_slime'
		| 'dust_sprite'
		| 'rock_crab'
		| 'lava_crab'
		| 'ghost'
		| 'duggy'
		| 'slime'
		| 'bat'
		| 'squid_kids'
		| 'metal_heads'
		| 'mummy'
		| 'shadow_brute'
		| 'serpent';

	type DropChance = string;

	type IAvailability = {
		type: AvailabilityType;
		where?: Where;
		which?: Which;
		from?: From;
		season?: Season;
		level?: MineLevel;
		option?: FarmCaveOption;
		tree?: TappingTree;
		monster?: Monster;
		chance?: [string];
		weather?: Weather;
		time?: Time;
	};

	type IItems = { [K in ItemIdentifier]: IItem };

	type IItem = {
		name: string;
		availability?: IAvailability[];
	};

	type IBundleOptionItem = {
		type: 'item';
		name: ItemIdentifier;
		amount?: number;
		quality?: string;
	};

	type IBundleOptionMoney = {
		type: 'money';
		amount: number;
	};

	type IBundleOption = IBundleOptionItem | IBundleOptionMoney;

	type IBundleReward = {
		item: ItemIdentifier;
		amount: number;
	};

	type IBundles = { [K in BundleIdentifier]: IBundle };

	type IBundle = {
		name: string;
		options: IBundleOption[];
		slots: number;
		reward: IBundleReward;
	};

	type TravellingCartEntry = {
		item: string;
		quality?: string;
	};

	type TravellingCart = TravellingCartEntry[];

	type MayBe<T> = T | 'none';

	type FilterSeason = {
		season: MayBe<Season>;
	};

	type FilterWeather = {
		weather: MayBe<Weather>;
	};

	type FilterFarmCave = {
		farmCave: MayBe<FarmCaveOption>;
	};

	type FarmMapOption =
		| 'none'
		| 'forest_farm'
		| 'riverlands_farm'
		| 'wilderness_farm'
		| 'hilltop_farm';

	type FilterFarmMap = {
		farmMap: FarmMapOption;
	};

	type StateFilter =
		| FilterSeason
		| FilterWeather
		| FilterFarmCave
		| FilterFarmMap;

	type StateFilterMap = {
		season: FilterSeason;
		weather: FilterWeather;
		farmCave: FilterFarmCave;
		farmMap: FilterFarmMap;
	};

	type RootState = {
		settings: {
			filters: StateFilter[];
			completedOptions: string[];
		};
		available: string[];
	};
}
