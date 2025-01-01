import { ClassType } from '@/types/MockApi/ClassType.ts';

type EventType = {
	id: number,
	dateTime: Date,
	title: string,
	desc: string,
	class: ClassType,
	learnMake: 'Learn' | 'Make',
}

export type { EventType };
