import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { T } from '../../t.const';
import { SmartTaskListComponent } from '../smart-task-list/smart-task-list.component';
import { selectAnytimeTasks } from '../../features/tasks/store/smart-list.selectors';

@Component({
  selector: 'anytime-page',
  template: `
    <smart-task-list
      [tasks]="tasks()"
      icon="wb_twilight"
      [emptyMessage]="T.MH.ANYTIME_EMPTY"
    ></smart-task-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SmartTaskListComponent],
})
export class AnytimePageComponent {
  private readonly _store = inject(Store);
  T: typeof T = T;
  readonly tasks = toSignal(this._store.select(selectAnytimeTasks), {
    initialValue: [],
  });
}
