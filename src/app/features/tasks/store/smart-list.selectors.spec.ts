import {
  selectAnytimeTasks,
  selectLogbookTasks,
  selectSomedayTaskIds,
  selectSomedayTasks,
} from './smart-list.selectors';
import { Task } from '../task.model';
import { Project } from '../../project/project.model';

const createMockTask = (overrides: Partial<Task>): Task =>
  ({
    id: 'MOCK_TASK_ID',
    title: 'Mock Task',
    isDone: false,
    tagIds: [],
    parentId: null,
    subTaskIds: [],
    dueWithTime: null,
    dueDay: null,
    projectId: 'PROJECT_1',
    ...overrides,
  }) as Task;

const createMockProject = (overrides: Partial<Project>): Project =>
  ({
    id: 'PROJECT_1',
    title: 'Mock Project',
    taskIds: [],
    backlogTaskIds: [],
    noteIds: [],
    ...overrides,
  }) as Project;

describe('selectSomedayTaskIds', () => {
  it('collects backlogTaskIds across every project, regardless of isEnableBacklog', () => {
    const projects = [
      createMockProject({
        id: 'P1',
        backlogTaskIds: ['T1', 'T2'],
        isEnableBacklog: true,
      }),
      createMockProject({
        id: 'P2',
        backlogTaskIds: ['T3'],
        isEnableBacklog: false,
      }),
      createMockProject({ id: 'P3', backlogTaskIds: [] }),
    ];

    const result = selectSomedayTaskIds.projector(projects);

    expect(result).toEqual(new Set(['T1', 'T2', 'T3']));
  });
});

describe('selectSomedayTasks', () => {
  it('returns only top-level, undone tasks whose id is in the Someday set', () => {
    const tasks = [
      createMockTask({ id: 'T1' }),
      createMockTask({ id: 'T2', isDone: true }),
      createMockTask({ id: 'T3', parentId: 'T1' }),
      createMockTask({ id: 'T4' }),
    ];
    const somedayIds = new Set(['T1', 'T2', 'T3']);

    const result = selectSomedayTasks.projector(tasks, somedayIds);

    expect(result.map((t) => t.id)).toEqual(['T1']);
  });
});

describe('selectAnytimeTasks', () => {
  it('returns undated, undone, top-level tasks that are not in Someday', () => {
    const tasks = [
      createMockTask({ id: 'T1' }),
      createMockTask({ id: 'T2', dueDay: '2026-01-01' }),
      createMockTask({ id: 'T3', dueWithTime: 123 }),
      createMockTask({ id: 'T4', isDone: true }),
      createMockTask({ id: 'T5', parentId: 'T1' }),
      createMockTask({ id: 'T6' }),
    ];
    const somedayIds = new Set(['T6']);

    const result = selectAnytimeTasks.projector(tasks, somedayIds);

    expect(result.map((t) => t.id)).toEqual(['T1']);
  });
});

describe('selectLogbookTasks', () => {
  it('returns only top-level done tasks, most recently finished first', () => {
    const tasks = [
      createMockTask({ id: 'T1', isDone: true, doneOn: 100 }),
      createMockTask({ id: 'T2' }),
      createMockTask({ id: 'T3', isDone: true, doneOn: 300 }),
      createMockTask({ id: 'T4', isDone: true, doneOn: 200, parentId: 'T3' }),
    ];

    const result = selectLogbookTasks.projector(tasks);

    expect(result.map((t) => t.id)).toEqual(['T3', 'T1']);
  });
});
