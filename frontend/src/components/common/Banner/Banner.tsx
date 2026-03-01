import { FC } from 'react';
import rounderArrow from '../../../assets/icons/rounder-arrow.svg';
import { cx } from 'class-variance-authority';

export interface BannerProps {
  title: string;
  text: string;
  className?: string;
}

export const Banner: FC<BannerProps> = ({ title, text, className }) => {
  return (
    <div className={cx('flex flex-col items-center', className)}>
      <div className={cx('flex w-full justify-between')}>
        <img src={rounderArrow} alt='rounder-arrow' className='' />
        <div className='flex flex-col items-center gap-2 py-4'>
          <h1 className='mb-1 whitespace-pre-line px-4 text-center font-serif text-md uppercase leading-none md:text-lg'>
            {title}
          </h1>
          <span className='whitespace-pre-line px-4 text-center text-xs leading-tight text-dark-200 md:text-sm'>
            {text}
          </span>
        </div>
        <img src={rounderArrow} alt='rounder-arrow' className='rotate-180' />
      </div>
    </div>
  );
};
