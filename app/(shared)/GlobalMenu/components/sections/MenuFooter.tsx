// MenuFooter component for the GlobalMenu

'use client';

import { JSX } from 'react';
import { MENU_CLASSES } from '../../constants/menuClasses';
import { MENU_CONSTANTS } from '../../constants/menuConstants';

interface MenuFooterProps {
  navigateTo: (path: string) => void;
}

export const MenuFooter = ({ navigateTo }: MenuFooterProps): JSX.Element => (
  <div>
    <div className={MENU_CLASSES.FOOTER_DIVIDER} />
    <nav className={MENU_CLASSES.FOOTER_NAV}>
      <li>
        <button
          className={MENU_CLASSES.FOOTER_BUTTON}
          onClick={() => navigateTo(MENU_CONSTANTS.NAVIGATION.TERMS)}
        >
          condiciones
        </button>
      </li>
      <li>
        <button
          className={MENU_CLASSES.FOOTER_BUTTON}
          onClick={() => navigateTo(MENU_CONSTANTS.NAVIGATION.PRIVACY)}
        >
          privacidad
        </button>
      </li>
    </nav>
  </div>
);
