import {NextApiRequest, NextApiResponse} from 'next';
import {FeedbackItem} from '../../interface/FeedbackModal.props';
import {processFeedback} from "../../services/processFeedback";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data: FeedbackItem = req.body;

        const response = await processFeedback(data);
        return res.status(200).json(response);
    } else if (req.method === 'OPTIONS') {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(200).end();
    } else {
        res.status(405).json({message: 'Method not allowed.'});
    }
}
