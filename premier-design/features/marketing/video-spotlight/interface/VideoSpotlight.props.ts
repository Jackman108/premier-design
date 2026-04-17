export type VideoSpotlightProps = {
    sectionId: string;
    title: string;
    description: string;
    /** ID ролика YouTube (встраивание через youtube-nocookie). Пустая строка — секция не рендерится. */
    youtubeId: string;
};
