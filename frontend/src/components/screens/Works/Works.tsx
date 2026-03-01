import { FC, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button, Container } from '../../ui';
import { useWorkCategory } from '../../../common/api/useWorkCategory';
import { getUploadUrl } from '../../../common/utils';
import { useWorkSubcategories } from '../../../common/api/useWorkSubcategories';
import { WorksSubcategory } from './WorksSubcategory';
import { Footer } from '../../common/Footer';
import { useLocalization } from '../../../common/hooks';
import { useWorkCategories } from '../../../common/api';
import { CategoryBanner } from '../../common';

export const Works: FC = () => {
  const { localize } = useLocalization();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { data } = useWorkCategory({ id: Number(id) });
  const { data: subcategories } = useWorkSubcategories({ workCategory: Number(id) });
  const { data: categories } = useWorkCategories({ type: 'main' });

  //if (!isLoading || !data) return <LoaderScreen />;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      style={{
        backgroundImage: `url(${data?.bgImage ? getUploadUrl(data.bgImage.url) : '/bg.jpg'})`,
      }}
    >
      <Container
        className='bg-black px-0 pt-[70px] md:px-4 md:pb-4 md:pt-[90px]'
        gradientBg={false}
      >
        <div
          style={{ backgroundImage: `url(${getUploadUrl(data?.pageImage.url || '')})` }}
          className='flex h-[200px] w-full flex-col justify-end pb-12 text-center ring-white md:h-[150px] md:justify-normal md:pb-0 md:ring-1'
        >
          <h1 className='font-serif text-2md md:text-lg'>{data?.name}</h1>
          <p className='uppercase'>{data?.pageDescription}</p>
        </div>
      </Container>
      <Container className='pb-20'>
        <div className='flex flex-wrap justify-center py-4 gap-3'>
          {subcategories?.map((subcategory) => (
            <a
              key={subcategory.id}
              href={`#subcategory${subcategory.id}`}
              className='w-1/2 md:w-1/4'
            >
              <Button className='w-full font-bold'>{subcategory.name}</Button>
            </a>
          ))}
        </div>
        <div>
          {subcategories?.map((subcategory) => (
            <WorksSubcategory
              key={subcategory.id}
              id={`subcategory${subcategory.id}`}
              data={subcategory}
            />
          ))}
        </div>
      </Container>
      <Footer
        title={localize('my_other_work')}
        bgImage={getUploadUrl(data ? data?.footerBg.url : '')}
      >
        <div className='mt-10 flex flex-col gap-4'>
          {categories
            ?.filter((category) => category.id !== Number(id))
            .map((category) => (
              <Link key={category.id} to={`/works/${category.id}`}>
                <CategoryBanner
                  title={category.name}
                  text={category.text}
                  instruments={category.instruments}
                  image={getUploadUrl(category.image.url)}
                  mobileImage={getUploadUrl(
                    category.mobileImage ? category.mobileImage.url : category.image.url,
                  )}
                />
              </Link>
            ))}
        </div>
      </Footer>
    </div>
  );
};
