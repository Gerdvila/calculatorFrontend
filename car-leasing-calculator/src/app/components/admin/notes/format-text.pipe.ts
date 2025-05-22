import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText',
  standalone: true
})
export class FormatTextPipe implements PipeTransform {

  transform(text: string): string {
    return text ? text.replace(/\n/g, '<br>') : text;
  }

}
