import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const button = cva(
  ['items-center p-2 hover:ring-1 ring-white flex gap-2 transition justify-center'],
  {
    variants: {
      intent: {
        default: 'bg-black',
        primaryGradient: 'from-primary-600 to-primary-400 bg-gradient-to-r',
        dark: 'bg-gray-700',
        extraDark: 'bg-gray-950',
      },
      text: {
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      width: {
        md: 'min-w-24',
        lg: 'min-w-48',
        xl: 'min-w-64',
        '2xl': 'min-w-96',
        '3xl': 'min-w-128',
      },
      active: {
        true: 'outline outline-offset-4 outline-gray-500 hover:ring-0',
      },
      transparent: {
        true: 'bg-opacity-70',
      },
    },
    defaultVariants: {
      intent: 'default',
      text: 'sm',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  icon?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  className,
  icon,
  children,
  width,
  intent,
  text,
  active,
  transparent,
  ...rest
}) => {
  return (
    <button className={button({ className, width, intent, text, active, transparent })} {...rest}>
      {icon ? icon : null}
      {children}
    </button>
  );
};
