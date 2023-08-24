import { Product } from '../data/models/ProductList.interface';
import Currency from '../data/models/currencyEnum'


const productValidation = (products: Product[]) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    const validCurrencies = Object.values(Currency);

    const validatedProducts: Product[] = [];

    for (const product of products) {
        if (!product.name) {
            throw new Error('O nome do produto é obrigatório.');
        }

        if (!product.selling_price) {
            throw new Error(`O preço de venda do produto "${product.name}" é obrigatório.`);
        }

        if (product.selling_price <= 1) {
            throw new Error(`O preço de venda do produto "${product.name}" é inválido.`);
        }

        if (product.url && !urlPattern.test(product.url)) {
            throw new Error(`A URL do produto "${product.name}" não é válida.`);
        }

        if (!product.currency || !validCurrencies.includes(product.currency)) {
            throw new Error(`A moeda do produto "${product.name}" não é válida: ${product.currency}`);
        }

        validatedProducts.push(product);
    }

    if (validatedProducts.length === 0) {
        throw new Error('A lista de produtos está vazia.');
    }

    return validatedProducts;
}


export default productValidation;