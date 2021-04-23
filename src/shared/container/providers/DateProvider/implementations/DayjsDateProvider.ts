import dayjs from "dayjs"

import utc from "dayjs/plugin/utc"
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    compare(start_date: Date, end_date: Date): Promise<any> {
        throw new Error("Method not implemented.");
    }

}