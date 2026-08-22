markdown# 🌐 Website

Jednoduchý popis tvojho webového projektu (napr. o čom web je, aké sú jeho hlavné ciele).

## 🚀 Technológie a balíčky
Tento projekt je postavený na modernom stacku:
* **Vite** a **TypeScript** pre rýchly frontend vývoj
* **Wrangler** pre nasadenie a správu (Cloudflare Workers / Pages)
* **Firebase** pre backend služby (Firestore, konfigurácia aplikácie)
* **Eslint** pre udržiavanie čistoty kódu

## 🛠️ Inštalácia a spustenie

Pre lokálne spustenie projektu postupuj podľa týchto krokov:

1. **Klonovanie repozitára:**
   ```bash
   git clone https://github.com
   cd Website
   ```

2. **Inštalácia závislostí:**
   Projekt používa správcu balíčkov **Bun**:
   ```bash
   bun install
   ```

3. **Nastavenie prostredia:**
   Skopíruj vzorový súbor s premennými prostredia a doplň svoje údaje:
   ```bash
   cp .env.example .env
   ```

4. **Spustenie vývojového servera:**
   ```bash
   bun run dev
   ```

## 📂 Štruktúra projektu
* `src/` – Hlavný zdrojový kód aplikácie.
* `assets/` – Statické súbory, obrázky a štýly.
* `server.ts` – Serverová časť aplikácie.
* `firestore.rules` – Bezpečnostné pravidlá pre Firebase Firestore.

## 🔒 Bezpečnosť
Ak nájdeš v projekte akúkoľvek bezpečnostnú zraniteľnosť, prečítaj si prosím náš [SECURITY.md](SECURITY.md) pre postup, ako ju bezpečne nahlásiť.
