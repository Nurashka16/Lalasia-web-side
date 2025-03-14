import style from "./ScrollIcon.module.css";

interface IScrollIconProps {
  children: React.ReactNode;
  onClick: () => void;
  isOpacity: boolean;
}

export const ScrollIcon = ({
  children,
  onClick,
  isOpacity,
}: IScrollIconProps) => (
  <div
    style={{ opacity: isOpacity ? 1 : 0 }}
    onClick={() => onClick()}
    className={style.icon_scroll}
  >
    {children}
  </div>
);
