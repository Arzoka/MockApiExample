import { ClassType, CreateClassType, CreateEventType, EventType } from '@/types/MockApi';
import { LocalStorage, Validator } from '@/util/MockApi';

export default class MockApi {
	// Event methods
	public events = {
		getAll: (): EventType[] => LocalStorage.getItems<EventType[]>( 'events', [] ),
		get: ( id: string ): EventType | null => this.events.getAll().find( ( event ) => event.id === id ) || null,
		create: ( data: CreateEventType ): EventType => {
			Validator.validate( data, {
				startTime: ( data ) => ( data.startTime < data.endTime ) || 'Start time must be before end time',
				class: ( data ) => this.classes.get( data.class.id ) !== null || `Class with id: ${data.class.id} not found`,
			} );

			return LocalStorage.addItem<CreateEventType>( 'events', data );
		},
		// TODO: play around w validator on these
		update: ( id: string, data: EventType ) => LocalStorage.updateItem<EventType>( 'events', id, data ),
		delete: ( id: string ): string | undefined => LocalStorage.deleteItem( 'events', id, 'id' ),
	};

	// Class methods
	public classes = {
		getAll: (): ClassType[] => LocalStorage.getItems<ClassType[]>( 'classes', [] ),
		get: ( id: string ): ClassType | null => this.classes.getAll().find( ( classType ) => classType.id === id ) || null,
		create: ( data: CreateClassType ): ClassType => LocalStorage.addItem<CreateClassType>( 'classes', data ),
		update: ( id: string, data: ClassType ): ClassType | undefined => {
			Validator.validate( data, {
				id: () => this.classes.get( id ) !== null || `Class with id: ${ id } not found`,
			} );

			return LocalStorage.updateItem<ClassType>( 'classes', id, data );
		},
		delete: ( id: string ): string | undefined => {
			Validator.validate( {}, {
				id: () => this.classes.get( id ) !== null || `Class with id: ${ id } not found`,
			} );

			return LocalStorage.deleteItem( 'classes', id, 'id' );
		},
	};
}
