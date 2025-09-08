import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return '';

    const currentDate = new Date().getTime();
    const date = new Date(value);
    const offsetInMs = date.getTimezoneOffset() * 60 * 1000;
    const postDate = new Date(value).getTime() - offsetInMs;
    const ms = currentDate - postDate;
    let answer = ''
    let mhd = ''
    let number = 0

    if (ms < 60000) {
      answer = 'меньше минуты назад';
    }
    else if (ms > 60000 && ms < 3600000) {
      number = Math.floor(ms / 60000);
      if (number % 10 === 1) {
        mhd = 'минута';
      } else if (number % 10 > 1 && number % 10 < 5 && number !== 11 && number !== 12 && number !== 13 && number !== 14) {
        mhd = 'минуты';
      } else {
        mhd = 'минут';
      }
      answer = `${number} ${mhd} назад`
    }
    else if (ms > 3600000 && ms < 86400000) {
      number = Math.floor(ms / 3600000);
      if (number%10 === 1) {
        mhd = 'час'
      }
      else if (number%10 > 1 && number%10 < 5) {
        mhd = 'часа'
      }
      else if (number%10 > 4) {
        mhd = 'часов'
      }
      answer = `${number} ${mhd} назад`
    }
    else if (ms > 86400000 && ms < 604800000) {
      number = Math.floor(ms / 86400000);
      if (number%10 === 1) {
        mhd = 'день'
      }
      else if (number%10 > 1 && number%10 < 5) {
        mhd = 'дня'
      }
      else if (number%10 > 4) {
        mhd = 'дней'
      }
      answer = `${number} ${mhd} назад`
    }

    return answer;
  }

}
