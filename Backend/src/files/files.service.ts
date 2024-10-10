import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}
  AWS_S3_BUCKET = 'hackaton-psk';
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadFile(file, applicationId: number) {
    const existingApplication = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!existingApplication) {
      return new NotFoundException('Application does not exist');
    }

    const originalname = new Date().toISOString() + file.originalname;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
      applicationId,
    );
  }

  async s3_upload(file, bucket, name, mimetype, applicationId) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();

      const { Key } = s3Response;
      return this.createFile(Key, applicationId);
    } catch (e) {
      console.log(e);
    }
  }

  async createFile(key: string, applicationId) {
    await this.deleteAllApplicationFile(applicationId);

    return this.prisma.file.create({
      data: {
        name: key,
        upload_date: new Date().toISOString(),
        applicationId: +applicationId,
      },
    });
  }

  async deleteFile(id: number) {
    try {
      await this.prisma.file.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      return new NotFoundException('File not found');
    }
  }

  async deleteAllApplicationFile(id: number) {
    try {
      await this.prisma.file.deleteMany({
        where: {
          applicationId: id,
        },
      });
    } catch (err) {
      return new NotFoundException('File not found');
    }
  }
}
