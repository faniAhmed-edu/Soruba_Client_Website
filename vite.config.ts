import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// This plugin intercepts /api/chat during local development (npm run dev)
// so you don't need to run the Vercel CLI separately.
const apiFallbackPlugin = () => ({
  name: 'api-fallback',
  configureServer(server: any) {
    // Forcefully load and OVERRIDE env variables so that changes to .env.local 
    // are picked up immediately without needing to restart the long-running dev server.
    dotenv.config({ path: '.env.local', override: true });

    server.middlewares.use('/api', (req: any, res: any, next: any) => {
      const url = req.url?.split('?')[0] || '';
      const apiName = url.replace(/^\//, '').replace(/\/$/, '');
      if (!apiName) return next();

      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk.toString();
      });
      req.on('end', async () => {
        try {
          req.body = body ? JSON.parse(body) : {};
        } catch {
          req.body = {};
        }

        // Mock Vercel response methods
        res.status = (statusCode: number) => {
          res.statusCode = statusCode;
          return res;
        };
        res.json = (data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        try {
          // Dynamically load the serverless API file from /api/[apiName].js
          const handlerModule = await server.ssrLoadModule(`/api/${apiName}.js`);
          await handlerModule.default(req, res);
        } catch (err) {
          console.error(`API Error on /api/${apiName}:`, err);
          res.status(500).json({ error: `Server error executing /api/${apiName}` });
        }
      });
    });
  }
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiFallbackPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

