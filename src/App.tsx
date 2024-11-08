import { useRef } from "react";
import "./App.css";

import Editor, { type OnChange, type OnMount } from "@monaco-editor/react";
import { KeyCode, KeyMod, type editor as MonacoEditor, Range } from "monaco-editor";

const exampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. これは日本語のテキストです。
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.
 さらに日本語のテキストが続きます。Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

function App() {
	const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor>();
	const decorationsRef = useRef<MonacoEditor.IEditorDecorationsCollection>();
	// エディタがマウントされたときにインスタンスを取得
	const handleEditorDidMount: OnMount = (editor, _monaco) => {
		console.log(editor);
		editorRef.current = editor;

		// デコレーションコレクションを作成
		decorationsRef.current = editor.createDecorationsCollection([]);

		// Ctrl + EnterにReactの関数をバインド
		editor.addCommand(KeyMod.CtrlCmd | KeyCode.Enter, () => {
			showValue(); // Ctrl + Enterが押された時に呼び出される関数
		});
	};

	function showValue() {
		if (editorRef.current) {
			console.log(editorRef.current.getValue());
		}
	}

	// エディタのテキストが変更されたときに呼ばれる関数
	const handleEditorChange: OnChange = (value) => {
		console.log("Editor content changed:", value);
	};

	// // エラーデコレーションを追加する関数 (deltaDecorations()が非推奨)
	// const addErrorDecoration = () => {
	// 	if (editorRef.current) {
	// 		const decorations = [
	// 			{
	// 				range: new Range(2, 3, 2, 10), // エラー範囲（行、列で指定）
	// 				options: {
	// 					isWholeLine: false,
	// 					className: "myErrorDecoration",
	// 					inlineClassName: "myErrorDecorationInline",
	// 					glyphMarginClassName: "myErrorGlyphMargin",
	// 					hoverMessage: { value: "This is an error" },
	// 				},
	// 			},
	// 		];
	// 		editorRef.current.deltaDecorations([], decorations);
	// 	}
	// };

	// デコレーションコレクションを追加する関数
	const addErrorDecoration = () => {
		if (editorRef.current && decorationsRef.current) {
			const newDecorations: MonacoEditor.IModelDeltaDecoration[] = [
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

			// デコレーションコレクションを更新
			decorationsRef.current.set(newDecorations);
		}
	};
	const resetErrorDecoration = () => {
		if (editorRef.current && decorationsRef.current) {
			// デコレーションコレクションを更新
			decorationsRef.current.set([]);
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
					onChange={handleEditorChange}
					options={{
						minimap: { enabled: false },
						lineNumbers: "on",
						fontSize: 18,
						lineHeight: 27,
					}}
				/>
			</div>

			<button type="button" onClick={() => showValue()}>
				Show value (console.log())
			</button>
			<button type="button" onClick={() => addErrorDecoration()}>
				Show error decoration
			</button>
			<button type="button" onClick={() => resetErrorDecoration()}>
				Reset error decoration
			</button>
		</>
	);
}

export default App;
