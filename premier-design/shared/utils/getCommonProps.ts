import {DataProps} from "@widgets/interface/interfaceData";

export const getCommonProps = (data: DataProps) => {
    const {menu, papers, news, costingCard, button, panel, shares} = data;
    return {
        menuData: menu,
        papersData: papers,
        newsData: news,
        costingData: costingCard,
        buttonData: button,
        panelData: panel,
        sharesData: shares,
    };
};