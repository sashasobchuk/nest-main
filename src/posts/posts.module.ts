import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/model';
import { Role } from '../roles/model';
import { UserRoles } from '../roles/user-roles.model';
import { FilesModule } from '../files/files.module';
import { Post } from './post.model';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    FilesModule,
  ],
})
export class PostsModule {}
