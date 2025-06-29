import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabFilterComponent } from "../../components/tab-filter/tab-filter.component";
import { GendersComponent } from "../../components/genders/genders.component";

@Component({
  selector: 'app-home',
  imports: [TabFilterComponent, GendersComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
