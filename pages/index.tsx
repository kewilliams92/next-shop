//Using incremental static regeneration for our products page
import Head from "next/head";
import Link from "next/link";
import Title from "../components/Title";
import { GetStaticProps } from "next";
import { getProducts, Product } from "../lib/products";

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log("[HomePage] getStaticProps");
  const products = await getProducts();
  return {
    props: { products },
    revalidate: 5 * 60, // seconds
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  console.log("[HomePage] products", products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
