import * as fs from 'fs';
import * as path from 'path';

const CACHE_DIR = '.cache';
const CACHE_FILE = path.join(CACHE_DIR, 'link-metadata.json');

interface CachedMetadata {
  [url: string]: {
    title: string;
    description: string;
    image: string | null;
    cachedAt: string;
  };
}

export function loadCache(): CachedMetadata {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('Failed to load metadata cache:', error);
  }
  return {};
}

export function saveToCache(url: string, metadata: { title: string; description: string; image: string | null }) {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    
    const cache = loadCache();
    cache[url] = {
      ...metadata,
      cachedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    console.log(`Cached metadata for: ${url}`);
  } catch (error) {
    console.warn('Failed to save metadata to cache:', error);
  }
}

export function getCachedMetadata(url: string) {
  const cache = loadCache();
  return cache[url] || null;
}
