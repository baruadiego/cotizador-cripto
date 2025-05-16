import { z } from "zod"
import { CryptoPriceSchema, CryptoResponseSchema } from "../schemas"

export type Currency = {
    code: string,
    name: string
}
export type Pair = {
    currency: string,
    criptoCurrency: string
}

export type Cryptos = z.infer<typeof CryptoResponseSchema>

export type CryptoPrice = z.infer<typeof CryptoPriceSchema>