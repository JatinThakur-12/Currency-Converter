import { useState } from 'react'
import { InputBox } from "./components";
import useCurrencyInfo from './hooks/useCurrencyInfo'
import SwapVertIcon from '@mui/icons-material/SwapVert';



function App() {
    const [from,setFrom] = useState("usd");
    const [amount,setAmount] = useState(0);
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState("0");

    //currently it is a json object
    const currencyInfo = useCurrencyInfo(from);
    //to extract keys from json object
    const options = Object.keys(currencyInfo);

    const swap = ()=>{
        setFrom(to);
        setTo(from);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    }

    const convert = ()=>{
        setConvertedAmount((amount * currencyInfo[to]).toFixed(4));
    }

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1486748719772-dac71e23eaa1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                objectFit: 'contain'
            }}
        >
            <div className="w-full">
                <div 
                className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5" 
                style={{
                    background: 'radial-gradient(circle at left top, #000000 , #3e3e3c)'
                    }}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox 
                                label="From"
                                amount = {amount}
                                onAmountChange={(amount)=>{
                                    setAmount(amount);
                                }}
                                currencyOptions={options}
                                onCurrencyChange={(currency)=>{
                                    setFrom(currency);
                                }}
                                selectCurrency={from}
                             />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-white bg-cyan-500 rounded-full text-white px-1 py-0.5"
                                onClick={swap}
                            >
                                <SwapVertIcon/>
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox 
                                label="To"
                                amount = {convertedAmount}
                                onAmountChange={(convertedAmount)=>{
                                    setConvertedAmount(convertedAmount);
                                }}
                                currencyOptions={options}
                                onCurrencyChange={(currency)=>{
                                    setTo(currency);
                                }}
                                selectCurrency={to}

                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 text-black px-4 py-3 rounded-lg"
                        >
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default App;
