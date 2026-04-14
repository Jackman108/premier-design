import nodemailer from 'nodemailer';
import {emailService} from '../emailService';

jest.mock('nodemailer', () => ({
    __esModule: true,
    default: {
        createTransport: jest.fn(),
    },
}));

describe('emailService', () => {
    it('creates transporter and sends email with expected payload', async () => {
        const sendMail = jest.fn().mockResolvedValue(undefined);
        const createTransport = nodemailer.createTransport as jest.MockedFunction<typeof nodemailer.createTransport>;
        createTransport.mockReturnValue({sendMail} as never);

        await emailService.sendMail({
            host: 'smtp.example.com',
            port: 587,
            user: 'mailer@example.com',
            pass: 'secret',
            from: 'Ivan',
            to: 'owner@example.com',
            subject: 'New feedback',
            text: 'Body',
        });

        expect(createTransport).toHaveBeenCalledWith({
            host: 'smtp.example.com',
            port: 587,
            auth: {user: 'mailer@example.com', pass: 'secret'},
        });
        expect(sendMail).toHaveBeenCalledWith({
            from: 'Ivan',
            to: 'owner@example.com',
            subject: 'New feedback',
            text: 'Body',
        });
    });
});
