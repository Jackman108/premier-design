import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { FeedbackItem } from '../../components/FeedbackModal/FeedbackForm/FeedbackForm.props';

const filePath = path.join(process.cwd(), 'formData.json');

const saveFeedback = (data: FeedbackItem) => {
    const prevData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];
    const newData = [...prevData, data];
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body;
        saveFeedback(data);
        res.status(201).json({ message: 'Feedback saved successfully!' });
    }
}