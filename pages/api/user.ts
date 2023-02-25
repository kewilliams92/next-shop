import { NextApiHandler } from "next";
import { fetchJson } from "../../lib/api";

const { CMS_URL } = process.env;

const handleUser: NextApiHandler = async (req, res) => {
    const { jwt } = req.cookies;
    //we need to check if the user is logged in, if not we need to return a 401
    if(!jwt){
        res.status(401).end();
        return;
    }
    try{
    const user = await fetchJson(`${CMS_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${jwt}` },
        })
    res.status(200).json({
        id: user.id,
        name: user.username,
    })
    } catch (error) {
        res.status(401).end();
    }
};

export default handleUser;