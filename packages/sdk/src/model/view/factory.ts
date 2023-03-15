import type { IViewVo, IViewSnapshot } from '@teable-group/core';
import { assertNever, ViewType } from '@teable-group/core';
import type { Doc } from '@teable/sharedb/lib/client';
import { plainToInstance } from 'class-transformer';
import { GridView } from './grid.view';
import { KanbanView } from './kanban.view';

export function createViewInstance(view: IViewVo, doc?: Doc<IViewSnapshot>) {
  const instance = (() => {
    switch (view.type) {
      case ViewType.Grid:
        return plainToInstance(GridView, view);
      case ViewType.Kanban:
        return plainToInstance(KanbanView, view);
      case ViewType.Calendar:
      case ViewType.Form:
      case ViewType.Gallery:
      case ViewType.Gantt:
        throw new Error('did not implement yet');
      default:
        assertNever(view.type);
    }
  })();

  // force inject object into instance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const temp: any = instance;
  temp.doc = doc;

  return instance;
}

export type IViewInstance = ReturnType<typeof createViewInstance>;
