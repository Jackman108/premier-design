interface NewsProps {
    data: {
        news: {
            id: number;
            image: string;
            title: string;
            date: string;
        }[];
    };
}

export default NewsProps;