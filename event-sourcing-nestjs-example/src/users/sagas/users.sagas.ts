import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { UserCreatedEvent } from '../events/impl/user-created.event';

@Injectable()
export class UsersSagas {
  // private logger = new Logger('UsersSagas');
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    // this.logger.verbose('userCreated อิอิ');
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map((event) => {
        console.log(clc.redBright('Inside [UsersSagas] Saga'));
        return new CreateUserCommand(event.name, event.email);
      }),
    );
  };
}
