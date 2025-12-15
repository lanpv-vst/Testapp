import React from 'react';
import { X, FileCode, Keyboard, Zap, LayoutGrid } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Hướng dẫn sử dụng TABMIS AutoGen</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-8">
          
          {/* Step 1: Input */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700 mb-3">
              <LayoutGrid size={20} />
              1. Nhập liệu (Input)
            </h3>
            <div className="pl-4 border-l-2 border-blue-100 space-y-2 text-gray-700">
              <p>Bạn có 2 cách để nhập dữ liệu giao dịch:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Thủ công:</strong> Nhấn nút <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium">Add Row</span> và nhập trực tiếp vào bảng lưới.</li>
                <li><strong>AI Import:</strong> Nhấn nút <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-medium">AI Import</span>. Dán nội dung văn bản bất kỳ (email, tin nhắn, danh sách thô). AI sẽ tự động phân tích và điền vào bảng.</li>
              </ul>
            </div>
          </section>

          {/* Step 2: Choose Method */}
          <section>
             <h3 className="flex items-center gap-2 text-lg font-semibold text-green-700 mb-3">
              <Zap size={20} />
              2. Chọn phương thức chạy (Automation)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Method A: DataLoad */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FileCode size={16} />
                  Cách 1: Dùng DataLoad (Cổ điển)
                </h4>
                <ol className="list-decimal pl-5 text-sm space-y-2 text-gray-600">
                  <li>Ở khung bên phải, chọn tab <strong>DataLoad Code</strong>.</li>
                  <li>Nhấn <strong>Copy</strong>.</li>
                  <li>Mở phần mềm <strong>DataLoad</strong> truyền thống.</li>
                  <li>Dán (Paste) vào ô đầu tiên của bảng DataLoad.</li>
                  <li>Chạy DataLoad như bình thường.</li>
                </ol>
              </div>

              {/* Method B: AutoHotKey */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-bold text-green-900 flex items-center gap-2 mb-2">
                  <Keyboard size={16} />
                  Cách 2: Dùng AutoHotKey (Hiện đại)
                </h4>
                <ol className="list-decimal pl-5 text-sm space-y-2 text-green-800">
                  <li>Cần cài đặt <a href="https://www.autohotkey.com/" target="_blank" className="underline font-medium hover:text-green-600">AutoHotKey v1.1+</a>.</li>
                  <li>Ở khung bên phải, chọn tab <strong>AutoHotKey Script</strong>.</li>
                  <li>Nhấn <strong>Download .ahk</strong> để tải file về máy.</li>
                  <li>Chạy file vừa tải (biểu tượng chữ H màu xanh ở khay hệ thống).</li>
                  <li>Mở TABMIS, đặt con trỏ chuột vào ô nhập liệu đầu tiên (Số bút toán).</li>
                  <li>Nhấn phím <strong>F9</strong> để bắt đầu tự động nhập.</li>
                  <li>Nhấn <strong>Esc</strong> nếu muốn dừng khẩn cấp.</li>
                </ol>
              </div>
            </div>
          </section>

           {/* Step 3: Tips */}
           <section>
            <h3 className="text-lg font-semibold text-orange-700 mb-2">
              Lưu ý quan trọng
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li><strong>Tắt bộ gõ Tiếng Việt (Unikey/EVKey)</strong> hoặc chuyển sang chế độ <strong>Tiếng Anh (E)</strong> trước khi chạy script để tránh lỗi gõ sai ký tự trong TABMIS.</li>
              <li>Nếu máy tính chạy chậm hoặc mạng lag, hãy mở file `.ahk` bằng Notepad và tăng các chỉ số `Sleep` (thời gian chờ) lên cao hơn.</li>
              <li>Kiểm tra kỹ dữ liệu trên bảng lưới trước khi chạy.</li>
            </ul>
          </section>

        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
