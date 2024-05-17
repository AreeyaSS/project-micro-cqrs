import { UserCreatedUpdater } from '../updaters/user-created.updater';
import { UserUpdatedUpdater } from './user-updated.updater';

export const StateUpdaters = [UserCreatedUpdater, UserUpdatedUpdater];
