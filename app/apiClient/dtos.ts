export interface Category {

}

export interface CategoryDetails {

  [id: string]: CategoryDetail;

}

export interface CategoryDetail {

  currency: string;
  precision: number;
  value: number;

}

export interface Amount {
  currency: string;
  precision: number;
  value: number;
}

export interface Logo {

  id: string;
  uri: string;

}

export interface Transaction {

  id : string,// "0001999900000000233300197800000050000",
  title : string,// "REFUND. LADEBETRAG",
  subtitle : string,
  sender? : null,
  senderName? : null,
  senderOriginator? : null,
  senderReference? : null,
  receiver? : null,
  receiverName? : null,
  receiverReference? : null,
  creditorId? : null,
  amount : Amount,
  amountSender : Amount,
  amountAccounting? : null,
  bookingDate? : number; // 1475704800000,
  valuationDate? : number;// 1475704800000,
  importDate? : number;// 1486664261198,
  inputDate? : number ;//null,
  dueDate? : number,
  exchangeDate? : null,
  insertTimestamp : number;//1475742913000,
  reference? : null,
  originatorSystem : string;//"MONEY2PAY",
  additionalTexts : {
    text1? : string,
    text2? : string,
    text3? : string,
    lineItems : string[],
    constantSymbol? : string,
    variableSymbol? : string,
    specificSymbol? : string
  },
  note? : string,
  bookingType : string;//"M2P-0724",
  bookingTypeTranslation? : null,
  orderRole : string//"SENDER",
  flags : string[];//[ "IS_VISIBLE", "IS_BAL_RELEVANT", "THIRD_PARTY" ],
  cardId : string;//"5NJCMB3AE",
  maskedCardNumber : string;//"404856XXXXXX6431",
  invoiceId? : null,
  transactionDate : number;//1475704800000,
  location? : null,
  foreignExchangeFee? : null,
  transactionFee? : null,
  exchangeRateValue : number;//0,
  exchangeRatePrecision : number;//7,
  cardType : string;//"main",
  mcc : string;//"6010",
  country : string;//"AT",
  paymentType? : null,
  cardCashbackAmount? : null,
  cardBrand? : null,
  merchantName? : null,
  partnerName? : null,
  partnerOriginator? : null,
  partner? : null,
  partnerData? : null,
  logo : Logo,
  owner : string;//"000000002333",
  balance? : null,
  txType : string;//"PREPAIDCARD",
  txDirection : string;//"OUTGOING",
  cardInfo? : null,
  atmData? : null,
  posData? : null,
  tags : any[],
  attachment? : null,
  saving? : null,
  additionalData : {
    customerId? : null,
    tags? : null,
    marked : boolean
  },
  categories : [ {
    mainCategory : string;//"WITHDRAWAL",
    subCategory : string;//"CREDIT_CARD_WITHDRAWAL",
    amount : {
      value : number;//-700,
      precision : number;//2,
      currency : string;//"EUR"
    },
    hidden : boolean
  } ],
  categorizationSource : {
    type : string;//"GLOBAL_RULE",
    content : string;//"{\n  \"merchantCode\" : \"6010\",\n  \"hidden\" : false,\n  \"subCategory\" : \"CREDIT_CARD_WITHDRAWAL\"\n}"
  },
  paymentReference : string;//"REFUND. LADEBETRAG",
  similarityKey : string;//"8A8E037A23ADA741FEF5ACA2F9FB15B1",
  taxPayments? : null,
  mandateId? : null,
  sepaRecurrence? : null,
  sepaScheme? : null,
  mandateDate? : null,
  fee? : null

}

export interface Collection<T> {

  collection: Array<T>;
  currentPage: number;
  metadata: any;
  pageSize: number;
  totalElements: number;
  totalPages: number;


}