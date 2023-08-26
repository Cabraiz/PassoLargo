import { Product } from './models/ProductList.interface'
import productsData from './products.json'
import CurrencyEnum from './models/currencyEnum';


const ProductListSearch = () => {

  const selectedProducts = productsData.data.product;

  // Cria um mapa para rastrear os parent_identifiers encontrados
  const parentIdentifierMap = new Map();
  
  // Filtra os produtos com parent_identifiers únicos
  const uniqueParentIdentifierProducts = selectedProducts.filter(product => {
      const parentIdentifier = product.parent_identifier;
      if (!parentIdentifierMap.has(parentIdentifier)) {
          parentIdentifierMap.set(parentIdentifier, true);
          return true;
      }
      return false;
  });

  let auxId = 0;

  const productList = uniqueParentIdentifierProducts.map((product) => {
    auxId ++;
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

      id: auxId,
      currency: moedaAtual,
      selling_priceFormatted: formattedPrice,
    };
  });

  return productList;
};


export default ProductListSearch;
