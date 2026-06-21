// Navigation section component for the GlobalMenu

'use client';

import { JSX } from 'react';
import { InfoIcon, MapIcon, ProfileIcon } from '@/app/components/ui/svgs';
import OptionMenu from '../OptionMenu';
import { MENU_CLASSES } from '../../constants/menuClasses';
import { MENU_CONSTANTS } from '../../constants/menuConstants';

interface NavigationSectionProps {
  navigateTo: (path: string) => void;
}

export const NavigationSection = ({
  navigateTo,
}: NavigationSectionProps): JSX.Element => (
  <nav
    className={`${MENU_CLASSES.SECTION_NAV} before:content-['${MENU_CONSTANTS.SECTIONS.NAVIGATION}']`}
  >
    <div className={MENU_CLASSES.SECTION_TITLE}>navegacion</div>
    <ul className={MENU_CLASSES.SECTION_LIST}>
      <OptionMenu
        icon={<MapIcon />}
        label="Explorar mapa"
        onClick={() => navigateTo(MENU_CONSTANTS.NAVIGATION.MAP)}
      />
      <OptionMenu
        icon={<ProfileIcon />}
        label="Ver mi perfil"
        onClick={() => navigateTo(MENU_CONSTANTS.NAVIGATION.PROFILE)}
      />
      <OptionMenu
        icon={<InfoIcon />}
        label="Enviar feedback"
        onClick={() => navigateTo(MENU_CONSTANTS.NAVIGATION.FEEDBACK)}
      />
    </ul>
  </nav>
);
