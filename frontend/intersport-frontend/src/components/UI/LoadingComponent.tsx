import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * A reusable loading component that displays a circular progress indicator
 * at the center of the screen.
 *
 * @component
 * @example
 * // Usage within a React component
 * <LoadingComponent />
 */
const LoadingComponent: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingComponent;
