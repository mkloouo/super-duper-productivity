import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { T } from '../../t.const';
import { SmartTaskListComponent } from '../smart-task-list/smart-task-list.component';
import { selectSomedayTasks } from '../../features/tasks/store/smart-list.selectors';

@Component({
  selector: 'someday-page',
  template: `
    <smart-task-list
      [tasks]="tasks()"
      icon="inventory_2"
      [emptyMessage]="T.MH.SOMEDAY_EMPTY"
    ></smart-task-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SmartTaskListComponent],
})
export class SomedayPageComponent {
  private readonly _store = inject(Store);
  T: typeof T = T;
  readonly tasks = toSignal(this._store.select(selectSomedayTasks), {
    initialValue: [],
  });
}
