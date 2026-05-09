import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Proxy to bypass CORS and Mixed Content issues
  // The backend airadvisor.runasp.net is HTTP only, but AI Studio is HTTPS.
  app.all("/api/*", async (req, res) => {
    // Construct the backend URL
    const targetUrl = `http://airadvisor.runasp.net${req.originalUrl}`;
    
    console.log(`Proxying ${req.method} request to: ${targetUrl}`);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Host': 'airadvisor.runasp.net',
      };

      if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization as string;
      }

      const response = await fetch(targetUrl, {
        method: req.method,
        headers: headers,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.text();
      
      // Forward the status and response
      res.status(response.status);
      
      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('content-type', contentType);
      }
      
      res.send(data);
    } catch (error: any) {
      console.error("Proxy error:", error);
      res.status(500).json({ 
        error: "Failed to proxy request", 
        details: error.message,
        target: targetUrl 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
