import z from "zod";

export const registerRequest = z.object({
    username : z.string().min(3),
    email : z.email(),
    password : z.string().min(8)
})