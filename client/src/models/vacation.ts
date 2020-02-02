export class Vacation {
    public constructor(
        public id: string,
        public description: string = "",
        public destination: string = "",
        public img: string = "",
        public start: string = "",
        public end: string = "",
        public price: number = 0
        ) { }
}