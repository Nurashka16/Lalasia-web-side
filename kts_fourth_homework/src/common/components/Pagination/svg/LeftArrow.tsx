interface ILeftArrowProps {
  isActive?: boolean;
}

const LeftArrow = ({ isActive = false }: ILeftArrowProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994"
        stroke={isActive ? "#151411" : "#AFADB5"}
        //   stroke={currentPage > 1 ? "#151411" : "#AFADB5"}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default LeftArrow;
