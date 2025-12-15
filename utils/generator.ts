import { TabmisRow } from "../types";

export const generateDataLoadString = (rows: TabmisRow[]): string => {
  // Matches the exact sequence from the user's image
  // Columns are tab-delimited
  return rows.map(row => {
    return [
      row.transNum,
      "\\{DOWN\\}",
      row.transType,
      "tab", "tab",
      row.description,
      "tab", "tab", "tab", "tab",
      row.voucherNum,
      "tab",
      row.voucherDate,
      "\\{ENTER\\}",
      "\\+{PGDN}", // Shift+PgDn
      row.line,
      "tab",
      row.debitAccount,
      "tab",
      row.amount,
      "\\{DOWN\\}",
      row.creditAccount,
      "tab", "tab",
      row.amount,
      "\\^S", // Save
      "\\{ENTER\\}",
      "\\%C\\%",
      "\\{DOWN\\}", "\\{DOWN\\}", "\\{DOWN\\}", "\\{DOWN\\}",
      "\\{ENTER\\}",
      row.taxChapter,
      "tab", "tab", "tab",
      row.taxDate,
      "tab", "tab",
      row.taxType,
      "tab", "tab",
      row.collectingAgency,
      row.taxId,
      "tab",
      row.taxpayerName,
      "\\+{PGDN}", "\\+{PGDN}",
      "tab",
      row.collectionAccount,
      "tab", "tab", "tab",
      row.amount,
      "\\^S",
      "\\+{F4}",
      "\\{DOWN\\}"
    ].join("\t");
  }).join("\n");
};

export const generateAHKScript = (rows: TabmisRow[]): string => {
  const header = `
; Auto-generated Tabmis Automation Script
; Press F9 to Start
#SingleInstance Force
SetKeyDelay, 50, 50 ; Adds delay to ensure TABMIS catches inputs

F9::
`;

  const body = rows.map(row => {
    return `
    ; Transaction ${row.transNum}
    SendRaw, ${row.transNum}
    Send, {Down}
    Sleep, 100
    SendRaw, ${row.transType}
    Send, {Tab 2}
    SendRaw, ${row.description}
    Send, {Tab 4}
    SendRaw, ${row.voucherNum}
    Send, {Tab}
    SendRaw, ${row.voucherDate}
    Send, {Enter}
    Sleep, 500
    Send, +{PgDn} ; Shift+PgDn
    Sleep, 500
    SendRaw, ${row.line}
    Send, {Tab}
    SendRaw, ${row.debitAccount}
    Send, {Tab}
    SendRaw, ${row.amount}
    Send, {Down}
    SendRaw, ${row.creditAccount}
    Send, {Tab 2}
    SendRaw, ${row.amount}
    Send, ^s ; Save
    Sleep, 1000
    Send, {Enter}
    ; %C% placeholder delay
    Sleep, 500 
    Send, {Down 4}
    Send, {Enter}
    Sleep, 200
    SendRaw, ${row.taxChapter}
    Send, {Tab 3}
    SendRaw, ${row.taxDate}
    Send, {Tab 2}
    SendRaw, ${row.taxType}
    Send, {Tab 2}
    SendRaw, ${row.collectingAgency}
    SendRaw, ${row.taxId}
    Send, {Tab}
    SendRaw, ${row.taxpayerName}
    Send, +{PgDn}
    Sleep, 100
    Send, +{PgDn}
    Sleep, 100
    Send, {Tab}
    SendRaw, ${row.collectionAccount}
    Send, {Tab 3}
    SendRaw, ${row.amount}
    Send, ^s
    Sleep, 1000
    Send, +{F4}
    Send, {Down}
    Sleep, 500
`;
  }).join("\n");

  const footer = `
    MsgBox, Completed ${rows.length} transactions.
Return

Esc::ExitApp
`;

  return header + body + footer;
};
