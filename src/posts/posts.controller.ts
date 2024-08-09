import {
  Body,
  Controller,
  Post,
  UploadedFile,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image,
    @Request() req,
  ) {
    return this.postsService.createPost(createPostDto, image);
  }
}
