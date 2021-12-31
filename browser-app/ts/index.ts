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
        const createForm = document.getElementById('createForm') as HTMLElement
        const deleteAllDoneTaskButton = document.getElementById('deleteAllDoneTask') as HTMLElement
        this.eventListener.add('submit-handler', 'submit', createForm, this.handleSubmit)
        this.eventListener.add('click-handler', 'click', deleteAllDoneTaskButton, this.handleClickDeleteAllDoneTasks)
        this.taskRender.subscribeDragAndDrop(this.handleDragAndDrop)
    }

    private handleSubmit = (e: Event) => {
        e.preventDefault()
        
        const titleInput = document.getElementById('title') as HTMLInputElement
        if (!titleInput) return

        const task = new Task({title: titleInput.value})
        this.taskCollection.add(task)

        const {deleteButtonEL} = this.taskRender.append(task)
        this.eventListener.add(task.id, 'click', deleteButtonEL, () => this.handleClickDeleteTask(task))
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
        console.log(sibling)
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