import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import { S3Client, PutObjectCommand, GetObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

// Configure Multer (memory storage for direct pass-through to R2)
const upload = multer({ storage: multer.memoryStorage() });

// Retrieve Cloudflare details
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
// Prioritize AWS_ACCESS_KEY_ID but fallback to the CLOUDFLARE_ACCESS_CLIENT_ID the user entered
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.CLOUDFLARE_ACCESS_CLIENT_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.CLOUDFLARE_ACCESS_CLIENT_SECRET;
const BUCKET_NAME = "trinity"; // Použijeme bucket, ktorý si vytvoril

// Initialize S3 Client ONLY if we have the credentials
let s3: S3Client | null = null;

if (accountId && accessKeyId && secretAccessKey) {
  s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser for API requests
  app.use(express.json());

  // ==========================================
  // 🛡️ API ROUTES (Must be defined BEFORE Vite)
  // ==========================================
  
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "U.S.C Server Running" });
  });

  // Cloudflare Status Endpoint
  app.get("/api/cloudflare/status", (req, res) => {
    res.json({ 
      status: "ok", 
      configured: !!s3,
      bucket: BUCKET_NAME
    });
  });

  // Upload Endpoint (R2 Integration)
  app.post("/api/upload", upload.single("image"), async (req: any, res: any) => {
    try {
      if (!s3) {
        return res.status(500).json({ error: "Cloudflare R2 nie je správne nakonfigurované na serveri. Chýbajú kľúče." });
      }
      
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Žiadny súbor nebol nahratý." });
      }

      // Vytvoríme unikátny názov súboru s timestampom
      const fileExtension = path.extname(file.originalname);
      const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtension}`;

      try {
        await s3.send(
          new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: uniqueFileName,
            Body: file.buffer,
            ContentType: file.mimetype,
          })
        );
      } catch (err: any) {
        // Ak bucket neexistuje, skúsime ho vytvoriť
        if (err.name === 'NoSuchBucket' || err.Code === 'NoSuchBucket') {
          console.log(`Bucket ${BUCKET_NAME} neexistuje. Vytváram ho...`);
          await s3.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }));
          
          // Zopakujeme nahrávanie
          await s3.send(
            new PutObjectCommand({
              Bucket: BUCKET_NAME,
              Key: uniqueFileName,
              Body: file.buffer,
              ContentType: file.mimetype,
            })
          );
        } else {
          throw err;
        }
      }

      // Vrátime proxy URL nášho servera, ktorý to potiahne z R2
      const imageUrl = `/api/images/${uniqueFileName}`;
      res.json({ url: imageUrl, success: true });
      
    } catch (error: any) {
      console.error("Chyba pri nahrávaní súboru:", error);
      res.status(500).json({ error: "Nepodarilo sa nahrať súbor na R2. Skontroluj práva." });
    }
  });

  // Image Serving Endpoint (Proxy pre R2)
  app.get("/api/images/:key", async (req: any, res: any) => {
    try {
      if (!s3) return res.status(404).send("R2 Client Not Configured");
      
      const { key } = req.params;
      
      const response = await s3.send(
        new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
        })
      );
      
      if (response.ContentType) {
        res.setHeader("Content-Type", response.ContentType);
      }
      
      // Node.js Stream pipeline do res (Express response)
      if (response.Body) {
         //@ts-ignore - AWS S3 Body typings in Node
        response.Body.pipe(res);
      } else {
        res.status(404).send("Image not found");
      }
    } catch (error: any) {
      // Potlačíme chyby do konzoly ak sa súbor nenájde aby to nespamovalo
      res.status(404).send("Image not found");
    }
  });

  // ==========================================
  // ⚡ VITE MIDDLEWARE (Frontend serving)
  // ==========================================
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[U.S.C] Server running on port ${PORT}`);
  });
}

startServer();
