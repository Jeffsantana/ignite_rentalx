import dayjs from "dayjs"
import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/inMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dateProvider, carsRepositoryInMemory);
    })

    it("Should be able to create a new rental ", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121245",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121245",
                expected_return_date: dayAdd24Hours
            });
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12125",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    })
    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "54321",
                car_id: "12124",
                expected_return_date: dayAdd24Hours
            });
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12124",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    })
    it("Should not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "54321",
                car_id: "12124",
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError);
    })

})