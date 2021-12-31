import dragula from 'dragula'
import {Task, Status, statusMap} from './task'

export class TaskRender {
    constructor(
        private readonly todoList: HTMLElement,
        private readonly doingList: HTMLElement,
        private readonly doneList: HTMLElement
    ){}

    append(task: Task) {
        const {taskEL, deleteButtonEL} = this.render(task)
        this.todoList.append(taskEL)
        return {deleteButtonEL}
    }

    remove(task: Task) {
        const taskEL = document.getElementById(task.id)
        if (!taskEL) return

        if (task.status === statusMap.todo) this.todoList.removeChild(taskEL)
        if (task.status === statusMap.doing) this.doingList.removeChild(taskEL)
        if (task.status === statusMap.done) this.doneList.removeChild(taskEL)
    }

    subscribeDragAndDrop(onDrop: (el: Element, sibling: Element | null, newStatus: Status) => void) {
        dragula([this.todoList, this.doingList, this.doneList]).on('drop', (el, target, _source, sibling) => {
            let newStatus: Status = statusMap.todo
            if (target.id === 'doingList') newStatus = statusMap.doing
            if (target.id === 'doneList') newStatus = statusMap.done
            onDrop(el, sibling, newStatus)
        })
    }

    getId(el: Element) {
        return el.id
    }

    private render(task: Task) {
        const taskEL = document.createElement('div')
        const spanEL = document.createElement('span')
        const deleteButtonEL = document.createElement('button')

        taskEL.id = task.id
        taskEL.classList.add('task-item')
        spanEL.textContent = task.title
        deleteButtonEL.textContent = '削除'

        taskEL.append(spanEL, deleteButtonEL)

        return {taskEL, deleteButtonEL}
    }
}