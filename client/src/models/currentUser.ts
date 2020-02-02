export class CurrentUser {
    public constructor(
        public id: number | undefined,
        public userName: string = "",
        public isAdmin: boolean = false,
        ) { }
}