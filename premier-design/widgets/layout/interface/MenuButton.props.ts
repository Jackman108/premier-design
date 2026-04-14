import {MenuProps} from "@shared/ui/menu/interface/Menu.props";

export type MenuButtonProps = Pick<MenuProps, 'isMobileMenuOpen' | 'toggleMobileMenu'>;
