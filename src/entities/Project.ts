import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {StatusEnum} from "../enums/status-enum";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.OPEN,
    })
    status: StatusEnum

    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        this.slug = this.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }
}