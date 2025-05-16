import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { z } from "zod";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema, CryptoResponseSchema } from "../schemas";
import { Pair } from "../types";

type CurrencyStore = {
    cryptos: z.infer<typeof CryptoResponseSchema>[];
    cryptoPrice: z.infer<typeof CryptoPriceSchema>;
    loading: boolean;
    fetchCryptos: () => Promise<void>;
    fetchData: (data: Pair) => Promise<void>;
};

const getCryptos = async () => {
    const url = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=20&tsym=USD'

    const {data: { Data }} = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)

    if(result.success){
        return result.data
    }
}

const getCryptoPrice = async (data: Pair) => {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${data.criptoCurrency}&tsyms=${data.currency}`
    
    const { data: { DISPLAY } } = await axios(url)
    const result = CryptoPriceSchema.safeParse(DISPLAY[data.criptoCurrency][data.currency])

    if(result.success) {
        return result.data
    }
}

export const useCurrencyStore = create<CurrencyStore>()(
    devtools((set)=>({
        cryptos: [],
        cryptoPrice: {} as z.infer<typeof CryptoPriceSchema>,
        loading: false,
        fetchCryptos: async () => {
            const cryptos = await getCryptos();
            set((state) => ({
                ...state,
                cryptos: cryptos
            }))
        },
        fetchData: async (data: Pair) => {
            set((state) => ({
                ...state,
                loading: true
            }))
            const cryptos = await getCryptoPrice(data);
            set((state) => ({
                ...state,
                cryptoPrice: cryptos,
                loading: false
            }))
        }
    }))
)