import UserModel from "../schema/userSchema.js";
import { registerRequest } from "../validations/RegisterRequest.js";

export const loginView = (req, res) => {
    res.render("auth/login", {
        title: "Login"
    });
}

export const registerView = (req, res) => {
    res.render("auth/register", {
        title: "Register"
    });
}

export const login = (req, res) => {
    try {

    } catch (error) {
        console.error(error.message);
    }
}

export const register = async (req, res) => {
    try {
        const validate = registerRequest.safeParse(req.body)

        if (!validate.success) {
            res.flash('isError', true);
            res.flash('errors', validate.error.issues)
            res.flash('message', "Validation error")
            res.flash('body', req.body)

            return res.render("auth/register", {
                title: "Register"
            });
        }

        const { username, email, password } = validate.data

        await UserModel.create({
            username,
            email,
            password
        })

        res.flash("isSuccess", true)
        res.flash("success", "Register berhasil, silahkan login")

        return res.render("auth/login", {
            title: "Login"
        });
    } catch (error) {
        console.log(error.code);
        res.flash('isError', true);
        res.flash('message', "Validation error")

        let errors = [
            {
                path: "Service",
                message: "Internal Sever Error"
            }
        ]

        if (error.code == 11000) {
            errors = [
                {
                    path : "Validation",
                    message : "Validation failed"
                }
            ]
        }

        res.flash('errors', errors)
        res.flash('body', req.body)

        return res.render("auth/register", {
            title: "Register"
        });
    }
}