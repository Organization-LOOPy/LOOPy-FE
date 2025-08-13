import { useEffect, useRef, useState } from "react";
import { loadDraft, saveDraft, clearDraft } from "../../utils/draftStorage";
import type { BasicInfoForm } from "../../types/basicInfo";

export const useDraft = (initial: BasicInfoForm) => {
  const STORAGE_KEY = "loopy:admin:basicInfo:draft";
  const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

  const [form, setForm] = useState<BasicInfoForm>(initial);
  const [hydrated, setHydrated] = useState(false);
  const [dirty, setDirty] = useState(false);

  const latestFormRef = useRef(form);
  const dirtyRef = useRef(dirty);
  useEffect(() => { latestFormRef.current = form; }, [form]);
  useEffect(() => { dirtyRef.current = dirty; }, [dirty]);

  useEffect(() => {
    const restored = loadDraft<BasicInfoForm>(STORAGE_KEY, DRAFT_TTL_MS);
    if (restored) {
      setForm(restored);
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const t = setTimeout(() => {
      saveDraft(STORAGE_KEY, latestFormRef.current);
      setDirty(false);
    }, 500);
    return () => clearTimeout(t);
  }, [form, dirty]);

  useEffect(() => {
    const flush = () => saveDraft(STORAGE_KEY, latestFormRef.current);
    const onVisibility = () => { if (document.hidden) flush(); };
    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", onVisibility);
      flush();
    };
  }, []);

  const setField = <K extends keyof BasicInfoForm>(key: K) => (v: BasicInfoForm[K]) => {
    setForm(prev => ({ ...prev, [key]: v }));
    setDirty(true);
  };

  const clearDraftAfterServerSave = () => clearDraft(STORAGE_KEY);

  return { form, setForm, setField, hydrated, dirtyRef, latestFormRef, clearDraftAfterServerSave, setDirty };
};
