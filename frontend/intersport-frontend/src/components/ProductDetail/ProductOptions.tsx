import * as React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ProductOption, ProductSize } from "../../types/product";

/**
 * Props for the ProductOptions component.
 * @interface
 * @property {ProductOption[]} options - An array of product options (colors and sizes).
 * @property {{ size: string; color: string }} selectedOption - The currently selected product option.
 * @property {(option: { size: string; color: string }) => void} onSelectOption - A function to handle option selection.
 */
interface ProductOptionsProps {
  options: ProductOption[];
  selectedOption: { size: string; color: string };
  onSelectOption: (option: { size: string; color: string }) => void;
}

/**
 * A component for selecting product options, including color and size.
 *
 * @component
 * @example
 * // Usage within a React component
 * <ProductOptions
 *   options={productOptions}
 *   selectedOption={selectedProductOption}
 *   onSelectOption={handleOptionSelection}
 * />
 *
 * @param {ProductOptionsProps} props - The props for the ProductOptions component.
 * @returns {JSX.Element} The JSX representation of the product options component.
 */
const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  const handleColorChange = (color: string) => {
    onSelectOption({ ...selectedOption, color });
  };

  const handleSizeChange = (size: string) => {
    onSelectOption({ ...selectedOption, size });
  };

  /**
   * Get available sizes for the currently selected color.
   * @returns {ProductSize[]} An array of available product sizes.
   */
  const getSizesForSelectedColor = (): ProductSize[] => {
    return (
      options.find((option) => option.color === selectedOption.color)?.sizes ||
      []
    );
  };

  return (
    <Box sx={{ my: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Color</InputLabel>
        <Select
          value={selectedOption.color}
          label="Color"
          onChange={(e) => handleColorChange(e.target.value as string)}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.color}>
              {option.color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Size</InputLabel>
          <Select
            value={selectedOption.size}
            label="Size"
            onChange={(e) => handleSizeChange(e.target.value as string)}
          >
            {getSizesForSelectedColor().map((sizeOption, index) => (
              <MenuItem
                key={index}
                value={sizeOption.size}
                disabled={sizeOption.stock === 0}
              >
                {sizeOption.size}{" "}
                {sizeOption.stock === 0 ? "(Out of stock)" : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    </Box>
  );
};

export default ProductOptions;
