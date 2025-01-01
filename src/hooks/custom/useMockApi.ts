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
	};
};

export default useMockApi;
