// enum = רשימה סגורה של קבועים
// לדוגמה, ימות השבוע
// לדוגמה, חודשי השנה
// לדוגמה, מצב משפחתי

// ActionType - רשימת הפעולות הניתנות לביצוע על המידע של האפליקציה
export enum ActionType {
    getCurrentUser,
    getAllVacations,
    logoutCurrentUser,
    deleteVacation,
    addVacation,
    updateVacation,
    getFollowedVacations,
    connectSocket,
    disconnectSocket
}