import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { ApplicationDto } from './dtos/application.dto';
import { FilesService } from 'src/files/files.service';
import { ContactService } from 'src/contact/contact.service';
import { DeleteApplicationDto } from './dtos/delete-application.dto';
import { EditApplicationDto } from './dtos/edit-application.dto';

const exampleApplicationObject = {
  id: 1,
  team_name: 'aaa',
  desc: 'aaa',
};

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let service: ApplicationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [
        ApplicationService,
        PrismaService,
        FilesService,
        ContactService,
      ],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add application', async () => {
    const dto: CreateApplicationDto = new CreateApplicationDto();
    const file = new Blob([''], { type: 'text/html' });

    jest
      .spyOn(service, 'createApplication')
      .mockResolvedValueOnce(new ApplicationDto(exampleApplicationObject));

    expect(await controller.addApplication(file, dto)).toStrictEqual(
      new ApplicationDto(exampleApplicationObject),
    );
  });

  it('should return all applications', async () => {
    const expectedApplications = [];

    jest
      .spyOn(service, 'getAllApplications')
      .mockResolvedValueOnce(expectedApplications);

    expect(await controller.getAllAplications()).toBe(expectedApplications);
  });

  it('should delete application', async () => {
    const dto: DeleteApplicationDto = new DeleteApplicationDto();

    jest.spyOn(service, 'deleteApplication').mockResolvedValueOnce(undefined);

    expect(await controller.deleteApplication(dto)).toBe(undefined);
  });

  it('should edit application', async () => {
    const id: number = 1;
    const dto: EditApplicationDto = new EditApplicationDto();

    const app = { id: 1, team_name: '123', desc: '123' };

    jest.spyOn(service, 'editApplication').mockResolvedValueOnce(app);

    expect(await controller.editApplication(id, dto)).toStrictEqual(app);
  });
});
