import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()
const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)

export { rentalRoutes }