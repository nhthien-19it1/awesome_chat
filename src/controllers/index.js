import homeController from "../controllers/homeController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import contactController from "../controllers/contactController"
import notificationController from "./notificationController"
import messageController from "./messageController"

export const home = homeController;
export const auth = authController;
export const user = userController;
export const contact = contactController;
export const notification = notificationController;
export const message = messageController;
