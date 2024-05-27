import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";

import { deleteCategory, updateCategory } from "@/backend/controllers/categoryController";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateCategory);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteCategory);

export default handler;
