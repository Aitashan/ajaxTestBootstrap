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
    </div>
@endsection
