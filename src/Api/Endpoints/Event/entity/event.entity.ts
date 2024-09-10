import { Entity, PrimaryGeneratedColumn, Column,UpdateDateColumn, DeleteDateColumn, ManyToOne, Index } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../user/entity/user.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidV4();

  @Column()
  location: string;

  @Column()
  dateEvent: Date;

  @Column()
  organization: string;

  @Column()
  eventDays: number;

  @Column()
  eventPrice: number;

  @Column({
    type: "uuid",
    nullable: false,
    unique: false,
    foreignKeyConstraintName: "fk_event_user",
  })
  @Index()
  userId: string;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}