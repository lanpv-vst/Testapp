export interface TabmisRow {
  id: string;
  transNum: string; // Số bút toán
  transType: string; // Loại bút toán (e.g., LKB - k LCT)
  description: string; // Nội dung
  voucherNum: string; // Số chứng từ
  voucherDate: string; // Ngày chứng từ
  line: string; // Dòng
  debitAccount: string; // TK nợ
  creditAccount: string; // TK có
  amount: string; // Số tiền
  taxChapter: string; // Mã LKB (Chương)
  taxDate: string; // Ngày nộp thuế
  taxType: string; // Loại thuế
  collectingAgency: string; // Mã cơ quan thu
  taxId: string; // Mã số thuế
  taxpayerName: string; // Tên NTT
  collectionAccount: string; // Tài khoản thu
}

export interface GeneratedOutput {
  dataload: string;
  ahk: string;
}
