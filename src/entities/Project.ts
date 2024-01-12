import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  slug: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: string

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }
}
