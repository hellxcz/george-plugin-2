import { Balance } from '../components/Balance/index';
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

  id: number;
  uri: string;

}

export interface Transaction {

  id: string,// "0001999900000000233300197800000050000",
  title: string,// "REFUND. LADEBETRAG",
  subtitle: string,
  sender?: any,
  senderName?: any,
  senderOriginator?: any,
  senderReference?: any,
  receiver?: any,
  receiverName?: string,
  receiverReference?: string,
  creditorId?: string,
  amount: Amount,
  amountSender: Amount,
  amountAccounting?: any,
  bookingDate?: number; // 1475704800000,
  valuationDate?: number;// 1475704800000,
  importDate?: number;// 1486664261198,
  inputDate?: number ;//null,
  dueDate?: number,
  exchangeDate?: number,
  insertTimestamp: number;//1475742913000,
  reference?: string,
  originatorSystem: string;//"MONEY2PAY",
  additionalTexts: {
    text1?: string,
    text2?: string,
    text3?: string,
    lineItems: string[],
    constantSymbol?: string,
    variableSymbol?: string,
    specificSymbol?: string
  },
  note?: string,
  bookingType: string;//"M2P-0724",
  bookingTypeTranslation?: string,
  orderRole: string//"SENDER",
  flags: string[];//[ "IS_VISIBLE", "IS_BAL_RELEVANT", "THIRD_PARTY" ],
  cardId: string;//"5NJCMB3AE",
  maskedCardNumber: string;//"404856XXXXXX6431",
  invoiceId?: string,
  transactionDate: number;//1475704800000,
  location?: any,
  foreignExchangeFee?: any,
  transactionFee?: any,
  exchangeRateValue: number;//0,
  exchangeRatePrecision: number;//7,
  cardType: string;//"main",
  mcc: string;//"6010",
  country: string;//"AT",
  paymentType?: any,
  cardCashbackAmount?: any,
  cardBrand?: any,
  merchantName?: string,
  partnerName?: string,
  partnerOriginator?: any,
  partner?: any,
  partnerData?: any,
  logo: Logo,
  owner: string;//"000000002333",
  balance?: Balance,
  txType: string;//"PREPAIDCARD",
  txDirection: string;//"OUTGOING",
  cardInfo?: any,
  atmData?: any,
  posData?: any,
  tags: any[],
  attachment?: any,
  saving?: any,
  additionalData: {
    customerId?: string,
    tags?: any,
    marked: boolean
  },
  categories: {
    mainCategory: string;//"WITHDRAWAL",
    subCategory: string;//"CREDIT_CARD_WITHDRAWAL",
    amount: {
      value: number;//-700,
      precision: number;//2,
      currency: string;//"EUR"
    },
    hidden: boolean
  }[],
  categorizationSource: {
    type: string;//"GLOBAL_RULE",
    content: string;//"{\n  \"merchantCode\" : \"6010\",\n  \"hidden\" : false,\n  \"subCategory\" : \"CREDIT_CARD_WITHDRAWAL\"\n}"
  },
  paymentReference: string;//"REFUND. LADEBETRAG",
  similarityKey: string;//"8A8E037A23ADA741FEF5ACA2F9FB15B1",
  taxPayments?: any,
  mandateId?: any,
  sepaRecurrence?: any,
  sepaScheme?: any,
  mandateDate?: any,
  fee?: any

}

export interface Collection<T> {

  collection: Array<T>;
  currentPage: number;
  metadata: any;
  pageSize: number;
  totalElements: number;
  totalPages: number;


}