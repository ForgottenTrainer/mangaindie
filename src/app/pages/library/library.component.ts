import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MangaListComponent } from "../manga-list/manga-list.component";

@Component({
  selector: 'app-library',
  imports: [MangaListComponent],
  templateUrl: './library.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent { }
