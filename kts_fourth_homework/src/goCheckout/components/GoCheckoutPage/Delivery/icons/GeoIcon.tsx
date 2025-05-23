import React from "react";

interface IGeoIconProps {
  className?:string
}

const GeoIcon = ({className}:IGeoIconProps) => {
  return (
    <svg className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10m-3 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0"
      ></path>
      <path
        fill="currentColor"
        d="M12 1a9 9 0 0 0-9 9c0 2.514 1.136 4.848 2.699 6.942 1.565 2.099 3.631 4.05 5.643 5.81a1 1 0 0 0 1.316 0c2.012-1.76 4.078-3.711 5.644-5.81C19.864 14.848 21 12.514 21 10a9 9 0 0 0-9-9m-7 9a7 7 0 0 1 14 0c0 1.904-.864 3.82-2.302 5.746-1.275 1.71-2.945 3.353-4.698 4.92-1.753-1.567-3.423-3.21-4.699-4.92C5.864 13.82 5 11.904 5 10"
      ></path>
    </svg>
  );
};

export default GeoIcon;
