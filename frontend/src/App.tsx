import { Search, X } from "lucide-react";
import { getFileIcon } from "./lib/fileIcons";
import moriLogo from "./assets/mori-no-bg.png";
import CodeEditor from "./components/CodeEditor";
import FileExplorer from "./components/FileExplorer";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// File menu
const menuItems = [
  "New File",
  "New Window",
  "Open File...",
  "Open Folder...",
  "Open Recent",
  "Save",
  "Save As...",
  "Save All",
  "Close File",
  "Close Window",
  "Exit",
];

// Edit menu
const editItems = [
  "Undo",
  "Redo",
  "Cut",
  "Copy",
  "Copy & Trim",
  "Paste",
  "Find",
  "Find and Replace",
  "Select All",
  "Duplicate Line",
  "Delete Line",
  "Toggle Comment",
];

// View menu
const viewItems = [
  "Command Palette",
  "Toggle Explorer",
  "Toggle Terminal",
  "Toggle Status Bar",
  "Toggle Minimap",
  "Toggle Word Wrap",
  "Zoom In",
  "Zoom Out",
  "Reset Zoom",
  "Enter Full Screen",
];

// Go menu
const goItems = [
  "Go to File...",
  "Go to Symbol...",
  "Go to Line...",
  "Go to Definition",
  "Go to References",
  "Go to Implementation",
  "Go Back",
  "Go Forward",
  "Next Error",
  "Previous Error",
];

// Help menu
const helpItems = [
  "Welcome",
  "Documentation",
  "Keyboard Shortcuts",
  "Release Notes",
  "Report an Issue",
  "Check for Updates",
  "About mori",
];

// Shared styling for dropdown items
const menuItemClass =
  "cursor-pointer rounded-[2px] bg-transparent px-3 py-2 text-[13px] text-[#999999] transition-colors duration-200 ease-in-out hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-[highlighted]:bg-transparent data-[highlighted]:text-white";

// Props for our reusable Menu component
type MenuProps = {
  label: string;
  items: string[];
};

// Reusable dropdown menu
function Menu({ label, items }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="transition-colors duration-200 hover:text-white">
        {label}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={5}
        className="min-w-60 rounded-[3px] border border-[#484848] bg-[#181818] p-1 text-[#dedede] shadow-xl"
      >
        {items.map((item) => (
          <DropdownMenuItem key={item} className={menuItemClass}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Top title bar

function TitleBar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="titlebar relative flex h-10 shrink-0 items-center justify-between bg-[#181818] px-3">
      <div className="left-div flex items-center gap-4">
        <img
          src={moriLogo}
          alt="mori"
          className="h-8 w-8 shrink-0 object-contain"
        />

        <div className="flex items-center gap-4 text-sm text-[#bcbcbc]">
          <Menu label="file" items={menuItems} />
          <Menu label="edit" items={editItems} />
          <Menu label="view" items={viewItems} />
          <Menu label="go" items={goItems} />
          <Menu label="help" items={helpItems} />
        </div>
      </div>

      {/* Always-visible centered search */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="flex h-7 w-80 items-center gap-2 rounded-[3px] border border-white/[0.07] bg-[#222222] px-3 transition-colors duration-150 focus-within:border-white/20">
          <Search size={14} className="shrink-0 text-[#777777]" />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="search files..."
            aria-label="Search files"
            className="min-w-0 flex-1 bg-transparent text-[12px] text-[#e8e8e8] outline-none placeholder:text-[#777777]"
          />

          <span className="shrink-0 text-[10px] text-[#666666]">
            ctrl+p
          </span>
        </div>
      </div>

      <div className="right-div flex items-center gap-3"></div>
    </header>
  );
}



type WorkspaceProps = {
  activeFile: string;
  onFileSelect: (filename: string) => void;
  openFiles: string[];
  onFileClose: (filename: string) => void;
};

type TabBarProps = {
  activeFile: string;
  openFiles: string[];
  onFileSelect: (filename: string) => void;
  onFileClose: (filename: string) => void;
};
// Main workspace
function Workspace({
  activeFile,
  openFiles,
  onFileSelect,
  onFileClose,
}: WorkspaceProps) {
  return (
    <main className="flex min-h-0 flex-1">
      <section className="editor flex min-w-0 flex-1 flex-col">
        <TabBar
          activeFile={activeFile}
          openFiles={openFiles}
          onFileSelect={onFileSelect}
          onFileClose={onFileClose}
        />
        <div className="min-h-0 flex-1">
          <CodeEditor />
        </div>
      </section>

      <section className="explorer w-72 shrink-0 border-l border-white/5 bg-[#161616]">
        <FileExplorer activeFile={activeFile} onFileSelect={onFileSelect} />
      </section>
    </main>
  );
}

// Editor tabs
function TabBar({
  activeFile,
  openFiles,
  onFileSelect,
  onFileClose,
}: TabBarProps) {
  return (
    <nav className="flex h-[34px] shrink-0 overflow-x-auto bg-[#151515]">
      {openFiles.map((filename) => (
        <div
          key={filename}
          className={`group flex h-full shrink-0 items-center text-[13px] ${
            activeFile === filename
              ? "bg-[#202020] text-[#e8e8e8]"
              : "bg-[#151515] text-[#888888]"
          }`}
        >
          <button
            onClick={() => onFileSelect(filename)}
            className="flex h-full items-center gap-2 pl-3 pr-2 hover:text-white"
          >
            <img
              src={getFileIcon(filename)}
              alt=""
              className="h-5 w-5 shrink-0 brightness-0 invert-[0.7]"
            />
            <span>{filename}</span>
          </button>

          <button
            onClick={() => onFileClose(filename)}
            aria-label={`Close ${filename}`}
            className="mr-2 rounded-[2px] p-1 text-[#777777] opacity-0 transition-opacity hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
          >
            <X size={13} />
          </button>
        </div>
      ))}
    </nav>
  );
}

// Root application // and working on lifting state up
function App() {
  const [activeFile, setActiveFile] = useState("App.tsx");
  const [openFiles, setOpenFiles] = useState<string[]>(["App.tsx"]);

  function openFile(filename: string) {
    if (!openFiles.includes(filename)) {
      setOpenFiles([...openFiles, filename]);
    }

    setActiveFile(filename);
  }

  function closeFile(filename: string) {
    const remaining = openFiles.filter((file) => file !== filename);

    setOpenFiles(remaining);

    if (activeFile === filename) {
      setActiveFile(remaining[remaining.length - 1] ?? "");
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-[#111111] text-[#e8e8e8]">
      <TitleBar />
      <Workspace
        activeFile={activeFile}
        openFiles={openFiles}
        onFileSelect={openFile}
        onFileClose={closeFile}
      />
    </div>
  );
}

export default App;
