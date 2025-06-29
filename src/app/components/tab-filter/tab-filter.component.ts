import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MangaListComponent } from "../../pages/manga-list/manga-list.component";

@Component({
  selector: 'app-tab-filter',
  imports: [MangaListComponent],
  templateUrl: './tab-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabFilterComponent { }
