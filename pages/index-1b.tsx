//Option 1b: fetch products on the server 
// but with Incremental Static Regeneration (in getStaticProps)
//we get all the benefits of getStaticProps but we can update the data every X seconds. not ideal for SEO but good for dynamic data
import Head from 'next/head'
import Title from '../components/Title'
import { GetStaticProps } from 'next'
import { getProducts, Product } from '../lib/products';

// const products = [
//   { id: 1, title: 'First Product'},
//   { id: 2, title: 'Second Product'},
// ];

interface HomePageProps {
    products: Product[]
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    console.log('[HomePage] getStaticProps')
    const products = await getProducts()
    return {
      props: {products},
      revalidate: 30 // seconds
    };
};


const HomePage:React.FC<HomePageProps> = ({products}) => {
  console.log('[HomePage] products', products)
  return (
    <>
    <Head>
      <title>Next Shop</title>
    </Head>
    <main className='px-6 py-4'>
      <Title>Next Shop</Title>
      <ul>
        {products.map(product => (
            <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </main>
    </>
  )
}

export default HomePage