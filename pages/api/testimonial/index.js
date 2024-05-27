import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { getTestimonials, createTestimonial } from "@/backend/controllers/testimonialControllers";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.get(getTestimonials);
handler.use(isAuthenticatedUser).post(createTestimonial);


export default handler;
