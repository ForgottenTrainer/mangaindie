import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardMangaComponent } from "../../components/card-manga/card-manga.component";

@Component({
  selector: 'app-manga-list',
  imports: [CardMangaComponent],
  templateUrl: './manga-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaListComponent { }
