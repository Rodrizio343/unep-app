import { createContext } from "react";

export default AppContext = createContext({
    moneda: "",
    handleSetMoneda: (value) => value,
})