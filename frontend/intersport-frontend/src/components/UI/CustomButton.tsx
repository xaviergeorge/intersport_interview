import * as React from "react";
import Button from "@mui/material/Button";

/**
 * Props for the CustomButton component.
 * @interface
 * @property {React.ReactNode} children - The content to be displayed inside the button.
 */
interface CustomButtonProps {
  children: React.ReactNode;
}

/**
 * A custom button component that uses Material-UI's Button component and provides
 * a contained, primary-colored button with the specified content.
 *
 * @component
 * @example
 * // Usage within a React component
 * <CustomButton>Click Me</CustomButton>
 *
 * @param {CustomButtonProps} props - The props for the CustomButton component.
 * @returns {JSX.Element} The JSX representation of the custom button.
 */
const CustomButton: React.FC<CustomButtonProps> = ({ children }) => {
  return (
    <Button variant="contained" color="primary">
      {children}
    </Button>
  );
};

export default CustomButton;
