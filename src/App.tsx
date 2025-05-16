import { useEffect } from "react";
import Form from "./components/Form";
import { useCurrencyStore } from "./stores/CurrencyStore";
import CryptoDysplay from "./components/CryptoDysplay";

function App() {
    const {fetchCryptos} = useCurrencyStore();

    useEffect(() => {
        fetchCryptos();
    }, [fetchCryptos]);
    return (
        <>
            <div className="container">
                <h1 className="head">
                    Cotizador de<span>Criptomonedas</span>
                </h1>

                <div className="form">
                    <Form></Form>
                    <CryptoDysplay></CryptoDysplay>
                </div>
            </div>
        </>
    );
}

export default App;
