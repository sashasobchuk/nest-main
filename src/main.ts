import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// https://www.youtube.com/watch?v=dDeWWQWMM-Y&t=654s
//todo configure docker docker-compose

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Main base nest')
    .setTitle('Just base project, postgresql sequelize')
    .setVersion('1')
    .addTag('sasha')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // app.useGlobalGuards(JwtAuthGuard)
  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => {
    console.log(`server was started on port ${PORT}`);
  });
}

bootstrap();
