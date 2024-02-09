import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class HeaderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  left_nav_logo: string;


  @Column('jsonb', { nullable: true })
  nav_lists: {
    text: string;
    link: string;
  }[];

  @Column()
  nav_right_logo: string;

  @Column()
  campaign_Id: string;

  @Column()
  ui_type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}
