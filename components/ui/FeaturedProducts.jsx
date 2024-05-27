// components/FeaturedProducts.js
import ProductCard from './ProductCard';

const FeaturedProducts = ({ products }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
