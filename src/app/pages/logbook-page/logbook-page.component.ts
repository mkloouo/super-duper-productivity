import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { T } from '../../t.const';
import { SmartTaskListComponent } from '../smart-task-list/smart-task-list.component';
import { selectLogbookTasks } from '../../features/tasks/store/smart-list.selectors';

@Component({
  selector: 'logbook-page',
  template: `
    <smart-task-list
      [tasks]="tasks()"
      icon="check_circle"
      [emptyMessage]="T.MH.LOGBOOK_EMPTY"
    ></smart-task-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SmartTaskListComponent],
})
export class LogbookPageComponent {
  private readonly _store = inject(Store);
  T: typeof T = T;
  readonly tasks = toSignal(this._store.select(selectLogbookTasks), {
    initialValue: [],
  });
}
