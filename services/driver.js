let checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        con.query(`select * from driver where driver_email='${email}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let register = (data) => {
    return new Promise((resolve, reject) => {
        con.query(`insert into driver (driver_name, driver_phone, driver_email, driver_password) values('${data.name}', '${data.phone}', '${data.email}', '${data.password}')`, (err, result) => {
            if(err) reject(err);
            resolve(result)
        })
    })
}

let login = (email, password) => {
    return new Promise((resolve, reject) => {
        con.query(`select * from driver where driver_email='${email}' and driver_password='${password}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    checkEmail,
    register,
    login
}