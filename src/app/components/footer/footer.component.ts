import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChangeLightDarkComponent } from "../change-light-dark/change-light-dark.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ChangeLightDarkComponent, RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent { }
