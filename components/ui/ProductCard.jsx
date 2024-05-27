// components/ProductCard.js
const ProductCard = ({ product }) => {
    return (
      <div className="border p-4 rounded hover:shadow-lg transition-shadow">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded"/>
        <h3 className="mt-2 font-semibold">{product.name}</h3>
        <p className="text-gray-500">${product.price}</p>
        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Add to Cart</button>
      </div>
    );
  };
  
  export default ProductCard;
  