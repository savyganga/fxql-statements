import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['sourceCurrency', 'destinationCurrency'])
export class FxqlService {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column( {length: 3} )
    sourceCurrency: string;

    @Column( {length: 3} )
    destinationCurrency: string;

    @Column({ type: 'jsonb', nullable: false, default: [] })
    fxqlEntries: { buy: number; sell: number; cap: number; created_at: string }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
