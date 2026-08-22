/**
 * U.S.C TRADE // QUANTUM CIPHER ENGINE
 * Hourly Rolling Cryptographic Epoch & AES-256-GCM Payload Protection
 */

// Helper to convert buffer to base64
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Helper to convert base64 to Uint8Array
function base64ToBuffer(base64: string): Uint8Array {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Calculates the current 1-hour epoch identifier
export function getCurrentHourEpoch(): { epochId: string; epochHour: number; secondsRemaining: number; epochHash: string } {
  const now = Date.now();
  const epochHour = Math.floor(now / (3600 * 1000));
  const date = new Date(now);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  
  const epochId = `EPOCH-${yyyy}${mm}${dd}-${hh}Z`;
  const nextHourTimestamp = (epochHour + 1) * 3600 * 1000;
  const secondsRemaining = Math.max(0, Math.floor((nextHourTimestamp - now) / 1000));
  
  // Deterministic pseudo-hash of current epoch for display
  const epochHash = `0x${((epochHour * 2654435761) >>> 0).toString(16).toUpperCase().padStart(8, '0')}`;

  return { epochId, epochHour, secondsRemaining, epochHash };
}

// Derive AES-GCM 256 Key from Clearance Passphrase + Hourly Salt
async function deriveCipherKey(passphrase: string, epochId: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase.trim()),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const salt = enc.encode(`USC-369-ZAKASAJEE-${epochId}`);

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
  epochId: string;
  fingerprint: string;
  timestamp: number;
}

// Encrypt plaintext with clearance passphrase for current hourly epoch
export async function encryptSecretMessage(text: string, passphrase: string): Promise<EncryptedPayload> {
  const { epochId } = getCurrentHourEpoch();
  const key = await deriveCipherKey(passphrase, epochId);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    enc.encode(text)
  );

  // Calculate short SHA-256 fingerprint of the ciphertext
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', encryptedBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer)).slice(0, 4);
  const fingerprint = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

  return {
    ciphertext: bufferToBase64(encryptedBuffer),
    iv: bufferToBase64(iv.buffer),
    epochId,
    fingerprint: `SIG-${fingerprint}`,
    timestamp: Date.now()
  };
}

// Decrypt message using clearance passphrase (can try specified epoch or current epoch)
export async function decryptSecretMessage(payload: { ciphertext: string; iv: string; epochId: string }, passphrase: string): Promise<string> {
  try {
    const key = await deriveCipherKey(passphrase, payload.epochId);
    const iv = base64ToBuffer(payload.iv);
    const ciphertext = base64ToBuffer(payload.ciphertext);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      ciphertext
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedBuffer);
  } catch (err) {
    throw new Error('DECRYPTION FAILED: Neplatný bezpečnostný kľúč alebo vypršaná šifrovacia perióda (Epoch Mismatch).');
  }
}
