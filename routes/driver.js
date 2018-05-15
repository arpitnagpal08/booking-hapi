const joi = require("joi");
const controller = require("../controllers");

let driver = (server) => {

    /**
     * -------------
     * DRIVER SIGNUP
     * -------------
    */
    server.route({
        method: "POST",
        path: "/driver/signUp",
        handler: function(req, res){
            return controller.driverController.signUp(req.payload);
        },
        config: {
            description: "Driver SignUp API",
            tags: ["api", "driver"],
            validate: {
                payload: {
                    name: joi.string().required(),
                    phone: joi.string().required(),
                    email: joi.string().email().required(),
                    password: joi.string().required().min(5)
                }
            }
        }
    })


    /**
     * -----------
     * DRIVER LOGIN
     * -----------
    */
    server.route({
        method: "POST",
        path: "/driver/login",
        handler: function (req, res){
            return controller.driverController.login(req.payload);
        },
        config: {
            description: "Driver Login API",
            tags: ["api", "driver"],
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().required().min(5).description("Minimum 5 characters")
                }
            }
        }
    })

}

module.exports = driver;

