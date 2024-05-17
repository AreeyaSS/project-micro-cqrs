import { StorableEvent } from 'event-sourcing-nestjs';

export class UserCreatedEvent extends StorableEvent {

    eventAggregate = 'user';
    // eventVersion จะกำหนดเลข version สำหรับรูปแบบ schema เช่น
    // ข้อมูล create, update มีรูปแบบข้อมูลเหมือนกัน 
    // คือ มี id, name, email, created, updated จึงใส่เป็น version = 1
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly created: Date,
    ) {
        super();
    }
}
