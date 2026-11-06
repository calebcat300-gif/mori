import { Folder, ChevronRight } from "lucide-react";
import { useState } from "react";

// map file extensions to downloaded icons
const fileIcons: Record<string, string> = {
  tsx: "react_ts",
  ts: "typescript",
  jsx: "react",
  js: "javascript",
  rs: "rust",
  cpp: "cpp",
  cc: "cpp",
  hpp: "cpp",
  c: "c",
  h: "c",
  py: "python",
  json: "json",
  css: "css",
  html: "html",
  md: "markdown",
};

// choose the icon based on file extension
function getFileIcon(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  const icon = fileIcons[extension] ?? "file";

  return `/icons/${icon}.svg`;
}

// temporary files until we connect the real filesystem
const files = [
  "App.tsx",
  "main.tsx",
  "index.css",
  "package.json",
  "vite.config.ts",
];

function FileExplorer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("App.tsx");

  return (
    <aside className="flex h-full flex-col bg-[#161616] text-[#999999]">
      <div className="flex h-10 shrink-0 items-center px-3 text-xs tracking-wide">
        explorer
      </div>

      {/* root folder */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 text-left text-[13px] transition-colors duration-200 hover:text-white"
      >
        <ChevronRight
          size={14}
          className={`shrink-0 transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />

        <Folder size={15} className="shrink-0" />
        <span>mori</span>
      </button>

      {/* files */}
      {isOpen && (
        <div className="flex flex-col pl-8">
          {files.map((filename) => (
            <button
              key={filename}
              type="button"
              onClick={() => setSelectedFile(filename)}
              className={`flex items-center gap-2 py-1 text-left text-[13px] transition-colors duration-200 ease-in-out hover:text-white ${
                selectedFile === filename ? "text-[#e8e8e8]" : "text-[#999999]"
              }`}
            >
              <img
                src={getFileIcon(filename)}
                alt=""
                className="h-5 w-5 shrink-0 brightness-0 invert-[0.7]"
                onError={(event) => {
                  event.currentTarget.src = "/icons/file.svg";
                }}
              />

              <span className="truncate">{filename}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default FileExplorer;
