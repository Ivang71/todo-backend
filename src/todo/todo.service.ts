import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { instanceToPlain } from 'class-transformer'
import { Repository } from 'typeorm'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo } from './entities/todo.entity'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  public async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find()
  }

  public async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id })
    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`)
    }
    return todo
  }

  public async create(createTodoDto: CreateTodoDto) {
    const newTodo = instanceToPlain(createTodoDto) as Todo
    const saveResult = this.todoRepository.save(newTodo)
    console.log(`todoService.create returns ${saveResult}`)
    return saveResult
  }

  public async update(id: string, updateTodoDto: UpdateTodoDto) {
    const updateResult = await this.todoRepository.update(id, updateTodoDto)

    if (!updateResult) {
      throw new NotFoundException(`Todo #${id} not found`)
    }
    console.log(`todoService.update returns ${updateResult}`)

    return updateResult
  }

  public async delete(id: string) {
    const deleteResult = await this.todoRepository.delete(id)
    console.log(`todoService.delete returns ${deleteResult}`)
    return deleteResult
  }
}
