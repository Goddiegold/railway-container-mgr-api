import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ContainerService } from './container.service';
import { SpinupContainerDTO } from 'src/dto';

@Controller('v1/container')
export class ContainerController {
  constructor(private readonly containersService: ContainerService) { }

  @Post('/spin-up')
  spinUp(@Body() body: SpinupContainerDTO) {
    return this.containersService.spinUp({
      projectId: body?.projectId,
      branch: body?.branchName,
      repo: body?.repoFullName,
    });
  }

  @Post('/spin-down')
  spinDown(@Param('serviceId') serviceId: string) {
    return this.containersService.spinDown({ serviceId });
  }

  @Get('/status/:serviceId')
  getStatus(@Param('serviceId') serviceId: string) {
    return this.containersService.getStatus({ serviceId });
  }
}
