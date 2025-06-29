import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-manga',
  imports: [RouterLink],
  templateUrl: './card-manga.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMangaComponent { }
