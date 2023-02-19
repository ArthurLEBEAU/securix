import { dataTableTranslation } from "../helper.js";


$(document).ready(async function() {
    const _url = '/api/request/';
    let faqDataTable = $('#faqTable').DataTable({
        ajax: {
            url: _url,
            cache: true,
            dataSrc: "faq"
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
            { data: "name" },
            { data: "question" },
            { data: "created_at" },
            { defaultContent: '<div class="action"><button class="btn btn_update text-white"><i class="fa fa-pencil-alt"></i></button><button class="btn btn_delete text-white"><i class="fa fa-trash-alt"></i></button></div>' },
        ],
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
    const formTitle = document.querySelector('.pop_frame form> h1')
    const submitBtn = document.querySelector('.pop_frame form> button')
    let current_id = 0
    closeBtn.addEventListener('click', () => {
        // reset the form
        document.querySelector(".pop_frame form").reset();
        modal.classList.toggle('active')
        current_id = 0
    })

    // creer
    newBtn.addEventListener('click', () => {
            formTitle.textContent = "Nouvelle Question";
            iscreating = true
            modal.classList.toggle('active')
        })
        // update
    $(document).on('click', '.btn_update', (e) => {
            iscreating = false
            formTitle.textContent = "Modifier Question";
            submitBtn.textContent = "modifier";
            // get the row line and data
            current_id = $($(e.target).closest('tr')).attr('data-id')
            const data = faqDataTable.rows()
            for (let index = 0; index < faqDataTable.rows()[0].length; index++) {
                const element = (faqDataTable.rows(index).data())[0];
                if (element._id == current_id) {
                    $('#name').val(element.name);
                    $('#email').val(element.email);
                    $('#question').val(element.question);
                    $('#response').val(element.response);
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
                        faqDataTable.row(target).remove().draw();
                        Swal.fire('question supprimer!', '', 'success')
                    }
                });
            }
        })
    });

    //creer ou editer une catgorie
    $('#form_modal').submit(function(e) {
        e.preventDefault();
        if (issubmitting) return
        let _name = $.trim($('#name').val());
        let _email = $.trim($('#email').val());
        let _question = $.trim($('#question').val());
        let _response = $.trim($('#response').val());

        if (iscreating) {
            $.ajax({
                url: _url,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ name: _name, email: _email, question: _question, reponse: _response }),
                success: function(data) {
                    submitBtn.textContent = "enregistrer"
                    issubmitting = false
                    Swal.fire({
                            icon: 'success',
                            text: 'Question ajoutée !',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        // reload data
                    faqDataTable.ajax.reload(null, false);
                    // reset the form
                    document.querySelector(".pop_frame form").reset();
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
                contentType: 'application/json',
                data: JSON.stringify({ name: _name, email: _email, question: _question, reponse: _response }),
                success: function(data) {
                    submitBtn.textContent = "modifier"
                    issubmitting = false
                    Swal.fire({
                            icon: 'success',
                            text: 'Question modifiée !',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        // reload data
                    faqDataTable.ajax.reload(null, false);
                    // reset the form
                    document.querySelector(".pop_frame form").reset();
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