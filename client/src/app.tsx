import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <>
      <Toaster />
      <AppRoutes />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
};

export default App;
