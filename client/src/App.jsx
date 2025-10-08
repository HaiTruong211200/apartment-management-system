import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  //     <h1 className="text-4xl font-bold text-blue-600">
  //       Tailwind CSS is working! 🎉
  //     </h1>
  //   </div>
  // );
}

export default App;
