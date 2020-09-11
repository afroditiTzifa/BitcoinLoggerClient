import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IBitcoinPriceDto } from '../common/bitcoin-price-dto.model';


@Component({
    selector:'crypto-exchange',
    templateUrl:'./crypto-exchange.component.html',
    styles:[".outer-box {float:left;width:50%}",
            ".inner-box { border:3px solid black; margin-left:80px; margin-right:80px; margin-bottom:80px;  padding:15px;}",
            ".box-header {font-weight: bold;padding-bottom:10px; text-align:center}",
            ".box-button {padding-top:15px; text-align:center}"
           ]
})
export class CryptoExchangeComponent{
@Input() row :IBitcoinPriceDto
@Output() clickEvent = new EventEmitter();

onClick(row)
{
    this.clickEvent.emit(row);
}

}