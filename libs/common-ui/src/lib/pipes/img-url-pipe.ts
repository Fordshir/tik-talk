import {inject, Pipe, PipeTransform} from '@angular/core'
import {Router} from '@angular/router'

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {
  router = inject(Router)

  transform(value: string | null): string | null {
    if (!value) {
      let avatar
      this.router.url.includes('community')
        ? (avatar = '/assets/imgs/community-placeholder.png')
        : (avatar = '/assets/imgs/avatar-placeholder.png')
      return avatar
    }
    return `https://icherniakov.ru/yt-course/${value}`
  }
}
