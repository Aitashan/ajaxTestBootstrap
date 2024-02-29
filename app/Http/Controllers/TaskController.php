<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::orderBy('priority', 'ASC')->get();

        return view('tasks.index', compact('tasks'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        if($task) {
            return response()->json([
                'status' => 'success',
                'message' => 'Task has been created!',
                'task' => $task,
            ]);
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'Task has not been created!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if($task){
            return response()->json([
                'status' => 'success',
                'task' => $task,
            ]);
        }
        return response()->json([
            'status' => 'failed',
            'message' => 'No task here!',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if($task){
            $task->update($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Task has been updated!',
                'task' => $task,
            ]);
        }
        return response()->json([
            'status' => 'failed',
            'message' => 'Task has not been updated!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
