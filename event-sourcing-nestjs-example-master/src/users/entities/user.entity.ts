import { Entity } from 'redisk';
import { Primary } from 'redisk';
import { Property } from 'redisk';
import { Unique } from 'redisk';

@Entity('user')
export class User {

  @Primary()
  @Property()
  public readonly id: string;

  @Property({searchable: true})
  public name: string;

  @Unique()
  @Property()
  public email: string;

  @Property({indexed: true})
  public readonly created: Date;

  @Property({indexed: true})
  public readonly updated?: Date;

  constructor(
      id: string,
      name: string,
      email: string,
      created: Date,
      updated?: Date,
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.created = created;
      this.updated = updated ?? created;
  }
}
