import { dataTableTranslation } from "../helper.js";


$(document).ready(async function() {
    const _url = '/api/service/';
    let serviceDataTable = $('#serviceTable').DataTable({
        ajax: {
            url: _url,
            cache: true,
            dataSrc: "service"
        },
        language: dataTableTranslation,
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        pageLength: 6,
        scrollY: '40vh',
        paging: true,
        bAutoWidth: false,
        responsive: true,
        pageResize: true,
        lengthChange: true,
        columns: [
            { data: "id" },
            { data: "cover" },
            { data: "title" },
            { data: "created_at" },
            { defaultContent: '<div class="action"><button class="btn btn_update text-white"><i class="fa fa-pencil-alt"></i></button><button class="btn btn_delete text-white"><i class="fa fa-trash-alt"></i></button></div>' },
        ],
        columnDefs: [{
            // The `data` parameter refers to the data for the cell (defined by the
            // `data` option, which defaults to the column being worked with, in
            // this case `data: 0`.
            render: function(data, type, row) {
                return `<img class='img-thumbnail img-fluid' alt='couverture du service' src='/static${data}' />`;
            },
            targets: 1,
        }],
        createdRow: function(row, data, dataIndex, cells) {
            $(row).attr("data-id", data._id);
        },
    });

    let iscreating = true
    let issubmitting = false
    const newBtn = document.querySelector('.btn_create')
    const modal = document.querySelector('.pop_frame')
    const closeBtn = document.querySelector('.close_btn')
    const form = document.querySelector('.pop_frame form')
    const formTitle = document.querySelector('.pop_frame form h1')
    const submitBtn = document.querySelector('.pop_frame form button')
    const formImg = document.querySelector('#cover_input')
    let current_id = 0
    let file = null
    closeBtn.addEventListener('click', () => {
        // reset the form
        form.reset();
        formImg.setAttribute("src", "/static/assets/images/default_image.jpg")
        modal.classList.toggle('active')
        current_id = 0
    })

    // creer
    newBtn.addEventListener('click', () => {
            formTitle.textContent = "Nouveau Service";
            iscreating = true
            submitBtn.textContent = "enregistrer";
            modal.classList.toggle('active')
        })
        // update
    $(document).on('click', '.btn_update', (e) => {
            iscreating = false
            formTitle.textContent = "Modifier un sevice";
            submitBtn.textContent = "modifier";
            // get the row line and data
            current_id = $($(e.target).closest('tr')).attr('data-id')
            for (let index = 0; index < serviceDataTable.rows()[0].length; index++) {
                const element = (serviceDataTable.rows(index).data())[0];
                if (element._id == current_id) {
                    $('#title').val(element.title);
                    $('#cover_input').attr("src", "/static" + element.cover);
                    $('#category').val(element.categorie._id);
                    $('#description').val(element.description);
                }

            }
            // show modal
            modal.classList.toggle('active')

        })
        // delete
    $(document).on("click", ".btn_delete", (e) => {
        const target = $(e.target).closest('tr');
        const id = $(target).attr('data-id')
        Swal.fire({
            title: 'voulez vous vraiment supprimer ?',
            showCancelButton: true,
            confirmButtonText: `Confirmer`,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: _url + id,
                    method: 'delete',
                    data: { id: id },
                    success: function() {
                        serviceDataTable.row(target).remove().draw();
                        Swal.fire('service supprimé!', '', 'success')
                    }
                });
            }
        })
    });

    $(document).on("change", "#cover", (e) => {
        file = $(e.target)[0].files[0]
        const i_url = URL.createObjectURL(file).toString()
        formImg.setAttribute("src", i_url)
    });

    //creer ou editer une catgorie
    $('#form_modal').submit(function(e) {
        e.preventDefault();
        const d = new FormData();
        let title = $.trim($('#title').val());
        let description = $.trim($('#description').val());
        let cat_id = $.trim($('#category').val());


        if (file == null && iscreating) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "le fichier image ne peut pas etre vide !",
            })
        }



        d.append('title', title)
        if (file != null) d.append('cover', file)
        d.append('description', description)
        d.append('cat_id', cat_id)

        if (iscreating) {
            $.ajax({
                url: _url,
                method: 'post',
                contentType: false,
                processData: false,
                data: d,
                success: function(data) {
                    submitBtn.textContent = "enregistrer"
                    issubmitting = false
                    Swal.fire({
                            icon: 'success',
                            text: 'service ajouté !',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        // reload data
                    serviceDataTable.ajax.reload(null, false);
                    // reset the form
                    document.querySelector(".pop_frame form").reset();
                    formImg.setAttribute("src", "/static/assets/images/default_image.jpg")
                    modal.classList.toggle('active')
                },
                error: function(e) {
                    submitBtn.textContent = "enregistrer"
                    issubmitting = false
                    if (e.status == 422) {
                        let msg = ''
                        for (const el in e.responseJSON["error"]) {
                            msg += `<li>${e.responseJSON["error"][el]}</li>`
                        }
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            html: `<ul>${msg}</ul>`,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: e.responseJSON["error"],
                        })
                    }
                }
            });
        } else {
            $.ajax({
                url: _url + current_id,
                method: 'patch',
                contentType: false,
                processData: false,
                data: d,
                success: function(data) {
                    submitBtn.textContent = "modifier"
                    issubmitting = false
                    Swal.fire({
                            icon: 'success',
                            text: 'Service modifié !',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        // reload data
                    serviceDataTable.ajax.reload(null, false);
                    // reset the form
                    document.querySelector(".pop_frame form").reset();
                    formImg.setAttribute("src", "/static/assets/images/default_image.jpg")
                    modal.classList.toggle('active')
                    current_id = 0
                },
                error: function(e) {
                    submitBtn.textContent = "modifier"
                    issubmitting = false
                    if (e.status == 422) {
                        let msg = ''
                        for (const el in e.responseJSON["error"]) {
                            msg += `<li>${e.responseJSON["error"][el]}</li>`
                        }
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            html: `<ul>${msg}</ul>`,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "une erreur est survenue!",
                        })
                    }
                }
            });
        }
    });
})