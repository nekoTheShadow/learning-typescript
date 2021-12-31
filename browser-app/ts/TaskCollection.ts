import {Task, Status} from './task'

export class TaskCollection {
    private tasks: Task[] = []

    add(task: Task) {
        this.tasks.push(task)
    }

    delete(task: Task) {
        this.tasks = this.tasks.filter(({id}) => id !== task.id)
    }

    find(id: string) {
        return this.tasks.find((task) => task.id === id)
    }

    update(task: Task) {
        this.tasks = this.tasks.map((item) => {
            return item.id === task.id ? task : item
        })
    }

    filter(filterStatus: Status) {
        return this.tasks.filter(({status}) => status === filterStatus)
    }
}