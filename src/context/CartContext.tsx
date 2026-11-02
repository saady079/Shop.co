"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number; // قیمت نهایی بعد از تخفیف
  originalPrice: number; // قیمت قبل از تخفیف
  size: string;
  color: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  loaded: boolean;
  totalQuantity: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number, size: string, color: string) => void;
  changeQuantity: (
    id: number,
    size: string,
    color: string,
    delta: number
  ) => void;
};

const STORAGE_KEY = "shop-cart";
const EMPTY: CartItem[] = [];

// ---- یک store ساده بیرون از React ----
let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return EMPTY;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): CartItem[] {
  if (cache === null) cache = readStorage();
  return cache;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function setCart(next: CartItem[]) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // اگر localStorage پر یا بسته بود، فقط در حافظه می‌ماند
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // همگام‌سازی بین تب‌ها (key === null یعنی localStorage.clear())
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      cache = readStorage();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// برای اینکه بفهمیم کلاینت هیدریت شده یا نه
const subscribeNoop = () => () => {};

const CartContext = createContext<CartContextType | null>(null);

const isSame = (a: CartItem, id: number, size: string, color: string) =>
  a.id === id && a.size === size && a.color === color;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // روی سرور false و روی کلاینت true
  const loaded = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  const totalQuantity = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const addItem = useCallback((item: CartItem) => {
    const prev = getSnapshot();
    const exists = prev.find((p) => isSame(p, item.id, item.size, item.color));
    if (exists) {
      setCart(
        prev.map((p) =>
          isSame(p, item.id, item.size, item.color)
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        )
      );
    } else {
      setCart([...prev, item]);
    }
  }, []);

  const removeItem = useCallback((id: number, size: string, color: string) => {
    setCart(getSnapshot().filter((p) => !isSame(p, id, size, color)));
  }, []);

  const changeQuantity = useCallback(
    (id: number, size: string, color: string, delta: number) => {
      setCart(
        getSnapshot().map((p) =>
          isSame(p, id, size, color)
            ? { ...p, quantity: Math.max(1, p.quantity + delta) }
            : p
        )
      );
    },
    []
  );

  const value = useMemo(
    () => ({
      items,
      loaded,
      totalQuantity,
      addItem,
      removeItem,
      changeQuantity,
    }),
    [items, loaded, totalQuantity, addItem, removeItem, changeQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}