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
            const formData = $(form).serializeArray();

            $.ajax({
                url: "tasks",
                type: "POST",
                data: formData,
                beforeSend: function () {
                    console.log("loading");
                },
                success: function (response) {
                    console.log("res", response);
                },
                error: function (error) {
                    console.log("error", error);
                },
            });
        },
    });
});
