<!-- Modal -->
<div class="modal fade" id="task-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('tasks.store') }}" method="POST" id="task-form">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">Create Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group py-2">
                        <label for="title">Task title</label>
                        <input type="text" name="title" id="title" placeholder="task-name"
                            class="form-control" />
                    </div>

                    <div class="form-group py-2">
                        <label for="priority">Task priority</label>
                        <input type="number" name="priority" id="priority" placeholder="1-9" class="form-control"
                            min="1" max="9" />
                    </div>

                    <div class="form-group py-2">
                        <label for="description">Description</label>
                        <textarea name="description" id="description" cols="30" rows="3" class="form-control"></textarea>
                    </div>

                    <div class="form-group py-2">
                        <label for="due_date">Due-date</label>
                        <input type="date" name="due_date" id="due_date" class="form-control" />
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
