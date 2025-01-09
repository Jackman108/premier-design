import fs from 'fs';
import https from 'https';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const serverOptions = dev ?
    {
        key: fs.readFileSync('./certificates/server.key'),
        cert: fs.readFileSync('./certificates/server.crt')
    } : {
        key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
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
