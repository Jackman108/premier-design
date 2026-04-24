import nodemailer from 'nodemailer';

const DEFAULTS = {
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
} as const;

export type EmailTransportTimeouts = {
    connectionTimeout?: number;
    greetingTimeout?: number;
    socketTimeout?: number;
};

export const emailService = {
    async sendMail(
        config: {
            host: string;
            port: number;
            user: string;
            pass: string;
            from: string;
            replyTo?: string;
            to: string;
            subject: string;
            text: string;
        },
        transportTimeouts?: EmailTransportTimeouts,
    ): Promise<void> {
        const connectionTimeout = transportTimeouts?.connectionTimeout ?? DEFAULTS.connectionTimeout;
        const greetingTimeout = transportTimeouts?.greetingTimeout ?? DEFAULTS.greetingTimeout;
        const socketTimeout = transportTimeouts?.socketTimeout ?? DEFAULTS.socketTimeout;

        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            auth: {user: config.user, pass: config.pass},
            connectionTimeout,
            greetingTimeout,
            socketTimeout,
        });

        await transporter.sendMail({
            from: config.from,
            ...(config.replyTo ? {replyTo: config.replyTo} : {}),
            to: config.to,
            subject: config.subject,
            text: config.text,
        });
    },
};