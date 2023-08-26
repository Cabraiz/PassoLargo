import Currency from "./currencyEnum"

export interface Product {
  url?: string;
  identifier?: string ;
  name: string;
  parent_identifier?: string | null;
  thumbnail?: string;
  preview_image?: string;
  status?: string;
  list_price?: number;
  selling_price?: number;
  active?: boolean;
  category?: object;
  
  id: number;
  currency?: Currency;
  selling_priceFormatted?: string;
}
