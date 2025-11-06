import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "timeAgo",
})
export class TimeAgoPipe implements PipeTransform {
  private declension(number: number, one: string, few: string, many: string): string {
    const n = number % 100;
    if (n >= 11 && n <= 14) return many;
    const n1 = number % 10;
    if (n1 === 1) return one;
    if (n1 >= 2 && n1 <= 4) return few;
    return many;
  }

  private formatDate(date: Date): string {
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0'); // месяцы с 0
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }

  transform(value: string | null): string {
    if (!value) return "";

    const currentDate = Date.now();
    const date = new Date(value);
    const offsetInMs = date.getTimezoneOffset() * 60 * 1000;
    const postDate = date.getTime() - offsetInMs;
    const ms = currentDate - postDate;

    let answer = "";
    let number = 0;

    if (ms < 60000) {
      answer = "меньше минуты назад";
    } else if (ms < 3600000) {
      number = Math.floor(ms / 60000);
      answer = `${number} ${this.declension(number, "минута", "минуты", "минут")} назад`;
    } else if (ms < 86400000) {
      number = Math.floor(ms / 3600000);
      answer = `${number} ${this.declension(number, "час", "часа", "часов")} назад`;
    } else if (ms < 604800000) {
      number = Math.floor(ms / 86400000);
      answer = `${number} ${this.declension(number, "день", "дня", "дней")} назад`;
    } else {
      answer = this.formatDate(date);
    }

    return answer;
  }
}
