import Editor, { type BeforeMount } from "@monaco-editor/react";

const setupTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("mori", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "C8C8C8" },
      { token: "comment", foreground: "666666" },
      { token: "keyword", foreground: "E0E0E0" },
      { token: "string", foreground: "A3A3A3" },
      { token: "number", foreground: "B8B8B8" },
      { token: "type", foreground: "D4D4D4" },
    ],
    colors: {
      "editor.background": "#111111",
      "editor.foreground": "#C8C8C8",
      "editorLineNumber.foreground": "#555555",
      "editorLineNumber.activeForeground": "#AAAAAA",
      "editorCursor.foreground": "#FFFFFF",
      "editor.lineHighlightBackground": "#171717",
      "editor.selectionBackground": "#383838",
      "editor.inactiveSelectionBackground": "#282828",
      "editorIndentGuide.background1": "#252525",
      "editorIndentGuide.activeBackground1": "#505050",
      "editorGutter.background": "#111111",
      // Autocomplete popup
      "editorSuggestWidget.background": "#181818",
      "editorSuggestWidget.foreground": "#999999",
      "editorSuggestWidget.border": "#484848",
      "editorSuggestWidget.selectedBackground": "#181818",
      "editorSuggestWidget.selectedForeground": "#FFFFFF",
      "editorSuggestWidget.focusHighlightForeground": "#FFFFFF",
      "editorSuggestWidget.highlightForeground": "#FFFFFF",

      // Autocomplete details popup
      "editorHoverWidget.background": "#181818",
      "editorHoverWidget.foreground": "#C8C8C8",
      "editorHoverWidget.border": "#484848",
      "editorWidget.background": "#181818",
      "editorWidget.border": "#484848",
    },
  });
};

function CodeEditor() {
  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      defaultValue="// welcome to mori"
      theme="mori"
      beforeMount={setupTheme}
      options={{
        fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontLigatures: true,
        lineHeight: 22,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        cursorBlinking: "smooth",
        renderLineHighlight: "line",
        padding: { top: 18, bottom: 18 },
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
      }}
    />
  );
}

export default CodeEditor;
