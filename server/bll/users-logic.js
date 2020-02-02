const dal = require("../dal/dal");

async function getOneUser(user){
    const sql = `select userID as id, firstName, lastName, userName, userPass, isAdmin from users where userName = "${user.userName}" limit 1`;
    return await dal.execute(sql);
}

async function addUser(user){
    const sql = `insert into users(firstName, lastName, userName, userPass)
                             values("${user.firstName}", "${user.lastName}", "${user.userName}", "${user.userPass}")`;
    return await dal.execute(sql);
}

async function userAvailabilityCheck(userName){
    const sql = `select * from users where userName = "${userName}"`;
    return await dal.execute(sql);
}

module.exports = {
    getOneUser,
    addUser,
    userAvailabilityCheck
};