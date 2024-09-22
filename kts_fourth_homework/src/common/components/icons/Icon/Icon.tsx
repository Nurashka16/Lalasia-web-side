import * as React from 'react';
import './Icon.css';
import classNames from 'classnames';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};
const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  width = '24px',
  height = '24px',
  ...props
}) => {
  return (
    <svg
    viewBox='0 0 24 24'
      className={classNames(className, 'icon', color && `icon_${color}`)}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
