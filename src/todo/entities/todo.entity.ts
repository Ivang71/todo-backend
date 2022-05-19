import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column('integer', { unique: true })
  position: number

  @Column('text')
  text: string

  @Column('boolean')
  completed: boolean

  constructor(text: string, completed: boolean) {}
}
