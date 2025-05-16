import { z } from "zod"

export const CryptoResponseSchema = z.object({
    CoinInfo: z.object({
        Name: z.string(),
        FullName: z.string()
    })
})
export const CryptoCurrenciesResponseSchema = z.array(CryptoResponseSchema)

export const CryptoPriceSchema = z.object({
    IMAGEURL : z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string()
})