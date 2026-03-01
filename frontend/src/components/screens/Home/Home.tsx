import { FC, useEffect } from 'react';
import { useLocalization } from '../../../common/hooks';
import { Banner, CategoryBanner } from '../../common';
import { Button } from '../../ui';
import { useWorkCategories } from '../../../common/api';
import { getUploadUrl } from '../../../common/utils';
import { AboutMe } from './AboutMe/AboutMe';
import { ContactMe } from './ContactMe';
import { Footer } from '../../common/Footer';
import homeFooterBg from '../../../assets/images/home-footer-bg.png';
import instagramIcon from '../../../assets/icons/instagram2.svg';
import { Link, useLocation } from 'react-router-dom';

export const Home: FC = () => {
  const { localize } = useLocalization();
  const { pathname } = useLocation();
  const { data } = useWorkCategories({ type: 'main' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`bg-[url('/bg.jpg')]`}>
      <div className='container flex max-w-6xl flex-col items-center bg-gradient-to-r from-dark-700 to-dark-800 pt-[100px]'>
        <Banner title={localize('promo_title')} text={localize('promo_text')} />
        <div className='mt-5 flex flex-wrap justify-center gap-4 md:flex-nowrap'>
          <a href='#about_me'>
            <Button width='xl' className='font-bold'>
              {localize('about_me')}
            </Button>
          </a>
          <a href='#contact_me'>
            <Button width='xl' className='font-bold'>
              {localize('contact_me')}
            </Button>
          </a>
        </div>
      </div>
      <div className='container flex max-w-6xl flex-col items-center bg-gradient-to-r from-dark-700 to-dark-800 p-0'>
        <div className='mt-10 flex flex-col gap-4'>
          {data?.map((category) => (
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
      </div>
      <AboutMe />
      <ContactMe />
      <Footer title={localize('powered_by_sorryimbroke')} bgImage={homeFooterBg}>
        <div className='flex flex-col items-center'>
          <a href='https://www.instagram.com/sorryiambroke/'>
            <Button className='flex items-center font-bold'>
              <img src={instagramIcon} alt='instagram' className='h-7 w-7' />
              @sorryiambroke
            </Button>
          </a>
        </div>
      </Footer>
    </div>
  );
};
