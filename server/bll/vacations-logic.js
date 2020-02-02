const dal = require("../dal/dal");

async function getAllVacations(){
    const sql = `select vacationID as id, vacationDescription as description, vacationDestination as destination, vacationImg as img, DATE_FORMAT(vacationStart, "%Y-%m-%e") as start, DATE_FORMAT(vacationEnd, "%Y-%m-%e") as end, vacationPrice as price from vacations`;
    return await dal.execute(sql);
}

async function addVacation(vacation){
    const sql = `insert into vacations(vacationDescription, vacationDestination, vacationImg, vacationStart, vacationEnd, vacationPrice)
                            values("${vacation.description}", "${vacation.destination}", "${vacation.img}", "${vacation.start}", "${vacation.end}", "${vacation.price}")`;
    return await dal.execute(sql);
}

async function updateVacation(vacation){
    const sql = `update vacations set vacationDescription = "${vacation.description}", vacationDestination = "${vacation.destination}",
                                        vacationImg = "${vacation.img}", vacationStart = "${vacation.start}", vacationEnd = "${vacation.end}", vacationPrice = "${vacation.price}" where vacationID = "${vacation.id}"`;
    return await dal.execute(sql);

}

async function deleteVacation(vacation){
    const sql = `delete from vacations where vacationID = ${vacation.id}`;
    return await dal.execute(sql);
}

module.exports = {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation
};