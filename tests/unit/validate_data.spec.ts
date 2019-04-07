import rooms from '@/assets/data/rooms.json';
import bundles from '@/assets/data/bundles.json';
import items from '@/assets/data/items.json';
import travellingCart from '@/assets/data/travelling_cart.json';

import fs from 'fs-extra';
import path from 'path';
import { expect } from 'chai';

/*const discoAvailProps = {};

for (const item of Object.values(items)) {
	if (item.availability) {
		for (const option of item.availability) {
			let type = '';

			for (const prop of Object.entries(option)) {
				if (prop[0] === 'type') {
					type = prop[1];

					if (discoAvailProps[type] === undefined) {
						discoAvailProps[type] = {};
					}
				} else {
					if (discoAvailProps[type][prop[0]] === undefined) {
						discoAvailProps[type][prop[0]] = [];
					}

					if (!discoAvailProps[type][prop[0]].includes(prop[1])) {
						discoAvailProps[type][prop[0]].push(prop[1]);
					}
				}
			}
		}
	}
}

console.log('availability properties:', discoAvailProps);*/

describe('items', () => {
	it('all have names', () => {
		for (const item of Object.values(items)) {
			expect(item).to.have.property('name');
		}
	});

	it('all have icons', () => {
		for (const item of Object.keys(items)) {
			const iconPath = `./src/assets/img/${item}.png`;

			expect(fs.existsSync(iconPath), iconPath).to.be.true;
		}
	});
});

describe('bundles', () => {
	it('all have correct scheme', () => {
		for (const bundle of Object.values(bundles)) {
			expect(bundle).to.have.property('name');
			expect(bundle).to.have.property('reward');
			expect(bundle)
				.to.have.property('slots')
				.which.is.a('number');
		}
	});

	it('all have known items as rewards', () => {
		for (const bundle of Object.values(bundles)) {
			if (bundle.reward.item) {
				expect(items).to.have.property(bundle.reward.item);
			}
		}
	});

	it('all have known items as as options', () => {
		for (const bundle of Object.values(bundles)) {
			for (const option of bundle.options) {
				if (option.type === 'item') {
					//@ts-ignore
					expect(items).to.have.property(option.name);
				}
			}
		}
	});
});

describe('travelling cart', () => {
	it('all have correct scheme', () => {
		for (const option of Object.values(travellingCart)) {
			expect(option).to.have.property('item');
		}
	});

	it('only list known items', () => {
		for (const option of travellingCart) {
			expect(items).to.have.property(option.item);
		}
	});
});

describe('rooms', () => {
	it('all have correct scheme', () => {
		for (const room of Object.values(rooms)) {
			expect(room).to.have.property('name');
			expect(room).to.have.property('reward');
			expect(room)
				.to.have.property('bundles')
				.which.is.an('array');
		}
	});

	it('all have known bundles', () => {
		for (const room of Object.values(rooms)) {
			for (const bundle of room.bundles) {
				expect(bundles).to.have.property(bundle);
			}
		}
	});
});
