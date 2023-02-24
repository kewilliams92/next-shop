import { NextApiHandler } from "next";
import { Product } from "../../lib/products";

const handleRevalidate: NextApiHandler<Product[]> = async (req, res) => {
    const event = req.body;
    if(event.type === "product"){
        const id = event.entry.id;
        await Promise.all([
            res.revalidate('/'),
            res.revalidate(`/products/${id}`),
        ]);
        console.log(`revalidated product ${id}`);
    }
    res.status(200).end();

};

export default handleRevalidate;