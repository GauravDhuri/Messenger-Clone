'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label, icon: Icon, href, onClick, active }) => {
  const handleOnClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleOnClick}>
      <Link
        href={href}
        className={clsx(
          `rounden-md group flex gap-x-3 p-3 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black`,
          active && 'bg-gray-100 text-black',
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
