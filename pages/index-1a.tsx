//Option 1a: fetch products on the server (in getStaticProps) (Static generation)
//product data is fetched at build time which is ideal for SEO/ never updated. not ideal for dynamic data
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
    return {props: {products}}
}


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