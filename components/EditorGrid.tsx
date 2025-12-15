import React from 'react';
import { TabmisRow } from '../types';
import { Trash2, Plus, Copy } from 'lucide-react';

interface EditorGridProps {
  rows: TabmisRow[];
  setRows: React.Dispatch<React.SetStateAction<TabmisRow[]>>;
}

export const EditorGrid: React.FC<EditorGridProps> = ({ rows, setRows }) => {
  
  const updateRow = (id: string, field: keyof TabmisRow, value: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const removeRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const duplicateRow = (row: TabmisRow) => {
    const newRow = { ...row, id: crypto.randomUUID() };
    setRows(prev => [...prev, newRow]);
  };

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
      <table className="w-full text-xs text-left text-gray-700 whitespace-nowrap">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-3 py-2 border-b">Actions</th>
            <th className="px-3 py-2 border-b min-w-[150px]">Số bút toán</th>
            <th className="px-3 py-2 border-b min-w-[100px]">Loại</th>
            <th className="px-3 py-2 border-b min-w-[200px]">Nội dung</th>
            <th className="px-3 py-2 border-b min-w-[100px]">Số CT</th>
            <th className="px-3 py-2 border-b min-w-[100px]">Ngày CT</th>
            <th className="px-3 py-2 border-b min-w-[250px]">TK Nợ</th>
            <th className="px-3 py-2 border-b min-w-[120px]">Số tiền</th>
            <th className="px-3 py-2 border-b min-w-[250px]">TK Có</th>
            <th className="px-3 py-2 border-b min-w-[100px]">Mã LKB</th>
            <th className="px-3 py-2 border-b min-w-[150px]">Mã số thuế</th>
            <th className="px-3 py-2 border-b min-w-[200px]">Tên NTT</th>
            <th className="px-3 py-2 border-b min-w-[250px]">TK Thu</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 border-b last:border-0">
              <td className="px-2 py-1 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] flex gap-1 items-center">
                <button 
                  onClick={() => removeRow(row.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                  title="Remove Row"
                >
                  <Trash2 size={14} />
                </button>
                <button 
                  onClick={() => duplicateRow(row)}
                  className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                  title="Duplicate Row"
                >
                  <Copy size={14} />
                </button>
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.transNum} 
                  onChange={(e) => updateRow(row.id, 'transNum', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </td>
               <td className="p-0">
                <input 
                  type="text" 
                  value={row.transType} 
                  onChange={(e) => updateRow(row.id, 'transType', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </td>
               <td className="p-0">
                <input 
                  type="text" 
                  value={row.description} 
                  onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.voucherNum} 
                  onChange={(e) => updateRow(row.id, 'voucherNum', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.voucherDate} 
                  onChange={(e) => updateRow(row.id, 'voucherDate', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </td>
               <td className="p-0">
                <input 
                  type="text" 
                  value={row.debitAccount} 
                  onChange={(e) => updateRow(row.id, 'debitAccount', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent font-mono text-xs"
                />
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.amount} 
                  onChange={(e) => updateRow(row.id, 'amount', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent font-medium"
                />
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.creditAccount} 
                  onChange={(e) => updateRow(row.id, 'creditAccount', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent font-mono text-xs"
                />
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.taxChapter} 
                  onChange={(e) => updateRow(row.id, 'taxChapter', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.taxId} 
                  onChange={(e) => updateRow(row.id, 'taxId', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.taxpayerName} 
                  onChange={(e) => updateRow(row.id, 'taxpayerName', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </td>
              <td className="p-0">
                <input 
                  type="text" 
                  value={row.collectionAccount} 
                  onChange={(e) => updateRow(row.id, 'collectionAccount', e.target.value)}
                  className="w-full h-full px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 bg-transparent font-mono text-xs"
                />
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
             <tr>
               <td colSpan={13} className="px-6 py-8 text-center text-gray-400">
                 No data. Add a row or import data to start.
               </td>
             </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
