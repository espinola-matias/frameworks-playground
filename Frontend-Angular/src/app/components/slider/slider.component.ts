import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slider',
  imports: [RouterLink],
  template: `
    <div id="slider" [class.slider-big]="size() === 'big'" [class.slider-small]="size() === 'small'">
      <h1>{{ title() }}</h1>
      @if (btnText() && btnUrl()) {
        <a [routerLink]="btnUrl()" class="btn-white">{{ btnText() }}</a>
      }
    </div>
  `
})
export class SliderComponent {
  readonly title = input.required<string>();
  readonly size = input<'big' | 'small'>('big');
  readonly btnText = input<string | undefined>();
  readonly btnUrl = input<string | undefined>();
}
