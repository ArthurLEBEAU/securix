document.addEventListener('DOMContentLoaded', () => {
    const menuTogle = document.querySelector('.menu-togle')
    const side_bar = document.querySelector('.side_bar')
    const close = document.querySelector('.side_bar .logo i')
    const menuTogleIcon = document.querySelector('.menu-togle .fa-solid')

    close.addEventListener('click', () => {
        if (side_bar.classList.contains('show')) {
            menuTogleIcon.classList.remove('fa-plus')
            menuTogleIcon.classList.add('fa-bars')
        } else {
            menuTogleIcon.classList.remove('fa-bars')
            menuTogleIcon.classList.add('fa-plus')
        }
        side_bar.classList.toggle('show')
    })
    menuTogle.addEventListener('click', () => {
        if (side_bar.classList.contains('show')) {
            menuTogleIcon.classList.remove('fa-plus')
            menuTogleIcon.classList.add('fa-bars')
        } else {
            menuTogleIcon.classList.remove('fa-bars')
            menuTogleIcon.classList.add('fa-plus')
        }
        side_bar.classList.toggle('show')
    })


    // logout
    $('.profil_block').on("click", () => {
        $.ajax({
            url: "/admin/logout",
            method: 'get',
            contentType: false,
            processData: false,
            success: function(data) {
                Swal.fire({
                    icon: 'success',
                    text: 'bye bye  !',
                    showConfirmButton: false,
                    timer: 1000
                })
                setInterval(() => {
                    location.replace("/admin")
                }, 1000)
            },
            error: function(e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.responseJSON["error"],
                })
            }
        });
    })

})