// CustomSnackbar.tsx
import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

// Define a type for the props that CustomSnackbar will accept
type CustomSnackbarProps = {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
};

/**
 * CustomSnackbar component displays a snackbar with a message.
 *
 * @param {CustomSnackbarProps} props - The props for the component.
 * @returns {JSX.Element} The Snackbar component to be displayed.
 */
const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
