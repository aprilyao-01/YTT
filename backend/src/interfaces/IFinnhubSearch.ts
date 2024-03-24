export interface IFinnhubSearchResponse {
  count: number;
  result: IFinnhubSearchResult[];
}

export interface IFinnhubSearchResult {
  description: string;
  displaySymbol: string;
  primary: string[];
  symbol: string;
  type: string;
}