import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private filesService: FilesService,
  ) {}

  async createPost(createPostDto: CreatePostDto, image) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRepository.create({
      ...createPostDto,
      title: fileName,
    });
    return post;
  }
}
