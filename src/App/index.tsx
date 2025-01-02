import { Fragment, useMemo, useState } from 'react';
import useMockApi from '@/hooks/custom/useMockApi.ts';
import { ClassType, EventType } from '@/types/MockApi';
import hexGenerator from '@/util/HexGenerator.ts';

function App() {
	const { events: mockApiEvents, classes: mockApiClasses } = useMockApi();
	const [events, setEvents] = useState<EventType[] | []>(mockApiEvents.getAll());
	const [classes, setClasses] = useState<ClassType[]>(mockApiClasses.getAll());
	const [selectedClassId, setSelectedClassId] = useState<string | null>(mockApiClasses.getAll()[0]?.id ?? null);
	const selectedClass = useMemo(() => classes.find((classItem) => classItem.id === selectedClassId), [selectedClassId, classes]);

	const refresh = () => {
		setEvents(mockApiEvents.getAll());
		setClasses(mockApiClasses.getAll());
		setSelectedClassId(classes[0]?.id ?? null);
	};

	return (
		<Fragment>
			<h1>App</h1>
			<div>
				<label htmlFor="class">Class:</label>
				<input id="class" type="text" />
				<button
					onClick={() => {
						mockApiClasses.create({
							name: (document.getElementById('class') as HTMLInputElement).value,
							color: hexGenerator(true),
						});
						refresh();
					}}
					type="submit"
				>
					Add Class
				</button>
			</div>
			<div>
				<label htmlFor="class">Class:</label>
				<select required onChange={(e) => setSelectedClassId(e.target.value)} name="class" id="class">
					{classes.map((classItem) => (
						<option key={classItem.id} value={classItem.id}>
							{classItem.name}
						</option>
					))}
				</select>
				<button
					onClick={() => {
						if (!selectedClass) {
							return;
						}

						const date = new Date();
						const startTime = new Date();
						const endTime = new Date(startTime.getTime() + 1000 * 60 * 60);

						mockApiEvents.create({
							title: `Event`,
							desc: `Description for Event`,
							date,
							startTime,
							endTime,
							learnMake: 'Learn',
							class: selectedClass,
						});
						refresh();
					}}
					type="submit"
				>
					Add Event
				</button>
			</div>
			<p>Events</p>
			{events.map((event) => (
				<div
					style={{
						border: '1px solid white',
						backgroundColor: '#'+event.class.color,
					}}
					key={event.id}
				>
					<h3>{event.title}</h3>
					<p>{event.desc}</p>
					<p>{event.date.toString()}</p>
					<p>{event.learnMake}</p>
					<p>{event.class.name}</p>
					<button
						onClick={() => {
							mockApiEvents.delete(event.id);
							refresh();
						}}
						type="submit"
					>
						Delete
					</button>
				</div>
			))}
		</Fragment>
	);
}

export default App;
