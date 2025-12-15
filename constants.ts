import { TabmisRow } from "./types";

export const EMPTY_ROW: Omit<TabmisRow, 'id'> = {
  transNum: "",
  transType: "LKB - k LCT",
  description: "Chuyển tiếp chứng từ",
  voucherNum: "",
  voucherDate: new Date().toLocaleDateString('en-GB').replace(/\//g, ''), // DDMMYYYY
  line: "1",
  debitAccount: "",
  creditAccount: "",
  amount: "0",
  taxChapter: "0516",
  taxDate: new Date().toLocaleDateString('en-GB').replace(/\//g, ''),
  taxType: "01",
  collectingAgency: "1054232",
  taxId: "",
  taxpayerName: "",
  collectionAccount: ""
};

export const SAMPLE_DATA: TabmisRow[] = [
  {
    id: '1',
    transNum: "0511.251212.LANPV.1",
    transType: "LKB - k LCT",
    description: "Chuyển tiếp c",
    voucherNum: "5692125",
    voucherDate: "07082025",
    line: "1",
    debitAccount: "01.7111.0000.0.0000000.00000.000.000.00000.0511.00.000",
    creditAccount: "01.3853.000",
    amount: "3867600",
    taxChapter: "0516",
    taxDate: "07082025",
    taxType: "01",
    collectingAgency: "1054232",
    taxId: "072090000272",
    taxpayerName: "DỊCH VỤ ĐẶNG NGUYÊN",
    collectionAccount: "01.7111.1003.0.1054232.25672.557.000.00000.0511.00.000"
  }
];
