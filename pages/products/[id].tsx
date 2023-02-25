import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { getProduct, getProducts, Product } from "../../lib/products";
import { GetStaticProps, GetStaticPaths } from "next";
import { ApiError } from "../../lib/api";
import AddToCartWidget from "../../components/AddToCartWidget";
import { useUser } from "../../hooks/user";
import Page from "../../components/Page";

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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params: { id } }) => {
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
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const user = useUser();
  return (
    <Page title={product.title}>
        <div className="flex flex-col lg:flex-row">
          <div>
            <Image src={product.pictureUrl} alt="" width={640} height={480} />
          </div>
          <div className="flex-1 lg:ml-4">
            <p className="text-sm">{product.description}</p>
            <p className="text-lg font-bold mt-2">
                {product.price}
            </p>
            {user && <AddToCartWidget productId={product.id} />}
          </div>
        </div>
    </Page>
  );
};

export default ProductPage;
