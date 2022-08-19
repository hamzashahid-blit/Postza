import { writable } from 'svelte/store';
import { v4 } from 'uuid';

export function createKeyValuePairs() {
	let { set, update, subscribe } = writable([
		{
			id: v4(),
			key: '',
			value: ''
		}
	]);

	return {
		add: () => update((pairs) => [...pairs, { id: v4(), key: '', value: '' }]),
		remove: (id) => update((pairs) => pairs.filter((pair) => pair.id !== id)),
		set,
		subscribe
	};
}

export const queryParams = createKeyValuePairs();
export const headers = createKeyValuePairs();
export const jsonData = writable({});
export const selectedTab = writable(0);
/** @type {Writable<AxiosResponse>} **/
export const rawResponse = writable({});
export const timeTaken = writable();
