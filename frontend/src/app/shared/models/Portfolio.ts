import { Stock } from "./Stock";

export class PortfolioStock {
    ticker!: string;
    name!: string;
    c!: number;
    quantity!: number;
    totalCost!: number;
    // ave = total / quantity
    // current = c
    // change = ave - c
    // marketV = c * qty
}
export class Portfolio {
    balance!: number;
    stock?: PortfolioStock[];
}