import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'images' })
export class Images extends BaseEntity {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  hits: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  uri: string;

  @ApiProperty()
  @CreateDateColumn({ select: false })
  created_at: Date;

  @ApiProperty()
  @CreateDateColumn({ select: false })
  updated_at: Date;
}
