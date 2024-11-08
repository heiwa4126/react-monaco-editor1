import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import cdn from "vite-plugin-cdn-import";
// import MonacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// MonacoEditorPlugin({
		// 	// 必要な言語ワーカーを指定
		// 	languageWorkers: ["typescript", "json"],
		// }),
		cdn({
			modules: ["react", "react-dom"],
		}),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					a: ["@monaco-editor/react"],
					b: ["monaco-editor"],
				},
			},
		},
	},
	esbuild: {
		drop: ["console", "debugger"], // https://esbuild.github.io/api/#drop
	},
});
