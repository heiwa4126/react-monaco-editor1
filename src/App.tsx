import { useRef } from "react";
import "./App.css";

import Editor, { type OnMount } from "@monaco-editor/react";
import { type editor as MonacoEditor, Range } from "monaco-editor";

const exampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. これは日本語のテキストです。
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat. さらに日本語のテキストが続きます。Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

function App() {
	const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor>();
	// エディタがマウントされたときにインスタンスを取得
	const handleEditorDidMount: OnMount = (editor, _monaco) => {
		console.log(editor);
		editorRef.current = editor;
	};

	function showValue() {
		if (editorRef.current) {
			console.log(editorRef.current.getValue());
		}
	}

	// エラーデコレーションを追加する関数
	const addErrorDecoration = () => {
		if (editorRef.current) {
			const decorations = [
				{
					range: new Range(2, 3, 2, 10), // エラー範囲（行、列で指定）
					options: {
						isWholeLine: false,
						className: "myErrorDecoration",
						inlineClassName: "myErrorDecorationInline",
						glyphMarginClassName: "myErrorGlyphMargin",
						hoverMessage: { value: "This is an error" },
					},
				},
			];

			editorRef.current.deltaDecorations([], decorations);
		}
	};

	return (
		<>
			<div
				style={{
					border: "2px solid #ccc",
					borderRadius: "4px",
					transition: "border-color 0.2s ease",
				}}
			>
				<Editor
					height="45vh"
					defaultLanguage="plaintext"
					defaultValue={exampleText}
					onMount={handleEditorDidMount}
					options={{
						minimap: { enabled: false },
						lineNumbers: "on",
						fontSize: 18,
						lineHeight: 27,
					}}
				/>
			</div>

			<button type="button" onClick={() => showValue()}>
				Show value
			</button>
			<button type="button" onClick={() => addErrorDecoration()}>
				Show error decoration
			</button>
		</>
	);
}

export default App;
