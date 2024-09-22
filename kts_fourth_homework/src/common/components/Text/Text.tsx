import * as React from 'react';
import './Text.css';
import classNames from 'classnames';

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type Color = 'primary' | 'secondary' | 'accent';
type View = 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
type Weight = 'normal' | 'medium' | 'bold';
type MaxLines = number;
export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: View;
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: Weight;
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: Color;
  /** Максимальное кол-во строк */
  maxLines?: MaxLines;

};

const Text: React.FC<TextProps> = ({
  view,
  tag = 'p',
  weight = 'normal',
  children,
  color,
  maxLines,
  className,
  ...props
}) =>
  React.createElement(
    tag,
    {
      className: classNames(className, color, view, weight),
      style: {
        display: '-webkit-box',
        webkitLineClamp: maxLines?.toString(),
        webkitBoxOrient: 'vertical',
        overflow: 'hidden', //для ...
      },
      ...props,
    },
    children
  );

export default Text;
