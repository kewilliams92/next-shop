import Head from "next/head";
import Title from "../../components/Title";
import { ParsedUrlQuery } from "querystring";
import { getProduct, getProducts, Product } from "../../lib/products";
import { GetStaticProps, GetStaticPaths } from "next";
import { ApiError } from "../../lib/api";

interface ProductPageParams extends ParsedUrlQuery {
    id: string;
}

interface ProductPageProps {
    product: Product;
}


export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
    const products = await getProducts();
    return {
        paths: products.map((product) => ({
            params: { id: product.id.toString() },
        })),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({ params: { id } }) => {
    try {
    const product = await getProduct(id);
    return {
        props: {
            product,
        },
        revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
    } catch (err) {
        // return { notFound: true };
        if(err instanceof ApiError && err.status === 404) {
            return { notFound: true };
        }
        throw err;
    }
};


const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    return (
        <>
            <Head>
                <title>{product.title}</title>
            </Head>
            <main className="px-6 py-4">
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            </main>
        </>
        
    );
};

export default ProductPage;