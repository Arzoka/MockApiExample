import MockApi from '@/globals/classes/MockApi.ts';

const useMockApi = () => {
	const api = new MockApi();

	return {
		events: {
			getAll: api.events.getAll,
			get: api.events.get,
			create: api.events.create,
			update: api.events.update,
			delete: api.events.delete,
		},
		classes: {
			getAll: api.classes.getAll,
			get: api.classes.get,
			create: api.classes.create,
			update: api.classes.update,
			delete: api.classes.delete,
		}
	};
};

export default useMockApi;
