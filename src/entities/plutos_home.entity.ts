import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PlutosHomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: true })
  right_banner_desktop: {
    image: string;
    link: string;
  }[];

  @Column('jsonb', { nullable: true })
  right_banner_mobile: {
    image: string;
    link: string;
  }[];

  @Column()
  rechange_heading: string;

  @Column()
  rechange_subHeading: string;

  @Column('jsonb', { nullable: true })
  recharge_left_banner: {
    image: string;
    link: string;
  }[];

  @Column('jsonb', { nullable: true })
  recharge_right_banner: {
    image: string;
    link: string;
  }[];

  @Column()
  exclusive_heading: string;

  @Column()
  exclusive_subHeading: string;

  @Column('jsonb', { nullable: true })
  exclusive_banner: {
    image: string;
    link: string;
  }[];

  @Column()
  prime_heading: string;

  @Column()
  prime_subHeading: string;

  @Column('jsonb', { nullable: true })
  prime_left_banner: {
    image: string;
    link: string;
  }[];

  @Column('jsonb', { nullable: true })
  prime_right_banner: {
    image: string;
    link: string;
  }[];

  @Column('jsonb', { nullable: true })
  coins_banner: {
    image: string;
    link: string;
  }[];

  @Column()
  coins_heading: string;

  @Column()
  coins_subHeading: string;

  @Column('jsonb', { nullable: true })
  vouchers: {
    image: string;
    link: string;
  }[];

  @Column()
  disclaimer: string;

  @Column()
  partners_heading: string;

  @Column()
  partners_subHeading: string;

  @Column('jsonb', { nullable: true })
  partners: {
    logo: string;
  }[];

  @Column()
  campaign_Id: string;

  @Column()
  ui_type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}
