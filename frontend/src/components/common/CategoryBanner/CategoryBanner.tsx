import { FC, useState } from 'react';
import { WorkCategoryInstrument } from '../../../common/types/work.types';
import { Separator } from '../Separator';
import { WORK_CATEGORY_INSTUMENT_ICON } from '../../../common/constants';
import { useBreakpoint } from '../../../common/hooks/useBreackpoint';
import { cx } from 'class-variance-authority';

export interface CategoryBannerProps {
  title: string;
  text: string;
  instruments: WorkCategoryInstrument[];
  image: string;
  mobileImage: string;
}

export const CategoryBanner: FC<CategoryBannerProps> = ({
  title,
  text,
  instruments,
  image,
  mobileImage,
}) => {
  const { isBreakpointHigherThan, isBreakpointLowerThan } = useBreakpoint();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='cursor-pointer bg-black p-3'>
      <div
        className={cx(
          'flex flex-col items-center bg-cover bg-no-repeat md:flex-row md:justify-between',
          {
            'ring-1 ring-white': isHovered,
          },
        )}
        style={{
          backgroundImage: !isHovered
            ? `url("${isBreakpointLowerThan('md') ? mobileImage : image}")`
            : 'none',
          ...(isBreakpointLowerThan('md')
            ? {
                backgroundPosition: 'cover',
                //backgroundSize: '100%',
                minHeight: '320px',
              }
            : {
                backgroundPosition: 'right',
                backgroundSize: 'cover',
              }),
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='flex flex-col items-center md:flex-row'>
          <div className='flex flex-col items-center justify-center gap-sm md:inline-flex md:w-[min-content] md:flex-row'>
            <h2 className='mt-1 md:p-2 pt-2 text-center font-sans text-md font-bold uppercase leading-[25px] text-white md:text-left md:text-lg md:leading-[50px] md:min-w-[400px]'>
              {title}
            </h2>
            <Separator className='ml-4 hidden md:block' />
            <Separator className='ml-4 block md:hidden' direction='horizontal' />
          </div>
          {isBreakpointHigherThan('md') && (
            <div className='ml-12 grid grid-cols-2 gap-3'>
              {instruments.map((instrument, index) => (
                <img
                  key={index}
                  src={WORK_CATEGORY_INSTUMENT_ICON[instrument]}
                  className='h-8 w-8'
                  alt={`${instrument} icon`}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className={cx(
            'mt-4 min-h-[80px] pr-4 text-center text-xs leading-none text-white md:mt-0 md:w-4/12 md:text-right md:text-sm',
            {
              opacity: isHovered ? 1 : 0,
              invisible: !isHovered && isBreakpointHigherThan('md'),
            },
          )}
        >
          {text}
        </div>
        {isBreakpointLowerThan('md') && (
          <div className='w-full'>
            <div className='grid max-w-[80px] grid-cols-2 gap-3'>
              {instruments.map((instrument, index) => (
                <img
                  key={index}
                  src={WORK_CATEGORY_INSTUMENT_ICON[instrument]}
                  className='h-8 w-8'
                  alt={`${instrument} icon`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
