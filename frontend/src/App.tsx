import moriLogo from "./assets/mori-no-bg.png";
import CodeEditor from "./components/CodeEditor";
import FileExplorer from "./components/FileExplorer";
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
  return (
    <header className="titlebar flex h-10 shrink-0 items-center justify-between bg-[#181818] px-3">
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

      <div className="right-div flex items-center gap-3"></div>
    </header>
  );
}

// Main workspace
function Workspace() {
  return (
    <main className="flex min-h-0 flex-1">
      <section className="editor flex min-w-0 flex-1 flex-col">
        <TabBar />
        <div className="min-h-0 flex-1">
          <CodeEditor />
        </div>
      </section>

      <section className="explorer w-72 shrink-0 border-l border-white/5 bg-[#161616]">
        <FileExplorer />
      </section>
    </main>
  );
}

// Current file
const file: string = "App.tsx";

// Editor tabs
function TabBar() {
  return (
    <nav className="flex h-[34px] shrink-0 bg-[#151515]">
      <div className="flex h-full items-center bg-[#202020] px-3">{file}</div>
    </nav>
  );
}

// Root application
function App() {
  return (
    <div className="flex h-screen w-screen flex-col bg-[#111111] text-[#e8e8e8]">
      <TitleBar />
      <Workspace />
    </div>
  );
}

export default App;
