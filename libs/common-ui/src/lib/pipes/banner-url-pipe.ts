import {inject, Pipe, PipeTransform} from '@angular/core'
import {Router} from '@angular/router'

@Pipe({
  name: 'bannerUrl'
})
export class BannerUrlPipe implements PipeTransform {
  router = inject(Router)

  transform(value: string | null): string | null {
    if (!value) {
      let banner

      banner = '/assets/imgs/banner-placeholder.jpg'

      return banner
    }
    return `https://icherniakov.ru/yt-course/${value}`
  }
}
