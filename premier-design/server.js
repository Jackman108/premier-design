import fs from 'fs';
import https from 'https';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const serverOptions = dev ?
    {
        key: fs.readFileSync(process.env.CERT_KEY_PATH),
        cert: fs.readFileSync(process.env.CERT_CERT_PATH),
    } : {
        key: fs.readFileSync(process.env.PROD_CERT_KEY_PATH),
        cert: fs.readFileSync(process.env.PROD_CERT_CERT_PATH),
    };

app.prepare().then(() => {
    https.createServer(serverOptions, async (req, res) => {
        await handle(req, res);
    }).listen(3000, (err) => {
        if (err) {
            console.error('Server failed to start:', err);
            throw err;
        }
        console.log('> Ready on https://localhost:3000');
    });
});
