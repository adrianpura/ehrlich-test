import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'images' })
export class Images extends BaseEntity {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: Number, description: 'hits' })
  @Column()
  hits: number;

  @ApiProperty({ type: String, description: 'uri' })
  @Column({ type: 'varchar', nullable: false })
  uri: string;

  @CreateDateColumn({ type: 'datetime', select: false })
  created_at: Date;

  @CreateDateColumn({ type: 'datetime', select: false })
  updated_at: Date;
}
