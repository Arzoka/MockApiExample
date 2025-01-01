import { EventType } from '@/types/MockApi';

export default class MockApi {
	private localStorage = {
		getItems<T>(key: string, fallback: T = null as T): T {
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : fallback;
		},

		setItems<T>(key: string, data: T): void {
			localStorage.setItem(key, JSON.stringify(data));
		},

		addItem<T>(key: string, data: T): void {
			const items = this.getItems<T[]>(key, []);
			items.push(data);
			this.setItems(key, items);
		},

		deleteItem(key: string, id: number, identifier: string): void {
			const items = this.getItems<any[]>(key, []);
			const index = items.findIndex((item) => item[identifier] === id);
			if (index !== -1) {
				items.splice(index, 1);
				this.setItems(key, items);
			}
		},

		updateItem<T extends { id: number }>(
			key: string,
			id: number,
			data: T
		): void {
			const items = this.getItems<T[]>(key, []);
			const index = items.findIndex((item) => item.id === id);
			if (index !== -1) {
				items[index] = data;
				this.setItems(key, items);
			}
		},
	};

	public events = {
		getAll: (): EventType[] => {
			return this.localStorage.getItems<EventType[]>('events', []);
		},

		get: (id: number): EventType | null => {
			const events = this.events.getAll();
			return events.find((event) => event.id === id) || null;
		},

		create: (data: EventType): void => {
			this.localStorage.addItem<EventType>('events', data);
		},

		update: (id: number, data: EventType): void => {
			this.localStorage.updateItem<EventType>('events', id, data);
		},

		delete: (id: number): void => {
			this.localStorage.deleteItem('events', id, 'id');
		},
	};
}
