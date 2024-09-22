import React from 'react';
import './Loader.css';
import classNames from 'classnames';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
  color?: string;
};
const LoaderSize = (size: string, color: string) => {
  switch (size) {
    case 'l':
      return (
        <svg
          className="loader"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.3741 44.6155C25.3022 46.4791 17.2479 41.4462 15.3843 33.3742C13.5207 25.3023 18.5536 17.248 26.6256 15.3844C34.6975 13.5209 42.7518 18.5538 44.6154 26.6257L49.4873 25.501C47.0025 14.7384 36.2634 8.02783 25.5008 10.5126C14.7382 12.9973 8.02771 23.7364 10.5124 34.499C12.9972 45.2616 23.7363 51.9721 34.4989 49.4874L33.3741 44.6155Z"
            fill={color}
          />
        </svg>
      );
    case 'm':
      return (
        <svg
          className="loader"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.7716 35.6924C20.3141 37.1833 13.8706 33.157 12.3798 26.6994C10.8889 20.2418 14.9152 13.7984 21.3728 12.3075C27.8303 10.8167 34.2738 14.843 35.7646 21.3006L39.6621 20.4008C37.6743 11.7907 29.0831 6.42227 20.473 8.41006C11.8629 10.3979 6.49448 18.9891 8.48227 27.5992C10.4701 36.2093 19.0613 41.5777 27.6714 39.5899L26.7716 35.6924Z"
            fill={color}
          />
        </svg>
      );
    case 's':
      return (
        <svg
          className="loader"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4219 17.8462C10.1932 18.5916 6.97143 16.5785 6.22601 13.3497C5.48059 10.1209 7.49375 6.89919 10.7225 6.15377C13.9513 5.40835 17.173 7.42151 17.9185 10.6503L19.8672 10.2004C18.8733 5.89534 14.5777 3.21113 10.2726 4.20503C5.96758 5.19893 3.28337 9.49456 4.27727 13.7996C5.27117 18.1046 9.5668 20.7888 13.8718 19.795L13.4219 17.8462Z"
            fill={color}
          />
        </svg>
      );
    default:
      break;
  }
};
const Loader: React.FC<LoaderProps> = ({
  size = 'l',
  className,
  color = '#518581',
}) => {
  return (
    <div className={classNames(className, 'loader_wrap')}>
      {LoaderSize(size, color)}
    </div>
  );
};

export default Loader;
