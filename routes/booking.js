const joi = require("joi");
const controller = require("../controllers");


let booking = (server) => {

    /**
     * --------------
     * BOOKING INSERT
     * --------------
    */
    server.route({
        method: "POST",
        path: "/booking/insert",
        handler: function (req, res){
            return controller.bookingController.insertBooking(req);
        },
        config: {
            description: "Insert Booking API",
            tags: ["api", "booking"],
            validate: {
                payload: {
                    title: joi.string().optional(),
                    seat: joi.number().required().min(1),
                    source_id: joi.number().required(),
                    destination_latitude: joi.string().required(),
                    destination_longitude: joi.string().required(),
                },
                headers: joi.object({
                    'token': joi.string().required()
                }).unknown()
            }
        }
    })

    /**
     * ----------------
     * GET ALL BOOKINGS
     * ----------------
    */
    server.route({
        method: "GET",
        path: "/booking/getBooking",
        handler: function (req, res){
            return controller.bookingController.getBooking(req);
        },
        config: {
            description: "Get All Bookings",
            tags: ["api", "booking"],
            validate: {
                headers: joi.object({
                    'token': joi.string().required(),
                    'search': joi.string().optional()
                }).unknown()
            }
        }
    })

}

module.exports = booking;