import { ConectaVendasProvider } from "@/Provider";
import NavigationConectaVendas from "./src/navigation";

// componente que representa o entripoint do app
const App = () => {

  return (
    <ConectaVendasProvider>
      <NavigationConectaVendas />
    </ConectaVendasProvider>
  );
}

export default App;