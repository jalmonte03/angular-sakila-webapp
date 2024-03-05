import { MONTHS_NAME } from "../constants/date";

export const getMonthAbv = (monthNumber: number) => {
    if(!Number.isInteger(monthNumber)){
        throw new Error("monthNumber is not a valid integer.");
    }

    return MONTHS_NAME[monthNumber-1];    
}