import { AppState } from "./appState";
import { AnyAction } from "redux";
import { ActionType } from "./actionType";

export function reducer(oldAppState: AppState | undefined, action: AnyAction): AppState {

    // ריק AppState החזר אובייקט Ever בקריאה הראשונה
    if (!oldAppState) {
        return new AppState();
    }

    // הישן לאחד חדש AppState-עבור כל קריאה אחרת - שכפל את ה
    const newAppState = { ...oldAppState };

    switch (action.type) {

        // אם הבאנו את כל המוצרים מהשרת
        case ActionType.getAllVacations:
            newAppState.vacations = action.payload;
            break;

        // אם מוסיפים מוצר חדש לרשימת המוצרים
        case ActionType.getCurrentUser:
            // newAppState.products.push(action.payload); // הוספת המוצר בסוף המערך
            newAppState.currentUser = action.payload; // הוספת המוצר בתחילת המערך
            break;

        case ActionType.logoutCurrentUser:
            newAppState.currentUser = action.payload;
            newAppState.followedVacations = [];
            newAppState.vacations = [];
            break;

        case ActionType.getFollowedVacations:
            newAppState.followedVacations = action.payload;
            break;
        case ActionType.connectSocket:
            newAppState.socket = action.payload;
            break;
        case ActionType.disconnectSocket:
            newAppState.socket = action.payload;
            break;
    }

    return newAppState;
}