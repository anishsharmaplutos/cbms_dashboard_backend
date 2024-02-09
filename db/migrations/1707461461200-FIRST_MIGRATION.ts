import { MigrationInterface, QueryRunner } from "typeorm";

export class FIRSTMIGRATION1707461461200 implements MigrationInterface {
    name = 'FIRSTMIGRATION1707461461200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "footer_entity" ("id" SERIAL NOT NULL, "footer_logo" character varying NOT NULL, "social_media" jsonb, "customer_support" jsonb, "brand_partners" jsonb, "quick_links" jsonb, "bank_partners" jsonb, "copy_right" character varying NOT NULL, "campaign_Id" character varying NOT NULL, "ui_type" character varying NOT NULL, CONSTRAINT "PK_39596900b47011eb2f460022f4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "external_entity" ("id" SERIAL NOT NULL, "main_banner_desktop" jsonb, "main_banner_mobile" jsonb, "main_heading" character varying NOT NULL, "main_subHeading" character varying NOT NULL, "disclaimer" character varying NOT NULL, "campaign_Id" character varying NOT NULL, "ui_type" character varying NOT NULL, CONSTRAINT "PK_13f39561ec948a0801b6168afb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plutos_home_entity" ("id" SERIAL NOT NULL, "right_banner_desktop" jsonb, "right_banner_mobile" jsonb, "rechange_heading" character varying NOT NULL, "rechange_subHeading" character varying NOT NULL, "recharge_left_banner" jsonb, "recharge_right_banner" jsonb, "exclusive_heading" character varying NOT NULL, "exclusive_subHeading" character varying NOT NULL, "exclusive_banner" jsonb, "prime_heading" character varying NOT NULL, "prime_subHeading" character varying NOT NULL, "prime_left_banner" jsonb, "prime_right_banner" jsonb, "coins_banner" jsonb, "coins_heading" character varying NOT NULL, "coins_subHeading" character varying NOT NULL, "vouchers" jsonb, "disclaimer" character varying NOT NULL, "partners_heading" character varying NOT NULL, "partners_subHeading" character varying NOT NULL, "partners" jsonb, "campaign_Id" character varying NOT NULL, "ui_type" character varying NOT NULL, CONSTRAINT "PK_923f1536338714c09173aa7c3e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "header_entity" ("id" SERIAL NOT NULL, "left_nav_logo" character varying NOT NULL, "nav_lists" jsonb, "nav_right_logo" character varying NOT NULL, "campaign_Id" character varying NOT NULL, "ui_type" character varying NOT NULL, CONSTRAINT "PK_e368e8ebb6c016ae20d06a09223" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "header_entity"`);
        await queryRunner.query(`DROP TABLE "plutos_home_entity"`);
        await queryRunner.query(`DROP TABLE "external_entity"`);
        await queryRunner.query(`DROP TABLE "footer_entity"`);
    }

}
