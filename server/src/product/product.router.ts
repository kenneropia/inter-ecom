import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import isAuth from "../utils/isAuth";
import { getAllProducts, getAProduct } from "./product.controller";
// import { updateNoteSchema } from "./product.schema";

const noteRouter = Router();

// noteRouter.post(
//   "/create-note",
//   isAuth,
//   validateRequestBody(createNoteSchema),
//   createNote
// );

noteRouter.get("/", getAllProducts);

noteRouter.get("/:productId", getAProduct);
// noteRouter.patch(
//   "/:noteId",
//   isAuth,
//   validateRequestBody(updateNoteSchema),
//   updateNote
// );

// noteRouter.delete("/:noteId", isAuth, deleteNote);

export default noteRouter;
