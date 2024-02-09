import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeaderEntity } from './entities/header.entity';
import { Repository } from 'typeorm';
import { FooterEntity } from './entities/footer.entity';
import { PlutosHomeEntity } from './entities/plutos_home.entity';
import { ExternalEntity } from './entities/external.entity';
import uploadFile from './config/bucket/functions/gcpUploadImages';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(HeaderEntity) private readonly headerRespo: Repository<HeaderEntity>,
    @InjectRepository(FooterEntity) private readonly footerRespo: Repository<FooterEntity>,
    @InjectRepository(PlutosHomeEntity) private readonly plutosHomeRespo: Repository<PlutosHomeEntity>,
    @InjectRepository(ExternalEntity) private readonly externalRespo: Repository<ExternalEntity>
  ) { }


  // create dashboard
  async create(images: Array<Express.Multer.File>, createDto: any): Promise<{ message: string; success: boolean }> {
    const headerData: HeaderEntity = new HeaderEntity();
    const footerData: FooterEntity = new FooterEntity();
    const plutoshomeData: PlutosHomeEntity = new PlutosHomeEntity();
    const externalData: ExternalEntity = new ExternalEntity();

    // ----------------------------header------------------------------------------------------------
    headerData.campaign_Id = createDto.campaign_Id
    headerData.ui_type = createDto.ui_type
    headerData.nav_lists = createDto.nav_lists
    const headerLeftlogo = images.find((e) => e.fieldname === "left_nav_logo")
    const headerRightlogo = images.find((e) => e.fieldname === "nav_right_logo")
    headerData.left_nav_logo = await uploadFile(`uploads/${headerLeftlogo.filename}`, `test/${headerLeftlogo.filename}`);
    headerData.nav_right_logo = await uploadFile(`uploads/${headerRightlogo.filename}`, `test/${headerRightlogo.filename}`)
    // ----------------------------header----------------------------------------------------------------

    //  -------------------------------footer--------------------------------------------------------------
    footerData.campaign_Id = createDto.campaign_Id
    footerData.ui_type = createDto.ui_type
    footerData.copy_right = createDto.copy_right
    footerData.bank_partners = createDto.bank_partners
    footerData.brand_partners = createDto.brand_partners
    footerData.customer_support = createDto.customer_support
    footerData.quick_links = createDto.quick_links
    const footerLogo = images.find((e) => e.fieldname === "footer_logo")
    footerData.footer_logo = await uploadFile(`uploads/${footerLogo.filename}`, `test/${footerLogo.filename}`)
    const bannerImages = images.filter((image: any) => image.fieldname && image.fieldname.includes('social_media')) as Express.Multer.File[];
    const bannerItems = await Promise.all(bannerImages.map(async (imageFile, index) => ({
      logo: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
      link: createDto.social_media[index] ? createDto.social_media[index].link : '',
    })));
    footerData.social_media = bannerItems;

    //  -------------------------------footer-------------------------------------------------------------

    if (createDto.ui_type === "plutoshome") {
      // -----------------------------plutosHome------------------------------------------------------------
      plutoshomeData.campaign_Id = createDto.campaign_Id
      plutoshomeData.ui_type = createDto.ui_type
      plutoshomeData.partners_heading = createDto.partners_heading
      plutoshomeData.partners_subHeading = createDto.partners_subHeading
      plutoshomeData.disclaimer = createDto.disclaimer
      plutoshomeData.rechange_heading = createDto.rechange_heading
      plutoshomeData.rechange_subHeading = createDto.rechange_subHeading
      plutoshomeData.exclusive_heading = createDto.exclusive_heading
      plutoshomeData.exclusive_subHeading = createDto.exclusive_subHeading
      plutoshomeData.prime_heading = createDto.prime_heading
      plutoshomeData.prime_subHeading = createDto.prime_subHeading
      plutoshomeData.coins_heading = createDto.coins_heading
      plutoshomeData.coins_subHeading = createDto.coins_subHeading

      const rightbannerDesktop = images.filter((image: any) => image.fieldname && image.fieldname.includes('right_banner_desktop')) as Express.Multer.File[];
      const rightbannerDesktopItems = await Promise.all(rightbannerDesktop.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.right_banner_desktop[index] ? createDto.right_banner_desktop[index].link : '',
      })));
      plutoshomeData.right_banner_desktop = rightbannerDesktopItems;

      const rightbannerMobile = images.filter((image: any) => image.fieldname && image.fieldname.includes('right_banner_mobile')) as Express.Multer.File[];
      const rightbannerMobileItems = await Promise.all(rightbannerMobile.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.right_banner_mobile[index] ? createDto.right_banner_mobile[index].link : '',
      })));
      plutoshomeData.right_banner_mobile = rightbannerMobileItems;

      const rechargeleftBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('recharge_left_banner')) as Express.Multer.File[];
      const rechargeleftBannerItems = await Promise.all(rechargeleftBanner.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.recharge_left_banner[index] ? createDto.recharge_left_banner[index].link : '',
      })));
      plutoshomeData.recharge_left_banner = rechargeleftBannerItems;

      const rechargerightBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('recharge_right_banner')) as Express.Multer.File[];
      const rechargerightBannerItems = await Promise.all(rechargerightBanner.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.recharge_right_banner[index] ? createDto.recharge_right_banner[index].link : '',
      })));
      plutoshomeData.recharge_right_banner = rechargerightBannerItems;

      const exclusiveBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('exclusive_banner')) as Express.Multer.File[];
      const exclusiveBannerItems = await Promise.all(exclusiveBanner.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.exclusive_banner[index] ? createDto.exclusive_banner[index].link : '',
      })));
      plutoshomeData.exclusive_banner = exclusiveBannerItems;

      const primeleftBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('prime_left_banner')) as Express.Multer.File[];
      const primeleftBannerItems = await Promise.all(primeleftBanner.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.prime_left_banner[index] ? createDto.prime_left_banner[index].link : '',
      })));
      plutoshomeData.prime_left_banner = primeleftBannerItems;

      const primerightBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('prime_right_banner')) as Express.Multer.File[];
      const primerightBannerItems = await Promise.all(primerightBanner.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.prime_right_banner[index] ? createDto.prime_right_banner[index].link : '',
      })));
      plutoshomeData.prime_right_banner = primerightBannerItems;

      const coinBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('coins_banner')) as Express.Multer.File[];
      const coinBannerItems = await Promise.all(coinBanner.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.coins_banner[index] ? createDto.coins_banner[index].link : '',
      })));
      plutoshomeData.coins_banner = coinBannerItems;

      const vouchers = images.filter((image: any) => image.fieldname && image.fieldname.includes('vouchers')) as Express.Multer.File[];
      const vouchersItems = await Promise.all(vouchers.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.vouchers[index] ? createDto.vouchers[index].link : '',
      })));
      plutoshomeData.vouchers = vouchersItems;

      const partners = images.filter((image: any) => image.fieldname && image.fieldname.includes('partners')) as Express.Multer.File[];
      const partnersItems = await Promise.all(partners.map(async (imageFile, index) => ({
        logo: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
      })));
      plutoshomeData.partners = partnersItems;
      // -----------------------------plutosHome--------------------------------------------------------------------
    } else {
      // -----------------------------External-------------------------------------------------------------
      externalData.campaign_Id = createDto.campaign_Id
      externalData.ui_type = createDto.ui_type
      externalData.disclaimer = createDto.disclaimer
      externalData.main_heading = createDto.main_heading
      externalData.main_subHeading = createDto.main_subHeading
      const mainbannerDesktop = images.filter((image: any) => image.fieldname && image.fieldname.includes('main_banner_desktop')) as Express.Multer.File[];
      const mainbannerDesktopItems = await Promise.all(mainbannerDesktop.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.main_banner_desktop[index] ? createDto.main_banner_desktop[index].link : '',
      })));
      externalData.main_banner_desktop = mainbannerDesktopItems;

      const mainbannerMobile = images.filter((image: any) => image.fieldname && image.fieldname.includes('main_banner_mobile')) as Express.Multer.File[];
      const mainbannerMobileItems = await Promise.all(mainbannerMobile.map(async (imageFile, index) => ({
        image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
        link: createDto.main_banner_mobile[index] ? createDto.main_banner_mobile[index].link : '',
      })));
      externalData.main_banner_mobile = mainbannerMobileItems;

      // -----------------------------External-----------------------------------------------------------------------
    }
    // Save the data
    const saveHeader = await this.headerRespo.save(headerData);
    const saveFooter = await this.footerRespo.save(footerData);
    if (createDto.ui_type === "plutoshome") {
      const savePlutoshome = await this.plutosHomeRespo.save(plutoshomeData);
    } else {
      const saveExternal = await this.externalRespo.save(externalData);
    }
    return {
      success: true,
      message: 'Dashboard created successfully',
    };
  }

  //  retrieved only one specific dash details
  async findOne(id: string) {
    let getAll = false

    const Header = await this.headerRespo.findOne({ where: { campaign_Id: id } });
    if (!Header) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    const Footer = await this.footerRespo.findOne({ where: { campaign_Id: id } });
    if (!Footer) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    let Plutoshome:any
    let External:any
    if (Header.ui_type === "plutoshome") {
      Plutoshome = await this.plutosHomeRespo.findOne({ where: { campaign_Id: id } });
      if (!Plutoshome) {
        return {
          success: false,
          message: 'User not found',
        };
      }
    } else {
      External = await this.externalRespo.findOne({ where: { campaign_Id: id } });
      if (!External) {
        return {
          success: false,
          message: 'User not found',
        };
      }
    }

    const items = {
      header: Header,
      body: Header.ui_type === "plutoshome" ? Plutoshome : External,
      footer: Footer
    }


    return {
      success: true,
      message: 'User retrieved successfully',
      data: items
    };

  }

  async findAll(): Promise<{ message: string; data: any[]; success: boolean }> {
    const headers = await this.headerRespo.find();
    const result = [];
    for (const header of headers) {
      const footer = await this.footerRespo.findOne({ where: { campaign_Id: header.campaign_Id } });
      const plutoshome = await this.plutosHomeRespo.findOne({ where: { campaign_Id: header.campaign_Id } });
      const external = await this.externalRespo.findOne({ where: { campaign_Id: header.campaign_Id } });
      const objtItem = {
        header: header,
        body: plutoshome ?? external,
        footer: footer,
      };
      result.push(objtItem);
    }

    return {
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    };
  }

  //  update dash details 
  async update(id: string, images: Array<Express.Multer.File>, updateDto: any): Promise<{ message: string; success: boolean }> {
    try {
      const headerData = await this.headerRespo.findOne({ where: { campaign_Id: id } });
      if (headerData) {

        headerData.campaign_Id = updateDto.campaign_Id
        headerData.ui_type = updateDto.ui_type
        headerData.nav_lists = updateDto.nav_lists
        const headerLeftlogo = images.find((e) => e.fieldname === "left_nav_logo")
        const headerRightlogo = images.find((e) => e.fieldname === "nav_right_logo")
        headerData.left_nav_logo = await uploadFile(`uploads/${headerLeftlogo.filename}`, `test/${headerLeftlogo.filename}`);
        headerData.nav_right_logo = await uploadFile(`uploads/${headerRightlogo.filename}`, `test/${headerRightlogo.filename}`)
       headerData.updated_at=new Date()
        await this.headerRespo.save(headerData);
      }

      const footerData = await this.footerRespo.findOne({ where: { campaign_Id: id } });
      if (footerData) {
        footerData.campaign_Id = updateDto.campaign_Id
        footerData.ui_type = updateDto.ui_type
        footerData.copy_right = updateDto.copy_right
        footerData.bank_partners = updateDto.bank_partners
        footerData.brand_partners = updateDto.brand_partners
        footerData.customer_support = updateDto.customer_support
        footerData.quick_links = updateDto.quick_links
        const footerLogo = images.find((e) => e.fieldname === "footer_logo")
        footerData.footer_logo = await uploadFile(`uploads/${footerLogo.filename}`, `test/${footerLogo.filename}`)
        const bannerImages = images.filter((image: any) => image.fieldname && image.fieldname.includes('social_media')) as Express.Multer.File[];
        const bannerItems = await Promise.all(bannerImages.map(async (imageFile, index) => ({
          logo: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
          link: updateDto.social_media[index] ? updateDto.social_media[index].link : '',
        })));
        footerData.social_media = bannerItems;
        footerData.updated_at=new Date()
        await this.footerRespo.save(footerData);
      }
      if (updateDto.ui_type === "plutoshome") {
        const plutoshomeData = await this.plutosHomeRespo.findOne({ where: { campaign_Id: id } });
        if (plutoshomeData) {
          plutoshomeData.campaign_Id = updateDto.campaign_Id
          plutoshomeData.ui_type = updateDto.ui_type
          plutoshomeData.partners_heading = updateDto.partners_heading
          plutoshomeData.partners_subHeading = updateDto.partners_subHeading
          plutoshomeData.disclaimer = updateDto.disclaimer
          plutoshomeData.rechange_heading = updateDto.rechange_heading
          plutoshomeData.rechange_subHeading = updateDto.rechange_subHeading
          plutoshomeData.exclusive_heading = updateDto.exclusive_heading
          plutoshomeData.exclusive_subHeading = updateDto.exclusive_subHeading
          plutoshomeData.prime_heading = updateDto.prime_heading
          plutoshomeData.prime_subHeading = updateDto.prime_subHeading
          plutoshomeData.coins_heading = updateDto.coins_heading
          plutoshomeData.coins_subHeading = updateDto.coins_subHeading

          const rightbannerDesktop = images.filter((image: any) => image.fieldname && image.fieldname.includes('right_banner_desktop')) as Express.Multer.File[];
          const rightbannerDesktopItems = await Promise.all(rightbannerDesktop.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.right_banner_desktop[index] ? updateDto.right_banner_desktop[index].link : '',
          })));
          plutoshomeData.right_banner_desktop = rightbannerDesktopItems;

          const rightbannerMobile = images.filter((image: any) => image.fieldname && image.fieldname.includes('right_banner_mobile')) as Express.Multer.File[];
          const rightbannerMobileItems = await Promise.all(rightbannerMobile.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.right_banner_mobile[index] ? updateDto.right_banner_mobile[index].link : '',
          })));
          plutoshomeData.right_banner_mobile = rightbannerMobileItems;

          const rechargeleftBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('recharge_left_banner')) as Express.Multer.File[];
          const rechargeleftBannerItems = await Promise.all(rechargeleftBanner.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.recharge_left_banner[index] ? updateDto.recharge_left_banner[index].link : '',
          })));
          plutoshomeData.recharge_left_banner = rechargeleftBannerItems;

          const rechargerightBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('recharge_right_banner')) as Express.Multer.File[];
          const rechargerightBannerItems = await Promise.all(rechargerightBanner.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.recharge_right_banner[index] ? updateDto.recharge_right_banner[index].link : '',
          })));
          plutoshomeData.recharge_right_banner = rechargerightBannerItems;

          const exclusiveBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('exclusive_banner')) as Express.Multer.File[];
          const exclusiveBannerItems = await Promise.all(exclusiveBanner.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.exclusive_banner[index] ? updateDto.exclusive_banner[index].link : '',
          })));
          plutoshomeData.exclusive_banner = exclusiveBannerItems;

          const primeleftBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('prime_left_banner')) as Express.Multer.File[];
          const primeleftBannerItems = await Promise.all(primeleftBanner.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.prime_left_banner[index] ? updateDto.prime_left_banner[index].link : '',
          })));
          plutoshomeData.prime_left_banner = primeleftBannerItems;

          const primerightBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('prime_right_banner')) as Express.Multer.File[];
          const primerightBannerItems = await Promise.all(primerightBanner.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.prime_right_banner[index] ? updateDto.prime_right_banner[index].link : '',
          })));
          plutoshomeData.prime_right_banner = primerightBannerItems;

          const coinBanner = images.filter((image: any) => image.fieldname && image.fieldname.includes('coins_banner')) as Express.Multer.File[];
          const coinBannerItems = await Promise.all(coinBanner.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.coins_banner[index] ? updateDto.coins_banner[index].link : '',
          })));
          plutoshomeData.coins_banner = coinBannerItems;

          const vouchers = images.filter((image: any) => image.fieldname && image.fieldname.includes('vouchers')) as Express.Multer.File[];
          const vouchersItems = await Promise.all(vouchers.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.vouchers[index] ? updateDto.vouchers[index].link : '',
          })));
          plutoshomeData.vouchers = vouchersItems;

          const partners = images.filter((image: any) => image.fieldname && image.fieldname.includes('partners')) as Express.Multer.File[];
          const partnersItems = await Promise.all(partners.map(async (imageFile, index) => ({
            logo: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
          })));
          plutoshomeData.partners = partnersItems;
          plutoshomeData.updated_at=new Date()
          await this.plutosHomeRespo.save(plutoshomeData);
        }
      } else {

        const externalData = await this.externalRespo.findOne({ where: { campaign_Id: id } });
        if (externalData) {
          externalData.campaign_Id = updateDto.campaign_Id
          externalData.ui_type = updateDto.ui_type
          externalData.disclaimer = updateDto.disclaimer
          externalData.main_heading = updateDto.main_heading
          externalData.main_subHeading = updateDto.main_subHeading
          const mainbannerDesktop = images.filter((image: any) => image.fieldname && image.fieldname.includes('main_banner_desktop')) as Express.Multer.File[];
          const mainbannerDesktopItems = await Promise.all(mainbannerDesktop.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.main_banner_desktop[index] ? updateDto.main_banner_desktop[index].link : '',
          })));
          externalData.main_banner_desktop = mainbannerDesktopItems;

          const mainbannerMobile = images.filter((image: any) => image.fieldname && image.fieldname.includes('main_banner_mobile')) as Express.Multer.File[];
          const mainbannerMobileItems = await Promise.all(mainbannerMobile.map(async (imageFile, index) => ({
            image: await uploadFile(`uploads/${imageFile.filename}`, `test/${imageFile.filename}`),
            link: updateDto.main_banner_mobile[index] ? updateDto.main_banner_mobile[index].link : '',
          })));
          externalData.main_banner_mobile = mainbannerMobileItems;
          externalData.updated_at=new Date()
          await this.externalRespo.save(externalData);
        }
      }

      return {
        success: true,
        message: 'Data updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update data',
      };
    }
  }

}
