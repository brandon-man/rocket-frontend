import Home from "../src/components/Home";
import Meta from "../src/components/Meta";
import NavContainer from "../src/components/Nav/NavContainer.js";

export default function App() {
  return (
    <NavContainer>
      <Meta />
      <Home />
    </NavContainer>
  );
}
