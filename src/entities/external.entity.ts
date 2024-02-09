import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ExternalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: true })
  main_banner_desktop: {
    image: string;
    link: string;
  }[];

  @Column('jsonb', { nullable: true })
  main_banner_mobile: {
    image: string;
    link: string;
  }[];

  @Column()
  main_heading: string;

  @Column()
  main_subHeading: string;

  @Column()
  disclaimer: string;

  @Column()
  campaign_Id: string;
  
  @Column()
  ui_type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}
