import { Suspense } from "react";
import AppRoutes from "./AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Toaster position="top-right" />
      <AppRoutes />
    </Suspense>
  );
}

export default App;