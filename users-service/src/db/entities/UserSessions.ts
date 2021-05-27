import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("userSessions")
export default class UserSession {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "char", length: "36" })
  userId: string;

  @CreateDateColumn()
  createdAt: string;

  @Column("datetime")
  expiresAt: string;
}
