import { Controller, Get, Inject, Render, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { skipAuth } from 'src/global';
import { Response } from 'express';

@Controller('template')
export default class IndexController {
  @Inject(AppService)
  private readonly appService: AppService;

  @skipAuth()
  @Get('index')
  @Render('index')
  home() {
    return {
      title: '这是渲染模版引擎',
      name: '潼',
      age: 29,
    };
  }

  // 动态加载模板
  @skipAuth()
  @Get('dynamic')
  dynamic(@Res() res: Response) {
    return res.render(this.appService.getViewName(), {
      name: 'tong',
      age: 29,
    });
  }
}
