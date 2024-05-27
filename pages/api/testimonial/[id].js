import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { getTestimonial } from "@/backend/controllers/testimonialControllers";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getTestimonial);

export default handler;
