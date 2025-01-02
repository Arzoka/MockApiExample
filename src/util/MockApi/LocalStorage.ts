import { v4 as uuidv4 } from 'uuid';

const LocalStorage = {
	getItems<T>( key: string, fallback: T = null as T ): T {
		const data = localStorage.getItem( key );
		return data ? JSON.parse( data ) : fallback;
	},

	setItems<T>( key: string, data: T ): T {
		localStorage.setItem( key, JSON.stringify( data ) );
		return data;
	},

	addItem<T>( key: string, data: T ): T & {id: string} {
		const items = this.getItems<T[]>( key, [] );
		const item = {
			...data,
			id: uuidv4(),
		};
		items.push( item );
		this.setItems( key, items );
		return item;
	},

	deleteItem( key: string, id: string, identifier: string ): string | undefined {
		const items = this.getItems<any[]>( key, [] );
		const index = items.findIndex( ( item ) => item[identifier] === id );

		// if the item is not found, do nothing
		if ( index === -1 ) { return; }

		items.splice( index, 1 );
		this.setItems( key, items );
		return `${id} deleted`;

	},

	updateItem<T extends {
		id: string
	}>( key: string, id: string, data: T ): T | undefined {
		const items = this.getItems<T[]>( key, [] );
		const index = items.findIndex( ( item ) => item.id === id );

		// if the item is not found, do nothing
		if ( index !== -1 ) { return; }

		items[index] = data;
		this.setItems( key, items );
		return data;
	},
};

export default LocalStorage;
