import { Constants } from '@/types/MockApi/Constants.ts';

type CreateClassType = {
	name: string,
	color: string,
}

type ClassType = CreateClassType & Constants;

export type { ClassType, CreateClassType };
