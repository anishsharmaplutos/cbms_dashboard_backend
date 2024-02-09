import { Controller, Post, Body, UploadedFiles, UseInterceptors, Get, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import * as multer from 'multer';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';

@Controller("dash")
export class AppController {
  constructor(private readonly appService: AppService) {}

    //  create Dash
    @Post("/create")
    @UseInterceptors(AnyFilesInterceptor({
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
        },
      }),
    }))
    async create(@UploadedFiles() images: Array<Express.Multer.File>,
      @Body() createDto: any,) {  
      return this.appService.create(images, createDto)
  
    }

    //  retrieving all dash detail from db 
  @Get("/getAll")
  findAll() {
    return this.appService.findAll();
  }


      //  retrieving particular  dash detail from db based on id 
  @Get('/getParticular/:id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(id);
  }
 //  update created dash through id 
 @Patch('/update/:id')
 @UseInterceptors(AnyFilesInterceptor({
   storage: multer.diskStorage({
     destination: './uploads',
     filename: (req, file, cb) => {
       cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
     },
   }),
 }))
 update(@Param('id') id: string, @UploadedFiles() images: Array<Express.Multer.File>,
 @Body() updatdeDto: any) {
   return this.appService.update(id, images,updatdeDto);
 }
}
