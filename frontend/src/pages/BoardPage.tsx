import { useState, useEffect } from "react";
import type { List, Task } from "../types/api";
import { createList } from "../api/endpoints/Lists";
import { updateTaskPosition } from "../api/endpoints/task";

import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { AddListButton, CreateListModal } from "../components/board/CreateListModal";
import { ListComponent } from "../components/board/ListComponent";

interface BoardProps {
  lists: List[];
  refetchLists: () => Promise<void>;
}

export function Board({ lists, refetchLists }: BoardProps) {
  const [modal, setModal] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [localLists, setLocalLists] = useState<List[]>(lists);

  useEffect(() => {
    setLocalLists(lists);
  }, [lists]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModal(true);
  };

  const handleCreateList = async (name: string) => {
    await createList({ name });
    await refetchLists();
  };

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as number;
    for (const list of localLists) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id as number;

    let draggedTask: Task | undefined;
    let sourceListId: number = 0;
    let sourceIndex: number = 0;

    for (const list of localLists) {
      const idx = list.tasks.findIndex((t) => t.id === activeId);
      if (idx !== -1) {
        draggedTask = list.tasks[idx];
        sourceListId = list.id;
        sourceIndex = idx;
        break;
      }
    }

    if (!draggedTask) return;

    const isDroppedOnList = localLists.some((l) => l.id === overId);
    const targetListId = isDroppedOnList ? overId : localLists.find((l) => l.tasks.some((t) => t.id === overId))?.id;

    if (!targetListId) return;

    let newPosition: number;
    if (isDroppedOnList) {
      newPosition = localLists.find((l) => l.id === targetListId)?.tasks.length || 0;
    } else {
      const targetList = localLists.find((l) => l.id === targetListId);
      const overTaskIndex = targetList?.tasks.findIndex((t) => t.id === overId) ?? 0;
      newPosition = overTaskIndex;
    }

    if (sourceListId === targetListId && draggedTask.position === newPosition) return;

    const newLists = localLists.map(list => ({
      ...list,
      tasks: [...list.tasks]
    }));

    const sourceList = newLists.find(l => l.id === sourceListId);
    const targetList = newLists.find(l => l.id === targetListId);

    if (!sourceList || !targetList) return;

    sourceList.tasks.splice(sourceIndex, 1);

    let targetIndex = newPosition;
    if (sourceListId === targetListId && sourceIndex < newPosition) {
      targetIndex = Math.max(0, newPosition - 1);
    }

    const movedTask = { ...draggedTask, listId: targetListId, position: targetIndex };
    targetList.tasks.splice(targetIndex, 0, movedTask);

    targetList.tasks.forEach((t, idx) => {
      t.position = idx;
    });

    if (sourceListId !== targetListId) {
      sourceList.tasks.forEach((t, idx) => {
        t.position = idx;
      });
    }

    setLocalLists(newLists);

    try {
      await updateTaskPosition(activeId, newPosition, targetListId);
      await refetchLists();
    } catch (err) {
      console.error("Failed to update position:", err);
      setLocalLists(lists);
      await refetchLists();
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-bg flex flex-col md:flex-row gap-4 overflow-x-auto p-8 min-h-screen w-full">
        {localLists.map((list) => (
          <ListComponent
            key={list.id}
            id={list.id}
            name={list.name}
            propTasks={list.tasks}
            refetchLists={refetchLists}
          />
        ))}
        <AddListButton onClick={openModal} />

        <CreateListModal
          isOpen={modal}
          onClose={(e) => {
            e?.preventDefault();
            setModal(false);
          }}
          onSubmit={handleCreateList}
          existingListNames={localLists.map((l) => l.name)}
        />
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="opacity-80 cursor-grabbing">
            <ListComponent
              id={activeTask.listId}
              name=""
              propTasks={[activeTask]}
              refetchLists={refetchLists}
              isDragOverlay
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
