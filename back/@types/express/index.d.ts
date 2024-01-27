type UserType = {
	id: string;
	username: string;
	email: string;
};

declare namespace Express {
	export interface Request {
		user: UserType;
	}
}
