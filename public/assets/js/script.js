$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

$(document).ready(function () {
    $("#create-task-btn").click(function () {
        $("#task-modal #title").val("");
        $("#task-modal #priority").val("");
        $("#task-modal #description").val("");
        $("#task-modal #due_date").val("");

        $("#task-form input, #task-form textarea").removeAttr("disabled");
        $("#task-form button[type=submit]").removeClass("d-none");
        $("#modal-title").text("Create Task");
        $("#task-form").attr("action", `${baseUrl}/tasks`);

        $("#hidden-task-id").remove();

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

            const taskId = $("#hidden-task-id").val();

            const methodType = (taskId && "PUT") || "POST";

            const formAction = $(form).attr("action");

            $.ajax({
                url: formAction,
                type: methodType,
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

                        //For Update
                        if (taskId) {
                            $(`#task_${taskId} td:nth-child(2)`).html(
                                response.task.title
                            );
                            $(`#task_${taskId} td:nth-child(3)`).html(
                                response.task.description
                            );
                            $(`#task_${taskId} td:nth-child(4)`).html(
                                response.task.priority
                            );
                            $(`#task_${taskId} td:nth-child(6)`).html(
                                response.task.due_date
                            );
                        }

                        //For Create
                        else {
                            $("#task-table").prepend(
                                `<tr id="task_${response.task.id}">
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
                        }
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

    // View Task
    $("#task-table").on("click", ".btn-view", function () {
        const taskId = $(this).data("id");
        const mode = "view";
        taskId && fetchTask(taskId, mode);
    });

    function fetchTask(taskId, mode = null) {
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

                        if (mode === "view") {
                            $("#task-form input, #task-form textarea").attr(
                                "disabled",
                                true
                            );
                            $("#task-form button[type=submit]").addClass(
                                "d-none"
                            );
                            $("#modal-title").text("Task Info");
                            $("#task-form").removeAttr("action");
                        } else if (mode === "edit") {
                            $(
                                "#task-form input, #task-form textarea"
                            ).removeAttr("disabled");
                            $("#task-form button[type=submit]").removeClass(
                                "d-none"
                            );
                            $("#modal-title").text("Edit Task");
                            $("#task-form").attr(
                                "action",
                                `${baseUrl}/tasks/${task.id}`
                            );
                            $("#task-form").append(
                                `<input type="hidden" id="hidden-task-id" value="${task.id}"/>`
                            );
                        }

                        $("#task-modal").modal("toggle");
                    }
                },
                error: function (error) {
                    console.error(error);
                },
            });
        }
    }

    //Edit Task
    $("#task-table").on("click", ".btn-edit", function () {
        const taskId = $(this).data("id");
        const mode = "edit";
        taskId && fetchTask(taskId, mode);
    });

    //Delete Task
    $("#task-table").on("click", ".btn-delete", function () {
        const taskId = $(this).data("id");

        if (taskId) {
            //alert

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete!!",
            }).then((result) => {
                if (result.isConfirmed) {
                    //Ajax Call

                    $.ajax({
                        url: `tasks/${taskId}`,
                        type: "DELETE",
                        success: function (response) {
                            if (response.status === "success") {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your task has been deleted.",
                                    icon: "success",
                                });

                                if (response.task) {
                                    $(`#task_${response.task.id}`).remove();
                                }
                            } else {
                                Swal.fire({
                                    title: "Not Deleted!",
                                    text: "Your task has not been deleted.",
                                    icon: "error",
                                });
                            }
                        },
                        error: function (error) {
                            Swal.fire({
                                title: "ERROR",
                                text: "Some mistake",
                                icon: "error",
                            });
                        },
                    });
                }
            });
        }
    });
});
