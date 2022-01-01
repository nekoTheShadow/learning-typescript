import {EventListener} from './EventListener'
import {Task, Status, statusMap} from './task'
import {TaskCollection} from './TaskCollection'
import {TaskRender} from './TaskRender'

class Application {
    private readonly eventListener = new EventListener()
    private readonly taskCollection = new TaskCollection()
    private readonly taskRender = new TaskRender(
        document.getElementById('todoList') as HTMLElement,
        document.getElementById('doingList') as HTMLElement,
        document.getElementById('doneList') as HTMLElement,
    )

    start() {
        const taskItems = this.taskRender.renderAll(this.taskCollection)
        const createForm = document.getElementById('createForm') as HTMLElement
        const deleteAllDoneTaskButton = document.getElementById('deleteAllDoneTask') as HTMLElement

        taskItems.forEach(({task, deleteButtonEL}) => {
            this.eventListener.add('click', deleteButtonEL, () => this.handleClickDeleteTask(task), task.id)
        })

        this.eventListener.add('submit', createForm, this.handleSubmit)
        this.eventListener.add('click', deleteAllDoneTaskButton, this.handleClickDeleteAllDoneTasks)
        this.taskRender.subscribeDragAndDrop(this.handleDragAndDrop)
    }

    private handleSubmit = (e: Event) => {
        e.preventDefault()
        
        const titleInput = document.getElementById('title') as HTMLInputElement
        if (!titleInput) return

        const task = new Task({title: titleInput.value})
        this.taskCollection.add(task)

        const {deleteButtonEL} = this.taskRender.append(task)
        this.eventListener.add('click', deleteButtonEL, () => this.handleClickDeleteTask(task), task.id)
        titleInput.value = ''
    }
    
    private handleClickDeleteTask(task: Task) {
        if (!window.confirm(`「${task.title}」を削除してよろしいですか?`)) return;
        this.executeDeleteTask(task)
    }

    private handleDragAndDrop = (el: Element, sibling: Element | null, newStatus: Status) => {
        const taskId = this.taskRender.getId(el)
        if (!taskId) return
        
        const task = this.taskCollection.find(taskId)
        if (!task) return
        task.update({status: newStatus})
        this.taskCollection.update(task)

        if (sibling) {
            const nextTaskId = this.taskRender.getId(sibling)
            if (!nextTaskId) return

            const nextTask = this.taskCollection.find(nextTaskId)
            if (!nextTask) return 

            this.taskCollection.moveAboveTarget(task, nextTask)
        } else {
            this.taskCollection.moveToLast(task)
        }
    }

    private handleClickDeleteAllDoneTasks = () => {
        if (!window.confirm('DONEのタスクを一括して削除してよろしいですか?')) return
        
        const doneTasks = this.taskCollection.filter(statusMap.done)
        doneTasks.forEach((task) => this.executeDeleteTask(task))
    }

    private executeDeleteTask = (task: Task) => {
        this.eventListener.remove(task.id)
        this.taskCollection.delete(task)
        this.taskRender.remove(task)
    }
}

window.addEventListener('load', () => {
    const app = new Application()
    app.start()
})