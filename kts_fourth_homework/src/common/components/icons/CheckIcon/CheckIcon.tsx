import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M4.20923 11.6129L10.0868 18L20.2092 7"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Icon>
  );
};

export default CheckIcon;
