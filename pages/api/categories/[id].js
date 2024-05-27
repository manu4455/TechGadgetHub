import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { getCategory } from "@/backend/controllers/categoryController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getCategory);

export default handler;
