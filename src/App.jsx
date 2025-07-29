import "./App.css";
import AllTask from "./pages/allTasks";
import CompletedTask from "./pages/completedTask";
import Home from "./pages/home";
import { Routes, Route } from "react-router";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<AllTask />} />
                    <Route path="completed" element={<CompletedTask />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
