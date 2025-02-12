import ProductItem from './ProductItem';
import classes from './Products.module.css';
const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 59.99,
    description: "High-quality wireless headphones with noise cancellation."
  },
  {
    id: 2,
    title: "Smartphone",
    price: 699.99,
    description: "Latest model smartphone with an advanced camera system."
  },
  {
    id: 3,
    title: "Laptop",
    price: 1199.99,
    description: "Powerful laptop with high-performance specs for gaming and work."
  },
  {
    id: 4,
    title: "Smartwatch",
    price: 199.99,
    description: "Feature-packed smartwatch with fitness tracking and notifications."
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    price: 49.99,
    description: "Portable Bluetooth speaker with deep bass and long battery life."
  }
];

console.log(products);

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
       {
        products.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))
       }
      </ul>
    </section>
  );
};

export default Products;
