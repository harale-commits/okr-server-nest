import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import axios from 'axios';

describe('Hello world(Integration test)', () => {
  let app: INestApplication;
  const PORT = 3000;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should @Get response from the hello world module', async () => {
    const response = await request(app.getHttpServer()).get('/hello-world');
    expect(response.text).toBe('hello world');
  });
});
