import express from "express"

import * as authenticationController from "../controllers/authenticationController.js"

const web = express.Router()

web.get("/", authenticationController.loginView)
web.post("/login", authenticationController.login)

web.get("/register", authenticationController.registerView)
web.post("/register", authenticationController.register)

export default web