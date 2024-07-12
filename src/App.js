import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    {
      path: "/detail",
      element: <WalletPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
