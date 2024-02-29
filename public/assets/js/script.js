$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

$(document).ready(function () {
    $("#create-task-btn").click(function () {
        $("#task-modal").modal("toggle");
    });

    $("#task-form").validate({
        rules: {
            title: {
                required: true,
                minlength: 3,
                maxlength: 20,
            },
            description: {
                required: true,
                minlength: 10,
                maxlength: 255,
            },
            priority: {
                required: true,
                digits: true,
                min: 1,
                max: 9,
            },
            due_date: {
                required: true,
            },
        },
        messages: {
            title: {
                minlength: "More than 3 characters please",
            },
        },
        submitHandler: function (form) {
            $("#response").empty();
            const formData = $(form).serializeArray();

            $.ajax({
                url: "tasks",
                type: "POST",
                data: formData,
                beforeSend: function () {
                    console.log("loading");
                },
                success: function (response) {
                    $("#task-form")[0].reset();
                    $("#task-modal").modal("toggle");

                    if (response.status === "success") {
                        $("#response").html(
                            `<div class='alert alert-success alert-dismissible'>
                            ${response.message}
                            <button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>`
                        );
                        $("#task-table").prepend(
                            `<tr>
                                <td>${response.task.id}</td>
                                <td>${response.task.title}</td>
                                <td>${response.task.description}</td>
                                <td>${response.task.priority}</td>
                                <td>${
                                    response.task.completed ? "Done" : "No"
                                }</td>
                                <td>${response.task.due_date}</td>
                                <td>
                                    <a class="btn btn-info btn-sm btn-view" href="javascript:void(0)" data-id="${
                                        response.task.id
                                    }">View</a>
                                    <a class="btn btn-success btn-sm btn-edit" href="javascript:void(0)" data-id="${
                                        response.task.id
                                    }">Edit</a>
                                    <a class="btn btn-danger btn-sm btn-delete" href="javascript:void(0)" data-id="${
                                        response.task.id
                                    }">Delete</a>
                                </td>
                            </tr>`
                        );
                    } else if (response === "failed") {
                        "#response".html(
                            `<div class='alert alert-danger alert-dismissible'>
                            ${response.message}
                            <button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>`
                        );
                    }
                },
                error: function (error) {
                    "#response".html(
                        `<div class='alert alert-danger alert-dismissible'>
                        ${error.message}
                        <button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>`
                    );
                },
            });
        },
    });

    $("#task-table").dataTable({
        order: [3, "asc"],
    });

    // View Todo
    $(".btn-view").click(function () {
        const taskId = $(this).data("id");
        taskId && fetchTask(taskId);
    });

    function fetchTask(taskId) {
        if (taskId) {
            $.ajax({
                url: `tasks/${taskId}`,
                type: "GET",
                success: function (response) {
                    if (response.status === "success") {
                        const task = response.task;

                        $("#task-modal #title").val(task.title);
                        $("#task-modal #priority").val(task.priority);
                        $("#task-modal #description").val(task.description);
                        $("#task-modal #due_date").val(task.due_date);

                        $("#task-form input, #task-form textarea").attr(
                            "disabled",
                            true
                        );

                        $("#task-form button[type=submit]").addClass("d-none");

                        $("#modal-title").text("Task Info");

                        $("#task-modal").modal("toggle");
                    }
                },
                error: function (error) {
                    console.error(error);
                },
            });
        }
    }
});
