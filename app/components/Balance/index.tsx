import * as React from 'react';

export interface Balance {

  value: number,
  currency: string,
  precision: number
}

export interface Props {
  balance: Balance
}

const currencySymbolLookup: { [key: string]: string } = {
  'EUR': '€',
  'USD': '$'
};

const getCurrencySymbol = (currencyString): string => {

  const symbol = currencySymbolLookup[currencyString];

  if (symbol == null) {
    return ' ';
  }

  return symbol;

};

const getMainValue = (value: number): string => {

  const unformatted =
    Math.trunc(value)
      .toFixed();

  const length = unformatted.length;

  const result = Array.from(unformatted)
    .reduce((previousValue, currentValue, currentIndex, array) => {

      let prev = previousValue;

      if ((length - currentIndex) % 3 == 0){
        prev = prev + george.features.base.thousandSeperator;
      }

      return prev + currentValue;

    });


  return result;
};

const getCents = (value: number): string => {

  const result = value - Math.trunc(value);

  return result.toFixed(2).substring(2);

};

const sfc: React.SFC<Props> = (
  (props) =>

    <span className="balance negative big true">
      {getCurrencySymbol(props.balance.currency)}
      <span> </span>
      {getMainValue(props.balance.value)}
      <span className="cents">
        {george.features.base.decimalSeperator}
        {getCents(props.balance.value)}
        </span>
    </span>
);

export default sfc;