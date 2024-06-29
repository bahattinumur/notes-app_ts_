import { useEffect, useState } from "react";

/*
    ! Custom Hook
    * React hooklarına benzer şekilde görev yapan
    * Projenin ihtiyacına göre kendimiz oluşturduğumuz
    * Görevini bizim belirlediğimiz hooklardır
    * Genelde veriyi ve veriyi güncelleyecek fonksiyonu dizi içinde dönerler.
*/
export function useLocaleStorage<T>(key: string, initialValue: T) {
  //* 1.Adım: State'i Tanımla
  const [value, setValue] = useState<T>(() => {
    //* 2.Adım: Local-Storagedan verileri al
    const jsonValue = localStorage.getItem(key);
    //* 3.Adım: Local-Storageda eleman yoksa InitialValue tanımla
    if (jsonValue === null) {
      return initialValue;
    } else {
      //* 4.Adım: Local-Storegada eleman varsa local'deki veriyi state aktar
      return JSON.parse(jsonValue);
    }
  });
  //* 5.Adım: State her değiştiğinde localStorega'i güncelle
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //* 6.Adım: Hook'un kullanılması için state'i ve değiştirme methodunu return et
  return [value, setValue] as [T, typeof setValue];
}
