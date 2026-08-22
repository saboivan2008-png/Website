import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import { S3Client, PutObjectCommand, GetObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

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
  // 🧠 A.I. MATRIX DISPATCH & COPILOT ENDPOINTS (Gemini 3.7 Flash)
  // ==========================================
  
  // Universal Matrix AI Copilot Chat (Multi-pillar aware)
  app.post("/api/ai/dispatch", async (req: any, res: any) => {
    try {
      const { message, context, mode, conversationHistory } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Chýba správa pre AI Matrix." });
      }

      const systemInstruction = `Si AURU MATRIX DISPEČING (U.S.C. Artificial Intelligence Core 3.69) - hlavný centrálny mozog a operačný dispečer ekosystému Underground Street Collective.

Tvvojou úlohou je poskytovať vysoko profesionálnu, inteligentnú a okamžitú asistenciu pre všetkých 6 pilierov:
1. A.I. AURU_TRINITY: Digitálna dielňa, softvérový vývoj, automatizácia účtovníctva, mzdová matrica, lead hunter.
2. U.S.W. (Underground Street Wear): Streetwear kolekcie, streetwear merch, Choice Is Yours, Queens edition, objednávky.
3. RENT A WHEEL: Autopožičovňa, kuriérske a taxi flotily (Bolt/Wolt/Uber), výpočet trás, spotreby, amortizácie a nákladov.
4. U.S.C. WORK: Personálna agentúra, nemecké/rakúske turnusy, remeselníci, elektrikári, zvárači, zmluvy, formuláre A1, overovanie certifikátov.
5. TRADE ZAKASAJEE: Zabezpečená B2B logistika, konvoje, prepravné manifesty, šifrované eskró operácie, colné a tranzitné trasy.
6. U.S.C. SOLIDARITY: Komunitná pomoc, charita, transparentný street fond solidarity.

AKTUÁLNY REŽIM OPERÁTORA: ${mode || 'GENERAL_DISPATCH'}
KONTEXT RELÁCIE: ${JSON.stringify(context || {})}

PRAVIDLÁ ODPOVEDÍ:
- Vystupuj sebavedomo, presne, s hlbokou znalosťou biznis logiky, účtovníctva, logistiky a remeselných prác.
- Odpovedaj v slovenskom jazyku (ak ťa používateľ neosloví iným jazykom).
- Formátuj odpoveď prehľadne pomocou odrážok, tučného písma a číselných kalkulácií.
- Ak ide o výpočet (trasa, mzda, rentabilita, úspora), vždy uveď konkrétny prepočet s číslami.`;

      // Build chat prompt or multi-turn history
      let promptPayload = message;
      if (conversationHistory && Array.isArray(conversationHistory) && conversationHistory.length > 0) {
        const formattedHistory = conversationHistory
          .slice(-6)
          .map((h: any) => `${h.role === 'user' ? 'OPERÁTOR' : 'AURU MATRIX'}: ${h.text}`)
          .join('\n');
        promptPayload = `HISTÓRIA KONVERZÁCIE:\n${formattedHistory}\n\nNOVÁ POŽIADAVKA OPERÁTORA:\n${message}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: promptPayload,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Matrix nezaznamenal výstup. Prosím zopakujte príkaz.";
      return res.json({ 
        success: true, 
        reply: replyText,
        timestamp: new Date().toISOString() 
      });

    } catch (error: any) {
      console.error("[Matrix AI Dispatch Error]:", error);
      return res.status(500).json({ 
        error: "Chyba pri spracovaní v Auru Matrix AI.", 
        details: error?.message || "Server Error" 
      });
    }
  });

  // Dedicated Route & Cost Calculation Engine
  app.post("/api/ai/calculate-route", async (req: any, res: any) => {
    try {
      const { origin, destination, vehicleType, cargoWeightKg, fuelPricePerLiter, tollsIncluded } = req.body;

      const prompt = `Vykonaj precízny logistický a flotilový rozbor trasy:
- Štart: ${origin || 'Bratislava'}
- Cieľ: ${destination || 'Mníchov'}
- Vozidlo: ${vehicleType || 'Dodávka L3H2 (Rent a Wheel)'}
- Hmotnosť nákladu: ${cargoWeightKg || 650} kg
- Cena paliva: €${fuelPricePerLiter || 1.62}/liter
- Mýtne poplatky zahrnúť: ${tollsIncluded !== false ? 'ÁNO' : 'NIE'}

Vypočítaj:
1. Odhadovanú vzdialenosť (km) a čas jazdy.
2. Spotrebu paliva a celkové náklady na naftu/benzín.
3. Mýtne poplatky (GO-Box Rakúsko / Toll Collect Nemecko / SK mýto).
4. Odporúčanú minimálnu fakturačnú cenu pre klienta (s maržou U.S.C. 20-30%).
5. Analýzu rizík a odporúčané tranzitné zastávky.

Vráť odpoveď štruktúrovanú, prehľadnú s konkrétnymi sumami v EUR.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction: "Si špičkový medzinárodný logistický dispečer pre flotilu Rent a Wheel a Trade Zakasajee.",
          temperature: 0.2,
        }
      });

      return res.json({
        success: true,
        calculation: response.text,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("[Route Calc Error]:", error);
      return res.status(500).json({ error: "Nepodarilo sa vypočítať trasu cez AI." });
    }
  });

  // Worker Match & A1 Verification Engine
  app.post("/api/ai/match-worker", async (req: any, res: any) => {
    try {
      const { profession, experienceYears, languageLevel, certifications, locationPreference, availableFrom } = req.body;

      const prompt = `Analyzuj profil uchádzača pre U.S.C. Work:
- Profesia: ${profession}
- Prax: ${experienceYears} rokov
- Jazyk (Nemecký/Anglický): ${languageLevel}
- Certifikáty a vyhlášky: ${certifications || 'Základná vyhláška'}
- Preferovaná lokalita: ${locationPreference || 'Nemecko / Rakúsko'}
- Nástup možný od: ${availableFrom || 'Ihneď'}

Poskytni:
1. Vhodnosť profilu a odporúčané turnusy (napr. 3+1, 4+1 týždne).
2. Odhadovanú hodinovú sadzbu na živnosť (v EUR/hod) a mesačný čistý príjem.
3. Zoznam chýbajúcich alebo potrebných dokumentov (Formulár A1, Freistellung, SCC certifikát, BOZP).
4. Odporúčanie pre dispečera U.S.C. Work.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction: "Si hlavný náborový špecialista a koordinátor zahraničných projektov personálnej agentúry U.S.C. Work.",
          temperature: 0.3,
        }
      });

      return res.json({
        success: true,
        matchingReport: response.text,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("[Worker Match Error]:", error);
      return res.status(500).json({ error: "Nepodarilo sa analyzovať profil uchádzača." });
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
