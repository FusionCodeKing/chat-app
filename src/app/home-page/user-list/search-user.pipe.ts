import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser',
  pure: false
})
export class SearchUserPipe implements PipeTransform {
  transform(items, query: string): any {
    if (!items) return [];
    let result = Object.keys(items).map((key: any) => {
      return items[key];
    });
    if (!query) return result;
    let sb: string = '^';
    query.split(' ').forEach(keyword => {
      sb += '(?=.*';
      sb += keyword;
      sb += ')';
    });
    sb += '.+';
    return result.filter(item => {
      return (
        item.displayName.search(new RegExp(sb, 'i')) != -1
      );
    });
  }
}
