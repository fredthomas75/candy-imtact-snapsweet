"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/fr";

type DictContextValue = {
  locale: Locale;
  dict: Dictionary;
};

const DictionaryContext = createContext<DictContextValue | null>(null);

export function DictionaryProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={{ locale, dict }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDict() {
  const ctx = useContext(DictionaryContext);
  if (!ctx) {
    throw new Error("useDict must be used inside a DictionaryProvider");
  }
  return ctx;
}
