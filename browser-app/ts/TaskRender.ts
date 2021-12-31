import {Task} from './task'

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
        this.todoList.removeChild(taskEL)
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