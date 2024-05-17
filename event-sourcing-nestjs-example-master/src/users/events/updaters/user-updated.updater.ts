import { Redisk } from 'redisk';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { User } from 'src/users/entities/user.entity';
import { UserUpdatedEvent } from '../impl/user-updated.event';

@ViewUpdaterHandler(UserUpdatedEvent)
export class UserUpdatedUpdater implements IViewUpdater<UserUpdatedEvent> {

    constructor(
        private readonly redisk: Redisk,
    ) {
    }

    async handle(event: UserUpdatedEvent) {
        try {
            const user = await this.redisk.getOne<User>(User, event.id);
            if (!user) {
                console.error("Redis: User not found");
                return;
            }
            Object.assign(user, event);
            await this.redisk.save<User>(user);
            console.log("Redis: User updated successfully");
        } catch (error) {
            console.error("Redis: ", error);
        }
    }
}
