import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env variables based on the current mode (development, production, etc.)
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            host: '0.0.0.0', // Use the host from the env variable or default to localhost
            port: parseInt(env.VITE_PORT) || 3000, // Optional: Add this if you want to set the port from env as well
            proxy: {
                '/api': {
                    target: env.VITE_API_URL || 'http://localhost:3000/api', // Access VITE_API_URL using loadEnv
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
});

