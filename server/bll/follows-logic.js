const dal = require("../dal/dal");

async function getFollowsReport(){
    sql = `SELECT COUNT(f.userID) as follows, v.vacationDestination as name FROM follows f, vacations v WHERE v.vacationID = f.vacationID GROUP BY v.vacationID`;
    return await dal.execute(sql);
}

async function getUsersFollows(userId){
    sql = `SELECT vacationID FROM follows WHERE userID = "${userId}" order by vacationID`;
    return await dal.execute(sql);
}

async function addFollow(follow){
    const sql = `insert into follows(userID, vacationID) values("${follow.user}", "${follow.vacation}")`;
    return await dal.execute(sql);
}

async function deleteFollow(follow){
    const sql = `delete from follows where userID = ${follow.user} and vacationID = ${follow.vacation}`;
    return await dal.execute(sql);
}


module.exports = {
    getFollowsReport,
    getUsersFollows,
    addFollow,
    deleteFollow
};