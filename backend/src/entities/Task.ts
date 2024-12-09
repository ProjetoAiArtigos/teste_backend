import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { MyBaseEntity } from "../helpers/BaseEntity"
import { User } from "./User"

@Entity()
export class Task extends MyBaseEntity {
    @Column({
        length: 100,
    })
    name: string

    @Column({
        length: 300,
    })
    description: string

    @ManyToOne((type) => User)
    @JoinColumn()
    createdBy: User

    @ManyToOne((type) => User)
    @JoinColumn()
    finishedBy: User

    @Column("integer")
    priority: number

    @Column({ type: 'timestamptz' })
    overdueAt: Date

    @Column({ type: 'timestamptz', nullable: true })
    finishedDate: Date

    @Column()
    isFinished: boolean

    @Column()
    isActived: boolean
}