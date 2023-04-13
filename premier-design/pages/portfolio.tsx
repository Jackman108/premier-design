import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

const Portfolio: NextPage = () => {
return (
<>
<Head>
<title>Портфолио</title>
<meta name="description" content="Наши проекты по ремонту и дизайну интерьеров" />
<link rel="icon" href="/favicon.ico" />
</Head>
<Layout>
<h1>Портфолио</h1>
<ul>
<li>Дизайн кухни в стиле лофт</li>
<li>Ремонт квартиры "под ключ"</li>
<li>Дизайн спальни в скандинавском стиле</li>
<li>Ремонт офиса в бизнес-центре</li>
<li>Дизайн гостиной в классическом стиле</li>
</ul>
</Layout>
</>
);
};

export default Portfolio;