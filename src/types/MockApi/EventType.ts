import { ClassType } from '@/types/MockApi/ClassType.ts';
import { Constants } from '@/types/MockApi/Constants.ts';

type CreateEventType = {
	title: string,
	desc: string,
	date: Date,
	startTime: Date,
	endTime: Date,
	class: ClassType,
	learnMake: 'Learn' | 'Make',
}

type EventType = CreateEventType & Constants;

export type { CreateEventType, EventType };
