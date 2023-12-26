import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { FeedbackItem } from '../../interface/FeedbackModal.props';

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
        // Отправка данных на электронную почту
        const { name, phone, email, message } = data;
        const emailPort = process.env.EMAIL_PORT || '';
        const emailUserName = process.env.EMAIL_USERNAME || '';
        const emailHost = process.env.EMAIL_HOST || '';
        const emailPassword = process.env.EMAIL_PASSWORD || '';

        // Создание транспорта для отправки письма
        const transporter = nodemailer.createTransport({
            host: emailHost,
            port: parseInt(emailPort),
            auth: {
                user: emailUserName,
                pass: emailPassword,
            },
        });

        try {
            // Отправка письма
            await transporter.sendMail({
                from: name,
                to: 'jivatman108@gmail.com',
                subject: `New Feedback ${email}`,
                text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
            });
            res.status(201).json({ message: 'Feedback saved and email sent successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to send email.', error });
        }
    } else if (req.method === 'OPTIONS') {
        // Разрешить предварительные запросы CORS и разрешить методы GET, HEAD, OPTIONS
        res.status(200)
            .setHeader('Access-Control-Allow-Origin', '*')
            .setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')
            .setHeader('Access-Control-Allow-Headers', 'Content-Type')
            .end();
    } else {
        // Возвращать ошибку "Method not allowed" для любых других методов
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Method not allowed.' });
    }
}