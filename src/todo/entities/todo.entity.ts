import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ orderBy: { position: 'ASC' } })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column('integer', { unique: true })
  position: number

  @Column('text')
  text: string

  @Column('boolean')
  completed: boolean

  @Column('timestamptz')
  createdAt: Date

  constructor(text: string, completed: boolean) {}
}
