import { Toaster } from "react-hot-toast";
import { Investimentos } from "./pages/Investimentos";

function App() {
    return (
        <>
            <Investimentos />
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
}

export default App;
