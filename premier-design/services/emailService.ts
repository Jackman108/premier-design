import nodemailer from 'nodemailer';

export const emailService = {
    async sendMail(config: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
        to: string;
        subject: string;
        text: string;
    }): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            auth: {user: config.user, pass: config.pass},
        });

        await transporter.sendMail({
            from: config.from,
            to: config.to,
            subject: config.subject,
            text: config.text,
        });
    },
};