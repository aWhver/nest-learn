import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    comment: '用户名',
    length: 50,
    unique: true,
  })
  userName: string;

  @Column({
    type: 'varchar',
    comment: '密码',
    // 控制该属性是否可以返回
    // select: false,
    length: 60,
  })
  password: string;

  @Column({
    type: 'int',
    comment: '年龄',
    default: 0,
  })
  age: number;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
