//Option 2a: fetch products on the client (in useEffect)
//directly from an external API
import Head from 'next/head'
import Title from '../components/Title'
import { useState, useEffect } from 'react'
import { getProducts } from '../lib/products';


const HomePage:React.FC = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts().then(setProducts);
    }, [])

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