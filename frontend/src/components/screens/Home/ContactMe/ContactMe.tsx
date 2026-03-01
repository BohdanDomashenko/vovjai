import { FC } from 'react';
import { Button, Container } from '../../../ui';
import { Banner } from '../../../common';
import { useLocalization } from '../../../../common/hooks';
import { Separator } from '../../../common/Separator';
import linkedinIcon from '../../../../assets/icons/linkedin.svg';
import instagramIcon from '../../../../assets/icons/instagram2.svg';
import behanceIcon from '../../../../assets/icons/behance.svg';
import tiktokIcon from '../../../../assets/icons/tik-tok.svg';
import youtubeIcon from '../../../../assets/icons/youtube.svg';
import telegramIcon from '../../../../assets/icons/telegram.svg';
import whatsappIcon from '../../../../assets/icons/whatsapp.svg';
import gmailIcon from '../../../../assets/icons/gmail.svg';
import VJlogo2 from '../../../../assets/images/VJlogo2.svg';

const socialLinks = [
  {
    icon: linkedinIcon,
    link: 'https://www.linkedin.com/in/volodymyr-kripak-141b07267/',
  },
  {
    icon: instagramIcon,
    link: 'https://www.instagram.com/vovjai/',
  },
  {
    icon: behanceIcon,
    link: 'https://www.behance.net/vvkripak1d72',
  },
  {
    icon: behanceIcon,
    link: 'https://www.behance.net/vovjai',
  },
  {
    icon: tiktokIcon,
    link: 'https://www.tiktok.com/@vovjai?_t=8k3UccJzYxi&_r=1',
  },
  {
    icon: youtubeIcon,
    link: 'https://www.youtube.com/channel/UCLFUL4XsuD9GtEQqJA87hUA',
  },
];

export const ContactMe: FC = () => {
  const { localize } = useLocalization();

  return (
    <div id='contact_me'>
      <Container className='py-12'>
        <div className='flex justify-center'>
          <Separator direction='horizontal' />
        </div>
        <Banner title={localize('contact_me')} text={localize('contact_me_text')} />
      </Container>
      <Container className='bg-black pb-12 pt-10' gradientBg={false}>
        <div className='flex justify-center'>
          <div className='grid grid-cols-3 gap-12 md:grid-cols-6 md:gap-6'>
            {socialLinks.map((socialLink, index) => (
              <a key={index} href={socialLink.link} target='_blank'>
                <Button intent='default' className='h-24 w-24'>
                  <img src={socialLink.icon} height={40} width={40} />
                </Button>
              </a>
            ))}
          </div>
        </div>
        <div className='mt-10 flex flex-col flex-wrap justify-center gap-5 md:flex-row md:flex-nowrap'>
          <a href='tel:+380958878729' className='flex items-center gap-4 md:gap-2'>
            <img src={telegramIcon} height={35} width={35} />
            <span>+38 095 887 8729</span>
          </a>
          <a href='tel:+15145778719' className='flex items-center gap-4 md:gap-2'>
            <img src={whatsappIcon} height={35} width={35} />
            <span>+1 514 577 8719 </span>
          </a>
          <a href='mailto:vvkripak@gmail.com' className='flex items-center gap-4 md:gap-2'>
            <img src={gmailIcon} height={35} width={35} />
            <span>vvkripak@gmail.com</span>
          </a>
      </div>
      </Container>
    </div>
  );
};
