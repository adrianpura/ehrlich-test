import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, description: 'Email' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty({ type: String, description: 'Password' })
  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @CreateDateColumn({ type: 'datetime', select: false })
  created_at?: Date;

  @CreateDateColumn({ type: 'datetime', select: false })
  updated_at?: Date;
}
