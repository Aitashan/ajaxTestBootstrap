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
    });
});
