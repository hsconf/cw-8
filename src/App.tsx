import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import NewQuote from "./containers/NewQuote/NewQuote";
import EditQuote from "./containers/EditQuote/EditQuote";

const App = () => {
    return (
        <>
            <header>
                <Toolbar />
            </header>
            <main className="container-fluid">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/newquote" element={<NewQuote />} />
                    <Route path="/category/:categoryId" element={<Home />} />
                    <Route path="/edit/:quoteId" element={<EditQuote />} />
                </Routes>
            </main>
        </>
    )
};

export default App;
