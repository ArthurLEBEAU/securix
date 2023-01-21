import { postData } from './helper.js'

$(document).ready(async function() {
    const pswIcon = document.querySelector("#icon_show")
        /**
         * @type {HTMLInputElement}
         */
    const inputPxd = document.querySelector("#password")
    let show = false
    pswIcon.addEventListener('click', (e) => {
        if (show) {
            pswIcon.setAttribute('src', '/static/assets/images/login/icons8-eye.png')
        } else {
            pswIcon.setAttribute('src', '/static/assets/images/login/icons8-eye-slash.png')
        }
        inputPxd.type = !show ? 'text' : 'password';
        show = !show
    })

    // login methode
    const form = document.querySelector('form')
    const btn = document.querySelector('form > button')
    let isLoding = false
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isLoding) {
            let d = {
                username: form.elements['userName'].value,
                password: form.elements['password'].value
            }
            if (d.username == "" || d.password == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'des informations manquent!',
                })
            } else {
                isLoding = true
                btn.textContent = "Chargement..."
                btn.classList.toggle('is-loading')
                form.classList.toggle('is-loading')

                postData(form.getAttribute('action'), d)
                    .then((data) => {
                            btn.textContent = "Se connecter"
                            btn.classList.toggle('is-loading')
                            form.classList.toggle('is-loading')
                            isLoding = false
                            if (!data.error) {
                                Swal.fire({
                                    icon: 'success',
                                    text: 'Conexion reussit !',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                form.elements['userName'].value = ""
                                form.elements['password'].value = ""
                                location.replace("/admin")

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: data["error"],
                                })
                            }
                        },
                        (_e) => {
                            btn.textContent = "Se connecter"
                            btn.classList.toggle('is-loading')
                            form.classList.toggle('is-loading')
                            isLoding = false;
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'reessayer plus tard!',
                            })
                        });
            }

        }

    })

});