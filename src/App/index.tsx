import { Fragment, useState } from 'react';
import useMockApi from '@/hooks/custom/useMockApi.ts';
import { EventType } from '@/types/MockApi';

function App() {
	const {events: mockApiEvents} = useMockApi();
	const [events, setEvents] = useState<EventType[] | []>(mockApiEvents.getAll());
	const refresh = () => setEvents(mockApiEvents.getAll());


	return (
		<Fragment>
			<h1>App</h1>
			<div>

					<button onClick={() => {
						const id = mockApiEvents.getAll().length + 1;
						mockApiEvents.create({
							id,
							title: `Event ${id}`,
							desc: `Description for Event ${id}`,
							dateTime: new Date(),
							learnMake: 'Learn',
							class: {
								id: 1,
								name: 'Class 1',
							},
						});
						refresh();
					}} type="submit">Add Event</button>
			</div>
			<p>Events</p>
			{events.map((event) => (
				<div style={{
					border: '1px solid white',
				}} key={event.id}>
					<h3>{event.title}</h3>
					<p>{event.desc}</p>
					<p>{event.dateTime.toString()}</p>
					<p>{event.learnMake}</p>
					<p>{event.class.name}</p>
					<button onClick={() => {
						mockApiEvents.delete(event.id);
						refresh();
					}} type="submit">Delete</button>
				</div>
			))}

			{/*I didn't feel like making update, i'll explain it to you later*/}
		</Fragment> );
}

export default App;
