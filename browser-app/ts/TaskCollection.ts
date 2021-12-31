import {Task} from './task'

export class TaskCollection {
    private tasks: Task[] = []

    add(task: Task) {
        this.tasks.push(task)
    }
}