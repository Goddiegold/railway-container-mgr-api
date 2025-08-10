import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { ContainerService } from './container.service';
import { SpinupContainerDTO } from 'src/dto';

@Controller('v1/container')
export class ContainerController {
  constructor(private readonly containersService: ContainerService) { }

  @Post('/spin-up')
  spinUp(@Body() body: SpinupContainerDTO) {
    return this.containersService.spinUp({
      branch: body?.branchName,
      repo: body?.repoFullName,
    });
  }

  @Delete('/spin-down/:serviceId')
  spinDown(@Param('serviceId') serviceId: string) {
    return this.containersService.spinDown({ serviceId });
  }

  @Get('/:serviceId')
  getService(@Param('serviceId') serviceId: string) {
    return this.containersService.getService({ serviceId });
  }
}
