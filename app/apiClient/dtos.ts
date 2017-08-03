
export interface Account {
  id: string,
  transactionAccountId: string,
  accountno: {
    iban: string,
    bic: string,
    number: string,
    bankCode: string,
    prefix: string,
    countryCode: string
  },
  currency: string,
  alias: string,
  description: string,
  balance: {
    value: number,
    precision: number,
    currency: string
  },
  disposable: {
    value: number,
    precision: number,
    currency: string
  },
  overdraft: {
    value: number,
    precision: number,
    currency: string
  },
  type: string,
  typeI18N: string,
  productI18N: string,
  productId: string,
  productType: string,
  productSubType: string,
  flags: [
    string
    ],
  nextRateAmount: {
    value: number,
    precision: number,
    currency: string
  },
  nextRateType: string,
  nextRateDate: string, // '2017-07-14T09:30:41.976Z',
  userId: string,
  card: {
    id: string,
    alias: string,
    owner: string,
    number: string,
    product: string,
    productI18N: string,
    balance: {
      value: number,
      precision: number,
      currency: string
    },
    limit: {
      value: number,
      precision: number,
      currency: string
    },
    directDebitAccount: {
      iban: string,
      bic: string,
      number: string,
      bankCode: string,
      prefix: string,
      countryCode: string
    },
    minimalMonthlyAmount: {
      value: number,
      precision: number,
      currency: string
    },
    repaymentRate: string,
    type: string,
    provider: string,
    characteristic: string,
    flags: [
      string
      ],
    _shadowAccountId: string
  },
  additionalData: {
    color: string, //'COLOR_1',
    position: number,
    hidden: false,
    colorCode: string
  },
  plugin: string, //'CUSTOMER_SAFE',
  hasImage: false
}


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
  balance?: Amount,
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