import { useRef } from "react";
import "./App.css";

import Editor, { loader, type OnChange, type OnMount } from "@monaco-editor/react";
// import * as monaco from "monaco-editor";
import { KeyCode, KeyMod, editor as MonacoEditor, Range as MonacoRange } from "monaco-editor";

loader.config({
	"vs/nls": {
		availableLanguages: {
			"*": "ja",
		},
	},
});

const exampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. これは日本語のテキストです。
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.
 さらに日本語のテキストが続きます。Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

function App() {
	const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor>();
	// const [decorationIds, setDecorationIds] = useState<string[]>([]);
	const decorationsRef = useRef<MonacoEditor.IEditorDecorationsCollection>();
	// const monacoRef = useRef<Monaco | null>(null);

	// エディタがマウントされたときにインスタンスを取得
	//const handleEditorDidMount: OnMount = (editor, monaco) => {
	const handleEditorDidMount: OnMount = (editor) => {
		console.log(editor);
		editorRef.current = editor;
		// monacoRef.current = monaco;

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

	// // エラーデコレーションを追加する関数
	// const addErrorDecoration = () => {
	// 	if (editorRef.current && monacoRef.current) {
	// 		const monaco = monacoRef.current;
	// 		const model = editorRef.current.getModel();
	// 		if (model) {
	// 			const markers = [
	// 				{
	// 					startLineNumber: 2,
	// 					startColumn: 3,
	// 					endLineNumber: 2,
	// 					endColumn: 10,
	// 					message: "This is an error",
	// 					severity: monaco.MarkerSeverity.Error,
	// 				},
	// 			];
	// 			monaco.editor.setModelMarkers(model, "owner", markers);
	// 		}
	// 	}
	// };

	// // エラーデコレーションをリセットする関数
	// const resetErrorDecoration = () => {
	// 	if (editorRef.current && monacoRef.current) {
	// 		const monaco = monacoRef.current;
	// 		const model = editorRef.current.getModel();
	// 		if (model) {
	// 			monaco.editor.setModelMarkers(model, "owner", []);
	// 		}
	// 	}
	// };

	// // エラーデコレーションを追加する関数 (deltaDecorations()が非推奨)
	// // 使うとビルドサイズが30倍ぐらい増える
	// const addErrorDecoration = () => {
	// 	if (editorRef.current) {
	// 		const decorations = [
	// 			{
	// 				range: new MonacoRange(2, 3, 2, 10), // エラー範囲（行、列で指定）
	// 				options: {
	// 					isWholeLine: false,
	// 					className: "myErrorDecoration",
	// 					inlineClassName: "myErrorDecorationInline",
	// 					glyphMarginClassName: "myErrorGlyphMargin",
	// 					hoverMessage: { value: "This is an error" },
	// 				},
	// 			},
	// 		];
	// 		const newDecorationIds = editorRef.current.deltaDecorations(decorationIds, decorations);
	// 		setDecorationIds(newDecorationIds);
	// 	}
	// };
	// const resetErrorDecoration = () => {
	// 	if (editorRef.current) {
	// 		const clearedDecorationIds = editorRef.current.deltaDecorations(decorationIds, []);
	// 		setDecorationIds(clearedDecorationIds);
	// 	}
	// };

	// デコレーションコレクションを追加する関数
	// ただしこっちを使うとビルドサイズが30倍ぐらい増える
	const addErrorDecoration = () => {
		if (editorRef.current && decorationsRef.current) {
			const newDecorations: MonacoEditor.IModelDeltaDecoration[] = [
				{
					range: new MonacoRange(2, 3, 2, 10), // エラー範囲（行、列で指定）
					options: {
						isWholeLine: false,
						className: "myErrorDecoration",
						inlineClassName: "myErrorDecorationInline",
						glyphMarginClassName: "myErrorGlyphMargin",
						hoverMessage: { value: "This is an error" },
						overviewRuler: {
							position: MonacoEditor.OverviewRulerLane.Left, // スクロールバー上に表示
							color: "rgba(255,0,0,0.7)", // マークの色
						},
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
