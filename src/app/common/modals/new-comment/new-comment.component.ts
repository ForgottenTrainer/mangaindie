import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-comment',
  imports: [],
  templateUrl: './new-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCommentComponent { }
