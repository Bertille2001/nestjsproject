import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionStatus } from './transaction-status.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PENDING })
  
  status: TransactionStatus;

  
}