let checkEmail = (email) => {
    return new Promise ((resolve, reject) => {
      con.query(`select * from customer where customer_email='${email}'`, (err, result) => {
          if(err) reject(err);
          resolve(result);
      })  
    })
}

let register = (data, otp) => {
    return new Promise ((resolve, reject) => {
        con.query(`insert into customer(customer_name, customer_phone, customer_email, customer_password, OTP) values ('${data.name}', '${data.phone}', '${data.email}', '${data.password}', '${otp}')`, (err, result) => {
            if(err) reject(err);
            resolve(result)
        })
    })
}

let login = (email, password) => {
    return new Promise((resolve, reject) => {
        con.query(`select * from customer where customer_email='${email}' and customer_password='${password}'`, (err, result) => {
            if(err) reject(err)
            resolve(result);
        })
    })
}

let checkOtp = (id, otp) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from customer where customer_id='${id}' and OTP='${otp}'`, (err, result) => {
            if(err) reject(err);
            resolve(result)
        })
    })
}

let updateAccount = (id) => {
    return new Promise ((resolve, reject) => {
        con.query(`update customer set is_verified='yes' where customer_id='${id}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let addAddress = (id, data) => {
    return new Promise ((resolve, reject) => {
        con.query(`insert into customer_address(customer_id,detailed_address, latitude, longitude) values ('${id}', '${data.detail}', '${data.latitude}', '${data.longitude}')`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    checkEmail,
    register,
    login,
    checkOtp,
    updateAccount,
    addAddress
}