import { Product } from './models/ProductList.interface'
import productsData from './products.json'
import CurrencyEnum from './models/currencyEnum';

interface ProductListProps {
  quantity: number;
}

const ProductListSearch = ({ quantity }: ProductListProps) => {

  const selectedProducts: Product[] = productsData.data.product.slice(0, quantity);

  const productList = selectedProducts.map((product) => {
    const moedaAtual = CurrencyEnum.BRL;
    const formattedPrice = product.selling_price?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: moedaAtual,
      minimumFractionDigits: 2,
    });
    
    
    return {
      ...product,
      preview_image: product.preview_image,
      thumbnail: product.thumbnail,

      currency: moedaAtual,
      selling_priceFormatted: formattedPrice,
    };
  });

  return productList;
};


export default ProductListSearch;
