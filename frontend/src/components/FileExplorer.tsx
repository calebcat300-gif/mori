import { FileCode2, Folder, ChevronRight } from "lucide-react";
import { useState } from "react";

function FileExplorer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside className="flex h-full flex-col bg-[#161616] text-[#999999]">
      <div className="flex h-10 items-center px-3 text-xs tracking-wide">
        explorer
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 text-[13px]"
      >
        <ChevronRight
          size={14}
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
        <Folder size={15} />
        <span>mori</span>
      </button>
      {isOpen && (
        <div className="flex flex-col pl-8">
          <button className="flex items-center gap-2 py-1 text-[13px]">
            <FileCode2 size={14} />
            <span>App.tsx</span>
          </button>

          <button className="flex items-center gap-2 py-1 text-[13px]">
            <FileCode2 size={14} />
            <span>main.tsx</span>
          </button>
        </div>
      )}
    </aside>
  );
}

export default FileExplorer;
