let login = (email, password) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from admin where admin_email='${email}' and admin_password='${password}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
} 

let getAllCustomers = () => {
    return new Promise ((resolve, reject) => {
        con.query(`select customer_name, customer_phone, customer_email, customer.is_verified, date as registration_date from customer`, (err, result) => {
            if(err) reject(err);
            else{
                resolve(result)
            }
        })
    })
}

let getSearchCustomer = (search) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from customer where customer_id like '%${search}%' or customer_name like '%${search}%' or customer_phone like '%${search}%' or customer_email like '%${search}%' or date like '%${search}%'`, (err, result) => {
            if(err) reject(err);
            resolve(result)
        })
    })
}



let getAllBookings = async() => {
    let response = [];
    return new Promise ( (resolve, reject) => {
        con.query(`select DISTINCT * from booking b, customer_address ca, customer c where b.customer_address_id=ca.customer_address_id AND ca.customer_id=c.customer_id order by booking_id DESC`, async (err, result) => {
            if(err) reject(err);
            for(let i=0; i<result.length;i++){
                let details = {
                    booking_id: result[i].booking_id,
                    booking_title: result[i].booking_title,
                    seat: result[i].seat,
                    detailed_address: result[i].detailed_address,
                    source_address_latitude: result[i].latitude,
                    source_address_longitude: result[i].longitude,
                    destination_latitude: result[i].destination_latitude,
                    destination_longitude: result[i].destination_longitude,
                    driver_id: result[i].driver_id,
                    date: result[i].date,
                    customer_details: {
                        customer_name: result[i].customer_name,
                        customer_phone: result[i].customer_phone,
                        customer_email: result[i].customer_email
                    },
                    // driver_details: {
                    //     driver_name: result[i].driver_name,
                    //     driver_phone: result[i].driver_phone,
                    //     driver_email: result[i].driver_email
                    // }
                }
                response.push(details)
            }
            resolve(response)
        })
    })
}

let getSearchBooking = (search) => {
    let response = [];
    return new Promise ((resolve, reject) => {
        con.query(`select * from booking b, customer_address ca, customer c where (b.booking_title like '%${search}%' or b.booking_id like '%${search}%' or b.seat like '%${search}%' or b.customer_address_id like '%${search}%' or b.destination_latitude like '%${search}%' or b.destination_longitude like '%${search}%' or b.date like '%${search}%' or b.driver_id like '%${search}%') AND (ca.customer_address_id=b.customer_address_id AND c.customer_id=ca.customer_id) ORDER BY b.booking_id DESC`, (err, result) => {
            if(err) reject(err);
            for(let i=0; i<result.length;i++){
                let details = {
                    booking_id: result[i].booking_id,
                    booking_title: result[i].booking_title,
                    seat: result[i].seat,
                    detailed_address: result[i].detailed_address,
                    source_address_latitude: result[i].latitude,
                    source_address_longitude: result[i].longitude,
                    destination_latitude: result[i].destination_latitude,
                    destination_longitude: result[i].destination_longitude,
                    date: result[i].date,
                    customer_details: {
                        customer_name: result[i].customer_name,
                        customer_phone: result[i].customer_phone,
                        customer_email: result[i].customer_email
                    },
                    // driver_details: {
                    //     driver_name: result[i].driver_name,
                    //     driver_phone: result[i].driver_phone,
                    //     driver_email: result[i].driver_email
                    // }
                }
                response.push(details)
            }
            resolve(response)
        })
    })
}

let getAllDrivers = () => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from driver`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let getSearchDriver = (search) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from driver where driver_id like '%${search}%' or driver_name like '%${search}%' or driver_phone like '%${search}%' or driver_email like '%${search}%' or date like '%${search}%'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let assignDriver = (data) => {
    return new Promise ((resolve, reject) => {
        con.query(`select driver_id from booking where booking_id='${data.booking_id}'`, (err, result) => {
            if(err) reject(err);
            else{
                if(result[0].driver_id == null){
                    con.query(`update booking set driver_id=${data.driver_id} where booking_id=${data.booking_id}`, (err, result) => {
                        if(err) reject(err);
                        else{
                            con.query(`select * from booking where booking_id=${data.booking_id}`, (err, result) => {
                                if(err) reject(err);
                                else{
                                    con.query(`update driver set status=1 where driver_id=${data.driver_id}`, async (err) => {
                                        if(err) reject(err);
                                        else{
                                            let book_id = `${data.booking_id}`;
                                            let desc = "Driver assigned";
                                            let date = `${new Date()}`;
                                            let log = {
                                                booking_id: book_id,
                                                desc: desc,
                                                date: date
                                            }
                                            const collection = dataBase.collection("log");
                                            let response = await collection.insertOne(log);
                                        }
                                    })
                                }
                                resolve(result);
                            })
                        }
                    })
                }
                else{
                    resolve("Driver Already Assigned")
                }
            }
        })
    })
}

let log = async (id) => {
    const collection = dataBase.collection("log");
    let response = await collection.find({}).sort({_id:-1}).toArray();
    return response;
}

let logSearch = async (id, search) => {
    const collection = dataBase.collection("log");

    let desc = {desc: {$regex: search}};
    let booking_id = {booking_id: {$regex: search}};
    let date = {date: {$regex: search}};

    let response = await collection.find({$or: [desc, booking_id, date]}).toArray();
    return response
}

let getAvailDriver = async (id) => {
    return new Promise ((resolve, reject) => {
        con.query(`select driver_id, driver_name, driver_phone, driver_email from driver where status=0`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    login,
    getAllCustomers,
    getSearchCustomer,
    getAllBookings,
    getSearchBooking,
    getAllDrivers,
    getSearchDriver,
    assignDriver,
    log,
    logSearch,
    getAvailDriver
}