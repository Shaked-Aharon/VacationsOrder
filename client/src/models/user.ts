export class User {
    public constructor(
        public id: string,
        public firstName: string = "",
        public lastName: string = "",
        public userName: string = "",
        public userPass: string = "",
        public isAdmin: string
        ) { }
}