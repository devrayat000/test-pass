import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Children } from "react";

function App({ children }: { children?: React.ReactChild }) {
  return <MantineProvider>{Children.only(children)}</MantineProvider>;
}

export default App;
