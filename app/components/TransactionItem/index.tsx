import * as React from 'react';
import * as moment from 'moment';

import { Transaction } from '../../apiClient/dtos';
import Logo from '../Logo';

import Balance from '../Balance';


export interface Props {

  transaction: Transaction

}


// const rowStyle: CSSProperties = {
//   display: 'flex'
// };

/*

 <div className="amount">{transaction.amountSender}</div>

 * */
// const sfc: React.SFC<Props> = (({ transaction }) => (
//
//     <div className="transactionRow" style={rowStyle}>
//
//       <div className="transaction-date">{transaction.valuationDate}</div>
//
//       <div className="transaction-icon"><Logo logo={transaction.logo}/></div>
//       <div className="transaction-info">{transaction.title}</div>
//
//       <div className="transaction-amount">{transaction.amount.value}</div>
//     </div>
//   )
//
// );
//
// export default sfc;

const getDate = (date: number): JSX.Element => {

  const dateAsMoment = moment(date);

  return (
    <div className="date">
      <span className="day">{dateAsMoment.format('DD')}</span>
      <span className="month">{dateAsMoment.format('MMM')}</span>
      <span className="year">{dateAsMoment.format('YYYY')}</span>
    </div>
  )

};

export const TransactionItem: React.SFC<Props> = ({ transaction }) => {

  return (

    <tr className="transaction-line clickable outgoing">

      <td className="datecol clickCell">

        <div className="spacer">

          {getDate(transaction.valuationDate)}

        </div>

      </td>
      <td className="iconcol clickCell">

        <div className="spacer">

          <Logo logo={transaction.logo}/>

          {/*<div className="icondiv iconcircle notinprint"*/}
          {/*style="background-size:contain !important;background-position:center center !important;background-image:url(https://george.fat.sparkasse.at/img/logos/logo_1757951_64.png)">*/}

          {/*</div>*/}


          <div className="miniDate visible-xs notinprint">
            30.6.17
          </div>

        </div>

      </td>

      <td className="accountcol clickCell">
        <div className="spacer infoColumn">
          <h5 className="obfuscate">{transaction.title}</h5>
          <div className="clearfix thin">


            <div className="pull-left activeStar hide">
              <svg className="ic-sm ico-star ic-line">
                <use xlinkHref="#ico-star"/>
              </svg>
            </div>

            <div className="pull-left obfuscate">


            </div>
          </div>


          <div className="transaction-icons">


          </div>

        </div>

      </td>
      <td className="amountcol right clickCell">
        <div className="spacer">

          <Balance balance={transaction.amount}/>


        </div>
      </td>


    </tr>

  )
};

export default TransactionItem;


/*

 <tr class="transaction-line clickable outgoing" id="transaction-line-D2C3E10561D50715">
 <td class="datecol clickCell">

 <div class="spacer">

 <div class="date">
 <span class="day">30</span>
 <span class="month">Jun</span>
 <span class="year">2017</span>
 </div>

 </div>
 </td>
 <td class="iconcol clickCell">
 <div class="spacer" id="infoSpacer">


 <div class="icondiv iconcircle notinprint" style="background-size:contain !important;background-position:center center !important;background-image:url(https://george.fat.sparkasse.at/img/logos/logo_1757951_64.png)">

 </div>

 <div class="icondiv iconcircle onlyinprint" style="line-height:inherit;text-align: center;vertical-align: middle;display: table-cell;">
 <img src="https://george.fat.sparkasse.at/img/logos/logo_1757951_64.png">
 </div>






 <div class="miniDate visible-xs notinprint">
 30.6.17
 </div>

 </div>
 </td>
 <td id="infoColumn" class="accountcol clickCell">
 <div class="spacer infoColumn">
 <h5 id="partnerNameHl" class="obfuscate">




 Buchungskostenbeitrag


 </h5>
 <div class="clearfix thin">


 <div id="smallStar" class="pull-left activeStar hide">
 <svg class="ic-sm ico-star ic-line"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ico-star"></use></svg>
 </div>



 <div class="pull-left obfuscate" id="infoLine">


 <span class="label label-category" title="Transactions &amp; Fees">Fees</span>









 </div>
 </div>


 <div class="transaction-icons">




 </div>

 </div>

 </td>
 <td class="amountcol right clickCell">
 <div class="spacer">

 <span class="balance isnegative neutral ">-1<span class="cents">,49</span></span>






 </div>
 </td>
 </tr>

 * */


/*

 <tr class="order-line clickable color-COLOR_5" id="payment-line-044998890390000002029485">
 <td class="selectorCol centeralign">

 <a id="signLink" class="switch deactivated">
 <img src="/img/checkbox/default@2x.png" style="max-width:16px;">
 </a>

 </td>
 <td class="datecol centeralign">
 <div class="spacer">


 <div class="date executionDate">
 <span class="day">12</span>
 <span class="month">Jul</span>
 </div>

 </div>
 </td>
 <td class="iconcol">
 <div class="spacer">

 <div class="icondiv iconcircle iconRed tooltipel" title="Rejected">
 <svg class="ic-md ico-money-out"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ico-money-out"></use></svg>
 </div>





 <span class="label label-danger tooltipel rapidTransferLabel" title="Rejected">
 <svg class="ic-xs ico-exclamation-circle"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ico-exclamation-circle"></use></svg>
 </span>

 </div>
 </td>
 <td id="infoColumn" class="accountcol">
 <div class="spacer col-xs-12">
 <h5 class="obfuscate">


 12345678901234567890123456789012345

 </h5>
 <div class="clearfix thin phone-max-length">


 <span class="label label-warning tooltipel paymentOrder-editLabel editLabel-044998890390000002029485" style="display:none" title="Currently editing">
 Currently editing
 </span>

 <span class="label label-danger" title="This transaction has been rejected by your bank advisor."><em>Rejected</em></span>


 <span id="additionalLabelsWrapper"></span>

 George Go Transfer


 </div>
 <div id="signingAdditionalLineRegion">
 </div>
 </div>


 <div style="position: relative;">
 <div class="orderbuttondiv hoverdisplay" style="padding:5px;">


 <a id="editbtn" href="#currentAccount/D28B4EE6F7E02E05/new-transfer/044998890390000002029485" class="btn btn-xs btn-primary btn-bgfixed tooltipel" title="Edit this order">
 <svg class="ico-pen ic-sm ic-line"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ico-pen"></use></svg>
 Edit
 </a>


 <a id="deletebtn" href="javascript:void(0);" class="btn btn-xs btn-primary btn-bgfixed tooltipel" title="Delete this order">
 <svg class="ico-delete-circle ic-sm ic-line"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ico-delete-circle"></use></svg>
 Delete
 </a>



 <a id="signbtn" href="javascript:void(0);" class="btn btn-xs btn-primary btn-bgfixed tooltipel" title="Sign this order">
 <svg class="ico-signature ic-sm ic-line"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ico-signature"></use></svg>
 Sign</a>


 </div>
 </div>
 </td>
 <td class="amountcol right">
 <div class="spacer">

 <span class="balance isnegative neutral neutral">-8<span class="cents">,00</span></span>

 </div>
 </td>
 </tr>


 * */