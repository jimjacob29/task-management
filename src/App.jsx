import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router";

const Home = lazy(() => import("./pages/home"));
const AllTask = lazy(() => import("./pages/allTasks"));
const CompletedTask = lazy(() => import("./pages/completedTask"));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<AllTask />} />
                    <Route path="completed" element={<CompletedTask />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
