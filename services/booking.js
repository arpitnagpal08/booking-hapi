const object_id = require("mongodb").ObjectID;

let insertBooking = async (id, data) => {
    return new Promise((resolve, reject) => {
        con.query(`insert into booking(booking_title, seat, customer_address_id, destination_latitude, destination_longitude) values('${data.title}', '${data.seat}', '${data.source_id}', '${data.destination_latitude}', '${data.destination_longitude}')`, (err, result) => {
            if (err) reject({
                statusCode: 400,
                message: "Unkown Source Id"
            })
            else {
                con.query(`select * from customer_address where customer_id='${id}'`, (error, res) => {
                    if (error) reject(error);
                    else{
                        con.query(`select booking_id from booking, customer_address where customer_address.customer_id='${id}' and booking.customer_address_id=customer_address.customer_address_id order by booking_id DESC limit 1`, async (err, r) => {
                            if(err) return err;
                            else{
                                let book_id = `${r[0].booking_id}`;
                                let desc = "Booking inserted";
                                let date = `${new Date()}`;
                                let log = {
                                    booking_id: book_id,
                                    desc: desc,
                                    date: date
                                }
                                const collection = dataBase.collection("log");
                                let response = await collection.insertOne(log);
                                resolve(res);
                            }
                        })
                    }
                })
            }
        })
    })
}

let getBooking = async (id) => {
    return new Promise((resolve, reject) => {
        con.query(`select * from booking b, customer_address cd, customer c where c.customer_id='${id}' and cd.customer_id=c.customer_id and b.customer_address_id=cd.customer_address_id`, async (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

let getSearchBookings = async (id, search) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from booking b, customer_address cd, customer c where 
        (c.customer_id='${id}' and cd.customer_id=c.customer_id and b.customer_address_id=cd.customer_address_id) AND 
        (b.booking_title like '%${search}%' or b.seat like '%${search}%' or b.customer_address_id like '%${search}%' or b.destination_latitude like '%${search}%' or b.destination_longitude like '%${search}%' or b.date like '%${search}%' or b.driver_id like '%${search}%' or c.customer_name like '%${search}%' or c.customer_email like '%${search}%' or c.customer_phone like '%${search}%' or cd.latitude like '%${search}%' or cd.longitude like '%${search}%')`, 
        (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let updateBooking = async () => {

}



module.exports = {
    insertBooking,
    getBooking,
    getSearchBookings,
    updateBooking
}