import {EventListener} from './EventListener'
import {Task} from './task'
import {TaskCollection} from './TaskCollection'
import {TaskRender} from './TaskRender'

class Application {
    private readonly eventListener = new EventListener()
    private readonly taskCollection = new TaskCollection()
    private readonly taskRender = new TaskRender(document.getElementById('todoList') as HTMLElement)

    start() {
        const createForm = document.getElementById('createForm') as HTMLElement
        this.eventListener.add('submit-handler', 'submit', createForm, this.handleSubmit)
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
        this.eventListener.remove(task.id)
        this.taskRender.remove(task)
    }
}

window.addEventListener('load', () => {
    const app = new Application()
    app.start()
})