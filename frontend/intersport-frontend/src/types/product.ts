export interface ProductSize {
    size: string;
    stock: number;
  }
  
  export interface ProductOption {
    color: string;
    image_url: string;
    sizes: ProductSize[];
  }
  
  export interface Product {
    _id: string;
    title: string;
    description: string;
    basePrice: number;
    imageUrl: string;
    options: ProductOption[];
  }

  export interface selectedProductOption {
    size: string;
    color: string;
    imageUrl: string; // Add imageUrl to the selected option
  }
  
  