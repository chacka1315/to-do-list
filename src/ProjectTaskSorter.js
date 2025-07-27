class Sorte {
    static projectTaskSoter(project, type) {
        switch (type) {
            case "priority":
                project.tasks.sort( (task1, task2) => ( task1.priority - task2.priority ) ); 
                break;

            case "title":
                project.tasks.sort( (task1, task2) => ( (task1.title).localeCompare(task2.title) ) );
                break;

            case "dueDate":
                project.tasks.sort( (task1, task2) => ( task1.dueDate - task2.dueDate ) );
                break;
        }
    }

    // static sorteByPriority (project) {
    //     project.tasks.sort( (task1, task2) => ( task1.priority - task2.priority ) );   
    // };

    // static sortByDueDate(project) {
    //     project.tasks.sort( (task1, task2) => ( task1.dueDate - task2.dueDate ) );
    // };

    // static sortByTitle (project) {
    //     project.tasks.sort( (task1, task2) => ( task1.title.localeCompare(task2.title) ) )
    // };

}

export default Sorte