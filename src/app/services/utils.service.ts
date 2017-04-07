import {Injectable} from "@angular/core";

@Injectable()
export class Utils {
  titles: string[] = ['Mr', 'Mrs', 'Ms', 'Mx', 'Miss', 'Master', 'Maid', 'Madam'];

  constructor() {
  }

  getDisplayName(user) {
    return user.company + ' / ' + user.lastname + ' / ' + user.name + ' / ' + user.title;
  }
}
