import { FC, ReactNode, useEffect, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useClickOutside } from '../../../common/hooks/useClickOutside';
import { cx } from 'class-variance-authority';
import { Button } from '../Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = 'lg',
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={cx('fixed right-0 top-0 z-20 h-screen w-full bg-gray-950/[0.5]')}>
      <div
        ref={ref}
        style={{ maxHeight: 'calc(100svh - 60px)' }}
        className={cx(
          'absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto bg-black px-3 py-1',
          className,
          {
            'max-w-sm': width === 'sm',
            'max-w-md': width === 'md',
            'max-w-lg': width === 'lg',
            'max-w-xl': width === 'xl',
            'max-w-2xl': width === '2xl',
            'max-w-3xl': width === '3xl',
            'max-w-4xl': width === '4xl',
            'w-full': width === 'full',
          },
          /*           css`
            &::-webkit-scrollbar {
              display: none;
            }
          `, */
        )}
      >
        <div className='flex justify-between'>
          <h2 className='text-center text-md font-extrabold'>{title}</h2>
          <Button onClick={onClose}>
            <IoCloseOutline className='text-3xl' />
          </Button>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};
