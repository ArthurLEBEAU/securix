import { postData } from '../helper.js'

$(document).ready(async function() {
    const pswIcons = document.querySelectorAll("#icon_show")
        /**
         * @type {HTMLInputElement}
         */
    const inputPxd = document.querySelector("#password")
    const inputPxdC = document.querySelector("#confirm")
    pswIcons.forEach((pswIcon, i) => {
        pswIcon.addEventListener('click', (e) => {
            const el = i == 0 ? inputPxd : inputPxdC;
            pswIcon.setAttribute('src', el.type == "password" ? '/static/assets/images/login/icons8-eye.png' : '/static/assets/images/login/icons8-eye-slash.png')
            el.type = el.type == "password" ? 'text' : 'password';
        })
    });

    // login methode
    const form = document.querySelector('form')
    const btn = document.querySelector('form > button')
    let isLoding = false
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isLoding) {
            let d = {
                username: form.elements['userName'].value,
                password: form.elements['password'].value,
                confirmPwd: form.elements['confirm'].value
            }
            if (d.username == "" || d.password == "" || d.confirmPwd == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'des informations manquent!',
                })
            } else {
                isLoding = true
                btn.classList.toggle('is-loading')
                form.classList.toggle('is-loading')
                btn.textContent = "Chargement..."

                postData(form.getAttribute('action'), d)
                    .then((data) => {
                            btn.classList.toggle('is-loading')
                            form.classList.toggle('is-loading')
                            btn.textContent = "changer"
                            isLoding = false
                            if (!data.error) {
                                Swal.fire({
                                    icon: 'success',
                                    text: 'Mot de passe modifié !',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                form.elements['userName'].value = ""
                                form.elements['password'].value = ""
                                form.elements['confirm'].value = ""

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: data["error"],
                                })
                            }
                        },
                        (_e) => {
                            btn.classList.toggle('is-loading')
                            form.classList.toggle('is-loading')
                            isLoding = false
                            btn.textContent = "changer"
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