import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "./Kambaz/store";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}
