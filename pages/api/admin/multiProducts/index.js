import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import { addMultipleProducts } from "@/backend/controllers/productControllers";

const handler = nc({ onError });

dbConnect();

handler.post(addMultipleProducts);

export default handler;
