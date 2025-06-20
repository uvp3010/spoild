// src/components/ProductShowcase.js
import { motion } from 'framer-motion';

const ProductShowcase = () => {
  const products = [
    { id: 1, name: 'Organic Cotton Tee', price: '$78', category: 'Tops' },
    { id: 2, name: 'Linen Wide Pants', price: '$145', category: 'Bottoms' },
    { id: 3, name: 'Recycled Wool Coat', price: '$320', category: 'Outerwear' },
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-serif"
          >
            Featured Pieces
          </motion.h2>
          <p className="text-gray-600 max-w-lg mx-auto mt-4">
            Our signature collection showcasing exceptional craftsmanship and sustainable materials
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-square bg-gray-200 border-2 border-dashed rounded-xl overflow-hidden mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white py-3 px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm uppercase tracking-widest">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;