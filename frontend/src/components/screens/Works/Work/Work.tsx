import { FC, useState } from 'react';
import { ResponseRecord } from '../../../../common/types';
import { Work as TWork } from '../../../../common/types/work.types';
import { getUploadUrl } from '../../../../common/utils';
import dayjs from 'dayjs';
import { Button, Modal } from '../../../ui';
import arrowRight from '../../../../assets/icons/arrow-right.svg';
import { cx } from 'class-variance-authority';
import { useLocalization } from '../../../../common/hooks';

export interface WorkProps {
  data: ResponseRecord<TWork>;
}

export const Work: FC<WorkProps> = ({ data }) => {
  const { localize } = useLocalization();

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState(0);
  // const items = [...(data.videos || []), ...(data.images || [])];
  const items = [
    ...(data.media?.map((media) => ({ type: 'media', url: media.url })) || []),
    ...(data.videos?.map((url) => ({ type: 'youtube', url })) || []),
    ...(data.images?.map((image) => ({ type: 'image', url: image.url })) || []),
  ];
  const activeItem = items[activeModalImage];

  const renderActiveItem = () => {
    if (activeItem.type === 'media')
      return <video controls src={getUploadUrl(activeItem.url)} className='w-full' />;

    if (activeItem.type === 'youtube')
      return <iframe width='100%' height='315' src={activeItem.url}></iframe>;

    if (activeItem.type === 'image')
      return <img src={getUploadUrl(activeItem.url)} alt='work' className='w-full' />;
  };

  return (
    <>
      <div className='w-full bg-black p-3 flex flex-col justify-center'>
        <div className='w-full ring-1 ring-white'>
          <img src={getUploadUrl(data.previewImage.url)} alt='work' className='w-full' />
          <div className='flex items-center justify-between gap-2 bg-black p-2'>
            <h2 className='text-sm font-bold'>{data.title}</h2>
            <div>{dayjs(data.date || data.createdAt).format('DD.MM.YYYY')}</div>
          </div>
        </div>
        <p className='mt-4 leading-tight'>{data.shortDescription}</p>
        {data.images?.length && (
          <div className='mt-2 flex justify-center'>
            <Button className='uppercase' onClick={() => setIsDescriptionOpen(true)}>
              <img src={arrowRight} alt='arrow' className='h-3 rotate-90' />
              <span>{localize('description')}</span>
              <img src={arrowRight} alt='arrow' className='h-3 rotate-90' />
            </Button>
          </div>
        )}
      </div>
      <Modal
        isOpen={isDescriptionOpen}
        onClose={() => setIsDescriptionOpen(false)}
        title={data.title}
        width='4xl'
      >
        <p>{data.longDescription}</p>
        <div>
          <div className='mt-4 flex justify-center'>{renderActiveItem()}</div>
          <div className='flex justify-between gap-4 py-2'>
            <div className='flex flex-wrap gap-2'>
              {items.map((_, index) => (
                <Button
                  key={index}
                  className={cx('h-12 w-12', {
                    'bg-white text-black': index === activeModalImage,
                  })}
                  onClick={() => setActiveModalImage(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
            <div className='flex gap-2'>
              <Button
                className='h-12 w-12'
                onClick={() =>
                  setActiveModalImage((prev) => (prev === 0 ? data.images!.length - 1 : prev - 1))
                }
              >
                <img src={arrowRight} alt='arrow' className='h-3 rotate-180' />
              </Button>
              <Button
                className='h-12 w-12'
                onClick={() =>
                  setActiveModalImage((prev) => (prev === data.images!.length - 1 ? 0 : prev + 1))
                }
              >
                <img src={arrowRight} alt='arrow' className='h-3' />
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
