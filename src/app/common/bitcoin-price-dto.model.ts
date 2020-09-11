export interface IBitcoinPriceDto {
    sourceId: number;
    source: string; 
    userid: number; 
    currencyPairId : number;
    currencyPair: string;
    timestamp: Date;
    lastPrice: number;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    bid: number;
    ask: number;
    volume: number;

}
