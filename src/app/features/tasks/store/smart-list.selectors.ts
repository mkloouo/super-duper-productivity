import { createSelector } from '@ngrx/store';
import { Task } from '../task.model';
import { selectAllTasksInActiveProjects } from './task.selectors';
import { selectUnarchivedProjects } from '../../project/store/project.selectors';

/**
 * "Someday" reuses the existing per-project Backlog list (`backlogTaskIds`)
 * rather than a new persisted field, so this fork stays wire-compatible with
 * mainstream data. A task only lands here once a user explicitly moves it
 * to a project's backlog.
 */
export const selectSomedayTaskIds = createSelector(
  selectUnarchivedProjects,
  (projects): Set<string> => {
    const ids = new Set<string>();
    for (const project of projects) {
      for (const id of project.backlogTaskIds) {
        ids.add(id);
      }
    }
    return ids;
  },
);

export const selectSomedayTasks = createSelector(
  selectAllTasksInActiveProjects,
  selectSomedayTaskIds,
  (tasks, somedayIds): Task[] =>
    tasks.filter((t) => !t.parentId && !t.isDone && somedayIds.has(t.id)),
);

/**
 * "Anytime" — active, undated, top-level tasks that are not sitting in
 * Someday (a project's backlog). Everything not in Today/Upcoming/Someday.
 */
export const selectAnytimeTasks = createSelector(
  selectAllTasksInActiveProjects,
  selectSomedayTaskIds,
  (tasks, somedayIds): Task[] =>
    tasks.filter(
      (t) =>
        !t.parentId && !t.isDone && !t.dueDay && !t.dueWithTime && !somedayIds.has(t.id),
    ),
);

/**
 * "Logbook" — completed tasks, most recently finished first. This only
 * covers tasks still in the live task store; tasks the archive-compaction
 * job has already moved out are not included (out of scope for now — would
 * need to read the separate ArchiveTask store).
 */
export const selectLogbookTasks = createSelector(
  selectAllTasksInActiveProjects,
  (tasks): Task[] =>
    tasks
      .filter((t) => !t.parentId && t.isDone)
      .sort((a, b) => (b.doneOn ?? 0) - (a.doneOn ?? 0)),
);
