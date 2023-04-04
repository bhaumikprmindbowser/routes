import { Suspense } from "react";
// import Loading from "./MatxLoading";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={"Loading Suspense....."}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
