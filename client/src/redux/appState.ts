import { Vacation } from "../models/vacation";


// מחלקה המכילה את כל המידע הקיים ברמת האפליקציה
export class AppState {
    public vacations: Vacation[] = [];
    public currentUser: any;
    public followedVacations: string[] = [];
    public socket: any;
}

// הערה: אם רכיב מסוים צריך מידע רק לשימושו האישי
// AppState-אין להגדיר מידע זה ב
// של הרכיב עצמו State-מידע זה יהיה ב

