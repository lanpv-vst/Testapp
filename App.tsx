import React, { useState } from 'react';
import { EditorGrid } from './components/EditorGrid';
import { ImportModal } from './components/ImportModal';
import { InstructionsModal } from './components/InstructionsModal';
import { TabmisRow } from './types';
import { EMPTY_ROW, SAMPLE_DATA } from './constants';
import { generateDataLoadString, generateAHKScript } from './utils/generator';
import { FileCode, Download, Plus, Wand2, Copy, Info, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [rows, setRows] = useState<TabmisRow[]>(SAMPLE_DATA);
  const [showImport, setShowImport] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [outputTab, setOutputTab] = useState<'dataload' | 'ahk'>('dataload');

  const handleAddRow = () => {
    setRows(prev => [...prev, { ...EMPTY_ROW, id: crypto.randomUUID() }]);
  };

  const handleImport = (newRows: TabmisRow[]) => {
    setRows(prev => [...prev, ...newRows]);
  };

  const dataloadString = generateDataLoadString(rows);
  const ahkScript = generateAHKScript(rows);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadAHK = () => {
    const blob = new Blob([ahkScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tabmis_automation.ahk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FileCode size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-none text-gray-800">TABMIS AutoGen</h1>
              <p className="text-xs text-gray-500 mt-0.5">DataLoad Replacement & Automation Tool</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button
               onClick={() => setShowInstructions(true)}
               className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2"
               title="Hướng dẫn sử dụng"
             >
               <HelpCircle size={20} />
             </button>

             <button
              onClick={() => setShowImport(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
            >
              <Wand2 size={16} />
              AI Import
            </button>
            <button
              onClick={handleAddRow}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={16} />
              Add Row
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto p-4 flex flex-col lg:flex-row gap-6 h-[calc(100vh-64px)]">
        
        {/* Left Panel: Grid Editor */}
        <section className="flex-1 flex flex-col min-h-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
            <h2 className="font-semibold text-gray-700">Transaction Data</h2>
            <span className="text-xs text-gray-500">{rows.length} rows</span>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <EditorGrid rows={rows} setRows={setRows} />
          </div>
        </section>

        {/* Right Panel: Output Preview */}
        <section className="w-full lg:w-96 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden shrink-0">
          <div className="p-1 bg-gray-100 m-2 rounded-lg flex gap-1">
            <button
              onClick={() => setOutputTab('dataload')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                outputTab === 'dataload' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              DataLoad Code
            </button>
            <button
              onClick={() => setOutputTab('ahk')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                outputTab === 'ahk' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              AutoHotKey Script
            </button>
          </div>

          <div className="flex-1 overflow-hidden relative group">
            <textarea
              readOnly
              value={outputTab === 'dataload' ? dataloadString : ahkScript}
              className="w-full h-full p-4 resize-none focus:outline-none font-mono text-xs bg-slate-50 text-slate-700"
            />
          </div>

          <div className="p-4 border-t bg-gray-50 flex flex-col gap-3">
             <div className="text-xs text-gray-500 flex items-start gap-2 bg-blue-50 p-2 rounded border border-blue-100">
                <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
                {outputTab === 'dataload' 
                  ? "Paste this content directly into your DataLoad grid. It contains the exact keystroke sequences found in your example."
                  : "Download this .ahk file and run it. Press F9 while TABMIS is focused to start the automation."}
             </div>

            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(outputTab === 'dataload' ? dataloadString : ahkScript)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Copy size={16} />
                Copy
              </button>
              
              {outputTab === 'ahk' && (
                <button
                  onClick={downloadAHK}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
                >
                  <Download size={16} />
                  Download .ahk
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {showImport && (
        <ImportModal 
          onClose={() => setShowImport(false)} 
          onImport={handleImport}
        />
      )}
      
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
};

export default App;
