export class PortfolioItem {
    ticker!: string;
    name!: string;
    c!: number;
    quantity: number = 0;
    totalCost: number = 0;
    average?: number = 0;
    marketValue?: number = 0;
    change?: number = 0;
    color?: string;
    // ave = total / quantity
    // current = c
    // change = ave - c
    // marketV = c * qty
}