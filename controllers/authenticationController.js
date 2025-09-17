import UserModel from "../schema/userSchema.js";
import { loginRequest, registerRequest } from "../validations/authRequest.js";
import bcrypt from "bcrypt";

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

export const login = async (req, res) => {
    try {
        const validate = loginRequest.safeParse(req.body)

        if (!validate.success) {
            res.flash('isError', true);
            res.flash('errors', validate.error.issues)
            res.flash('message', "Validation error")
            res.flash('body', req.body)

            return res.render("auth/login", {
                title: "Login"
            });
        }

        const { email, password } = validate.data

        const user = await UserModel.findOne({
            email: email
        })

        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                req.session.regenerate((error) => {
                    if(error) {
                        console.error("Error");
                    }

                    req.session.user = user

                    req.session.save((error) => {
                        return res.send("OK")
                    })
                })
            }
        } else {
        return res.redirect('/register')
        }
    } catch (error) {
        console.error(error.message);
        return res.redirect('/')
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

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        await UserModel.create({
            username,
            email,
            password: hashPassword
        })

        res.flash("isSuccess", true)
        res.flash("success", "Register berhasil, silahkan login")

        return res.render("auth/login", {
            title: "Login"
        });
    } catch (error) {
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
                    path: "Validation",
                    message: "Validation failed"
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