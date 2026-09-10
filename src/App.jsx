import AuthInitializer from "./components/AuthInitializer/AuthInitializer";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthInitializer>
      <Navbar/>
      <AppRoutes />
    </AuthInitializer>
  );
}

export default App;
