import { dataTableTranslation } from "../helper.js";


$(document).ready(async function() {
    const _url = '/api/contact/';
    let contactDataTable = $('#contactTable').DataTable({
        ajax: {
            url: _url,
            cache: true,
            dataSrc: "contacts"
        },
        language: dataTableTranslation,
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        scrollY: '40vh',
        paging: true,
        pageLength: 6,
        bAutoWidth: false,
        responsive: true,
        pageResize: true,
        lengthChange: true,
        columns: [
            { data: "id" },
            { data: "name" },
            { data: "email" },
            { data: "created_at" },
            { defaultContent: '<div class="action"><button class="btn btn_show text-white"><i class="fa fa-eye"></i></button></div>' },
        ],
        createdRow: function(row, data, dataIndex, cells) {
            $(row).attr("data-id", data._id);
        },
    });

    const modal = document.querySelector('.pop_frame')
    const closeBtn = document.querySelector('.close_btn')
    const formTitle = document.querySelector('.pop_frame form> h1')
    let current_id = 0
    closeBtn.addEventListener('click', () => {
        // reset the form
        document.querySelector(".pop_frame form").reset();
        modal.classList.toggle('active')
        current_id = 0
    })

    // update
    $(document).on('click', '.btn_show', (e) => {
        // get the row line and data
        current_id = $($(e.target).closest('tr')).attr('data-id')
        const data = contactDataTable.rows()
        for (let index = 0; index < contactDataTable.rows()[0].length; index++) {
            const element = (contactDataTable.rows(index).data())[0];
            if (element._id == current_id) {
                formTitle.textContent = `Message du ${element.created_at}`;
                $('#name').val(element.name);
                $('#email').val(element.email);
                $('#message').val(element.description);
            }

        }
        // show modal
        modal.classList.toggle('active')

    })

})