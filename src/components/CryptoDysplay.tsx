import { useCurrencyStore } from "../stores/CurrencyStore";
import Spinner from "./Spinner";

export default function CryptoDysplay() {
    const { cryptoPrice, loading } = useCurrencyStore();
    return (
        <>
            {loading ? 
                (<Spinner />) 
            : 
                (cryptoPrice.PRICE && (
                    <>
                        <h3 className="head-crypto">Cotización</h3>
                        <div className="result-wrapper">
                            <img
                                src={`https://www.cryptocompare.com${cryptoPrice.IMAGEURL}`}
                                alt=""
                            />
                            <div className="price">
                                <p>El precio es de:{" "} <span>{cryptoPrice.PRICE}</span></p>
                                <p>Precio más alto del día:{" "} <span>{cryptoPrice.HIGHDAY}</span></p>
                                <p>Precio más bajo del día:{" "} <span>{cryptoPrice.LOWDAY}</span> </p>
                                <p>Variación últimas 24 horas:{" "} <span>{cryptoPrice.CHANGEPCT24HOUR}</span></p>
                                <p>Última actualización:{" "} <span>{cryptoPrice.LASTUPDATE}</span></p>
                            </div>
                        </div>
                    </>
                )
            )}
        </>
    );
}
