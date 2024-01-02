import * as React from "react";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children }) => {
  return (
    <Button variant="contained" color="primary">
      {children}
    </Button>
  );
};

export default CustomButton;
