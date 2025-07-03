import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListMangaComponent } from "../../components/list-manga/list-manga.component";
import { InfoMangaComponent } from "../../components/info-manga/info-manga.component";
import { CommentsComponent } from "../../components/comments/comments.component";

@Component({
  selector: 'app-manga',
  imports: [ListMangaComponent, InfoMangaComponent, CommentsComponent],
  templateUrl: './manga.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaComponent { }
