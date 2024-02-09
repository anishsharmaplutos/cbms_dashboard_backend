import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class FooterEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  footer_logo: string;


  @Column('jsonb', { nullable: true })
  social_media: {
    logo: string;
    link: string;
  }[];


  @Column('jsonb', { nullable: true })
  customer_support: {
    text: string;
    value: string;
  }[];

  @Column('jsonb', { nullable: true })
  brand_partners: {
    text: string;
    link: string;
  }[];

  @Column('jsonb', { nullable: true })
  quick_links: {
    text: string;
    link: string;
  }[];


  @Column('jsonb', { nullable: true })
  bank_partners: {
    text: string;
    link: string;
  }[];

  @Column()
  copy_right: string;

  @Column()
  campaign_Id: string;

  @Column()
  ui_type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;



}
