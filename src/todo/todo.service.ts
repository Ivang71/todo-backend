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
    newTodo.createdAt = new Date()
    await this.todoRepository.save(newTodo)
    return newTodo
  }

  public async update(id: string, updateTodoDto: UpdateTodoDto) {
    const updateResult = await this.todoRepository.update(id, updateTodoDto)
    if (!updateResult) {
      throw new NotFoundException(`Todo #${id} not found`)
    }
    return updateResult
  }

  public async delete(ids: string | number[]) {
    return this.todoRepository.delete(ids)
  }
}
