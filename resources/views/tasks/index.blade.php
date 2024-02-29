@extends('layouts.app')
@section('content')
    @include('tasks.subview.create')

    <div class="container py-5">
        <h3 class="text-center">List of all Tasks</h3>
        <div class="row">
            <div class="col-xl-6">
                <div id="response"></div>
            </div>
            <div class="col-xl-6 text-end">
                <a href="javascript:void(0)" id="create-task-btn" class="btn btn-primary">Create Task</a>
            </div>
        </div>

        <div class="table-responsive pt-4">
            <table class="table table-striped" id="task-table">
                <thead>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Completed</th>
                    <th>Due Date</th>
                    <th>Action</th>
                </thead>

                <tbody>
                    @forelse ($tasks as $task)
                        <tr>
                            <td>{{ $task->id }}</td>
                            <td>{{ $task->title }}</td>
                            <td>{{ $task->description }}</td>
                            <td>{{ $task->priority }}</td>
                            <td>{{ $task->completed ? 'Done' : 'No' }}</td>
                            <td>{{ $task->due_date }}</td>
                            <td>
                                <a class="btn btn-info btn-sm" href="javascript:void(0)">View</a>
                                <a class="btn btn-success btn-sm" href="">Edit</a>
                                <a class="btn btn-danger btn-sm" href="">Delete</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7">
                                <p class="text-danger">No Tasks at the momment!</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
