import { NextApiRequest, NextApiResponse } from "next";

export default (_req: NextApiRequest, res: NextApiResponse) => {
    const users = [
        { key: 1, nome: 'Helder' },
        { key: 2, nome: 'Bruna' },
        { key: 3, nome: 'Dayana' },
    ];
    
    return res.json(users);

}