import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodosDto } from './dto/delete-todos.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoService } from './todo.service'

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  public async getAll(@Res() res) {
    const todos = await this.todoService.findAll()
    return res.status(HttpStatus.OK).json(todos)
  }

  @Get(':id')
  public async getOne(@Res() res, @Param('id') id: number) {
    const todo = await this.todoService.findOne(id)
    if (!todo) {
      throw new NotFoundException('Todo does not exist!')
    }
    return res.status(HttpStatus.OK).json(todo)
  }

  @Post()
  public async add(@Res() res, @Body() createTodoDto: CreateTodoDto) {
    try {
      const todo = await this.todoService.create(createTodoDto)
      return res.status(HttpStatus.OK).json(todo)
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err.detail || 'Error: Todo not created!',
      })
    }
  }

  @Put(':id')
  public async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    try {
      const todo = await this.todoService.update(id, updateTodoDto)
      if (!todo) {
        throw new NotFoundException('Todo does not exist!')
      }
      return res.status(HttpStatus.OK).json()
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err.detail || 'Error: Todo not updated!',
      })
    }
  }

  @Delete()
  public async delete(@Res() res, @Body() deleteTodosDto: DeleteTodosDto) {
    const deleteResult = await this.todoService.delete(deleteTodosDto.ids)
    if (!deleteResult.affected) {
      throw new NotFoundException('No todos were deleted')
    }
    return res.status(HttpStatus.OK).json({
      message: 'Todos has been deleted',
    })
  }
}
