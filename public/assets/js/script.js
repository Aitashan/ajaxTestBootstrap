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
});
