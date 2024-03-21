export class PortfolioStock {
    ticker!: string;
    name!: string;
    c!: number;
    quantity: number = 0;
    totalCost: number = 0;
    average?: string = "";
    marketValue?: string = "";
    change?: string = "";
    // ave = total / quantity
    // current = c
    // change = ave - c
    // marketV = c * qty
}