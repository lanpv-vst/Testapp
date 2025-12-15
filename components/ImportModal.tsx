import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { parseUnstructuredData } from '../services/geminiService';
import { TabmisRow } from '../types';
import { EMPTY_ROW } from '../constants';

interface ImportModalProps {
  onClose: () => void;
  onImport: (newRows: TabmisRow[]) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ onClose, onImport }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSmartImport = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const parsedData = await parseUnstructuredData(input);
      
      const newRows: TabmisRow[] = parsedData.map(d => ({
        ...EMPTY_ROW,
        ...d,
        id: crypto.randomUUID()
      } as TabmisRow));

      onImport(newRows);
      onClose();
    } catch (err: any) {
      setError("Failed to process data. Please check your API Key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="text-purple-600" size={20}/>
            Smart Import with Gemini
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">
            Paste unstructured text (e.g., email content, rough notes, or raw invoice lists) below. 
            The AI will attempt to extract TABMIS fields automatically.
          </p>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono"
            placeholder={`Example:
Chuyển 50 triệu cho CÔNG TY TNHH ABC, mã số thuế 0301234567.
Từ tài khoản 3713 về tài khoản thu 7111.
Nội dung: Nộp thuế GTGT tháng 8/2025.`}
          />
          
          {error && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded">
              {error}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSmartImport}
            disabled={loading || !input.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" size={16}/> : <Sparkles size={16}/>}
            {loading ? 'Analyzing...' : 'Process & Import'}
          </button>
        </div>
      </div>
    </div>
  );
};
