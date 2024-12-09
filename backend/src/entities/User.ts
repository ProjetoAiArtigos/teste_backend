import { Entity, Column } from "typeorm"
import { MyBaseEntity } from "../helpers/BaseEntity"

@Entity()
export class User extends MyBaseEntity {
    @Column({
        length: 100,
    })
    name: string

    @Column({ length: 256 })
    email: string

    @Column()
    password: string

    @Column("integer")
    role: number

    @Column()
    rg: string

    @Column()
    isActived: boolean
}