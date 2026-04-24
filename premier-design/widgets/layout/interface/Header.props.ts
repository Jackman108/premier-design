import {MenuItem} from "@shared/ui/menu/interface/Menu.props";
import type {ShareBannerDataProps} from '@features/banner';

export interface HeaderProps {
    menu: MenuItem[];
    shares: ShareBannerDataProps[];

}

