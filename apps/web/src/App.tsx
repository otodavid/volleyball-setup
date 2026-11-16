import { Route, Routes } from "react-router"
import { Home } from "./components/Home"
import { Dashboard } from "./dashboard"

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
