import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";

function App({ children }: { children?: React.ReactNode }) {
  return <MantineProvider>{children}</MantineProvider>;
}

export default App;
