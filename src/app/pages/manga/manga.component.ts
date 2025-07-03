import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListMangaComponent } from "../../components/list-manga/list-manga.component";

@Component({
  selector: 'app-manga',
  imports: [ListMangaComponent],
  templateUrl: './manga.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaComponent { }
