import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const getColor = (color: string) => {
  switch (color) {
    case 'primary':
      return '#000000';
    case 'secondary':
      return '#afadb5';
    case 'accent':
      return '#518581';
    default:
      break;
  }
};
const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M2.33569 8.74741L3.66442 7.25259L12.0001 14.662L20.3357 7.25259L21.6644 8.74741L12.0001 17.338L2.33569 8.74741Z"
      fill="currentColor"
      fillRule="evenodd"
      clip-rule="evenodd"
    />
  </Icon>
);

export default ArrowDownIcon;
