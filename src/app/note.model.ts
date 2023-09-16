export class Note {
    public title: string;
    public description: string;
    public favorite: boolean;

    constructor(title: string, desc: string, fav: boolean) {
        this.title = title;
        this.description = desc;
        this.favorite = fav;
    }
}
