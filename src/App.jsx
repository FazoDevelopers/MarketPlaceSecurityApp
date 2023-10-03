import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import AdminMain from "./pages/AdminMain";

export default function App() {
  return (
    <RecoilRoot>
      <div style={{ minHeight: "85vh" }} className="px-3">
        <AdminMain />
      </div>
    </RecoilRoot>
  );
}
