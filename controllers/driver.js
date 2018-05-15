const services = require("../services");
const jwt = require("jsonwebtoken");

async function signUp(data){
    try {
        let checkEmail = await services.driverServices.checkEmail(data.email);
        if(checkEmail[0] == null){
            let register = await services.driverServices.register(data);
            return {
                statusCode: 200,
                message: "Successfully Registered",
                data: {
                    name: data.name,
                    phone: data.phone,
                    email: data.email
                }
            }
        }
        else{
            return "Email Already Registered"
        }
    } catch (error) {
        return error;
    }
}

async function login(data){
    try {
        let login = await services.driverServices.login(data.email, data.password);
        if(login.length != 0){
            let token = jwt.sign(login[0].driver_id, 'secretKey');
            return {
                statusCode: 200,
                message: "Successfully Logged In",
                data: {
                    name: login[0].driver_name,
                    email: login[0].driver_email,
                    accessToken: token
                }
            }
        }
        else{
            return "Email or password is wrong"
        }
    } catch (error) {
        return error;
    }
}

module.exports = {
    signUp,
    login
}