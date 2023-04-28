import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';


class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    render(): JSX.Element {
        return (
            <Html lang='ru'>
                <Head>
                    <title>Premium Interior - Ремонт и дизайн интерьеров в Беларуси</title>
                    <meta
                        name="description"
                        content="Premium Interior - ремонт и дизайн интерьеров в Беларуси"
					/>
					<meta 
                    name="viewport" 
                    content="width=device-width, initial-scale=1" 
                    />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="http://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
                    <link href="http://fonts.googleapis.com/css2?family=Public+Sans:wght@600&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html >
        );
    }
}

export default MyDocument;