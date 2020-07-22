import { Router } from "express";
import apointmentsRouter from "./appointments.routes";

const routes = Router();

routes.use("/init", apointmentsRouter);

export default routes;
