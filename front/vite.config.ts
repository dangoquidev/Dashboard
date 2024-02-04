import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		emptyOutDir: true,
	},
	plugins: [react()],
	server: {
		host: true,
		port: 8081,
		hmr: {
			host: "localhost",
			port: 8081,
		},
	},
	preview: { host: true, port: 8081 },
});
