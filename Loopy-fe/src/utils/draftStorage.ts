export function saveDraft<T>(key: string, form: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ form, updatedAt: Date.now() }));
  } catch {}
}

export function loadDraft<T>(key: string, ttlMs: number): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { form?: T; updatedAt?: number };
    if (!parsed.form || !parsed.updatedAt) return null;
    if (Date.now() - parsed.updatedAt > ttlMs) return null;
    return parsed.form;
  } catch {
    return null;
  }
}

export function clearDraft(key: string) {
  try { localStorage.removeItem(key); } catch {}
}
