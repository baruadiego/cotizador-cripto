import { ChangeEvent, FormEvent, useState } from "react";
import { currencies } from "../data/currency";
import { useCurrencyStore } from "../stores/CurrencyStore";
import { Pair } from "../types";

export default function Form() {
    const {cryptos, fetchData} = useCurrencyStore()
    const [pair, setPair] = useState<Pair>({currency: '', criptoCurrency: ''})

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData(pair)
    }

    const disabledSubmit = Object.values(pair).includes('')

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="currency">
                moneda:
            </label>
            <select 
                name="currency" 
                id="currency" 
                value={pair.currency}
                onChange={handleChange}
            >
                <option value="" disabled>--Seleccione una opción--</option>
                {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.name}</option>
                ))}
            </select>

            <label htmlFor="criptoCurrency">
                cripto:
            </label>
            <select 
                name="criptoCurrency" 
                id="criptoCurrency" 
                value={pair.criptoCurrency}
                onChange={handleChange}
            >
                <option value="" disabled>--Seleccione una opción--</option>
                {cryptos.map(crypto => (
                    <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>{crypto.CoinInfo.FullName}</option>
                ))}
            </select>

            <input type="submit" value="Cotizar" disabled={disabledSubmit}/>
        </form>
    );
}
