import nodemailer from 'nodemailer';
import { emailService } from '../emailService';

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
		createTransport.mockReturnValue({ sendMail } as never);

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

		expect(createTransport).toHaveBeenCalledWith(
			expect.objectContaining({
				host: 'smtp.example.com',
				port: 587,
				auth: { user: 'mailer@example.com', pass: 'secret' },
				connectionTimeout: 10_000,
				greetingTimeout: 10_000,
				socketTimeout: 15_000,
			}),
		);
		expect(sendMail).toHaveBeenCalledWith({
			from: 'Ivan',
			to: 'owner@example.com',
			subject: 'New feedback',
			text: 'Body',
		});
	});

	it('accepts transport timeout overrides for feedback-style SLO budgets', async () => {
		const sendMail = jest.fn().mockResolvedValue(undefined);
		const createTransport = nodemailer.createTransport as jest.MockedFunction<typeof nodemailer.createTransport>;
		createTransport.mockReturnValue({ sendMail } as never);

		await emailService.sendMail(
			{
				host: 'smtp.example.com',
				port: 587,
				user: 'mailer@example.com',
				pass: 'secret',
				from: 'Ivan',
				to: 'owner@example.com',
				subject: 'New feedback',
				text: 'Body',
			},
			{ connectionTimeout: 5_000, greetingTimeout: 5_000, socketTimeout: 6_000 },
		);

		expect(createTransport).toHaveBeenCalledWith(
			expect.objectContaining({
				connectionTimeout: 5_000,
				greetingTimeout: 5_000,
				socketTimeout: 6_000,
			}),
		);
	});
});
