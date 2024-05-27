import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { getCategories } from "@/backend/controllers/categoryController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getCategories);

export default handler;
