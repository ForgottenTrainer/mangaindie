import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'change-light-dark',
  imports: [],
  templateUrl: './change-light-dark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLightDarkComponent { }
