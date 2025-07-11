import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";

export const Counter = () => {
  const count = useSelector(
    (state: RootState) => state.ContectReducer.UI.counter
  );
  return (
    <div>
      <div style={{ margin: "20px" }}></div>
      <span
        style={{
          fontSize: "14px",
          margin: "10px",
          padding: "8px",
          borderRadius: "5px",
          color: "#36454F",
          fontWeight: "bolder",
        
        }}
      >
        CONTACTS: ({count})
      </span>
    </div>
  );
};
