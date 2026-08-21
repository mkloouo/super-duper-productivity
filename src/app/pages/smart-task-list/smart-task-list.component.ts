import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../../features/tasks/task.model';
import { PlannerTaskComponent } from '../../features/planner/planner-task/planner-task.component';
import { standardListAnimation } from '../../ui/animations/standard-list.ani';

/**
 * Shared read layout for the Anytime/Someday smart lists: both are a flat,
 * cross-project list of tasks with no due-date column to show, differing
 * only in which selector feeds them and their icon/empty copy.
 */
@Component({
  selector: 'smart-task-list',
  templateUrl: './smart-task-list.component.html',
  styleUrl: './smart-task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [standardListAnimation],
  imports: [TranslatePipe, MatIcon, PlannerTaskComponent],
})
export class SmartTaskListComponent {
  readonly tasks = input.required<Task[]>();
  readonly icon = input.required<string>();
  readonly emptyMessage = input.required<string>();
}
