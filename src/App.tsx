import React from "react";
import "./App.css";
import List from "./pages/List";
import Detail from "./pages/Detail";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/detail/:asset_contract_address/:token_id",
    element: <Detail />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
