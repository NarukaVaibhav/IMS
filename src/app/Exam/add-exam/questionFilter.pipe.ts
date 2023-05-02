import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'questionSearch'
})
export class QuestionFilter implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = ((val.difficulity.toLocaleLowerCase().includes(args) || val.difficulity.includes(args))|| (val.type.toLocaleLowerCase().includes(args) || val.type.includes(args)) || (val.section.toLocaleLowerCase().includes(args) || val.section.includes(args)) || (val.source.toLocaleLowerCase().includes(args) || val.source.includes(args))|| (val.question.toLocaleLowerCase().includes(args) || val.question.includes(args)));
      return rVal;
    })

  }

}  