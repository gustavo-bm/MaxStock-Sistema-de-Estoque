import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity('users')
  class User {
      @PrimaryGeneratedColumn('increment')
      id: number
  
      @Column('varchar', { length: 100, nullable: false })
      name: string;
  
      @Column('varchar', { length: 100, nullable: false })
      email: string;

      @Column('varchar', { length: 100, nullable: false })
      password: string;
  
      @CreateDateColumn()
      created_at: Date;

      @UpdateDateColumn()
      updated_at: Date;
  }
  
  export default User;