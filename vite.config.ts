import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({command}) =>({
    base: command === 'build' ? '/PassDefect/' : '/',
	plugins: [
		react()
	],
	server: {
		port: 3000,
		open: true
	},
	build: {
        outDir: 'build', // Changes the output directory from 'dist' to 'build'
        emptyOutDir: true, // Clears the directory before each build (recommended)
		manifest: true,
        // If an asset file like (images) whose size is less than 4kb(Default size for vite)
        // is marked as an inline element and convert it into base64 format so that
        // It loads without sending a request
        assetsInlineLimit: 0, // 0kb, set as your minimum file size
	}
}));