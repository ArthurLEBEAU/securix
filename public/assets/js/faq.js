import { postData } from './helper.js'
$(document).ready(async function() {
    const form = document.querySelector('form#requestForm')
    const btn = document.querySelector('form#requestForm button')
    let isLoding = false
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isLoding) {
            let d = {
                name: form.elements['name'].value,
                email: form.elements['email'].value,
                question: form.elements['message'].value
            }
            if (d.email == "" || d.question == "" || d.name == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'des informatios manquent!',
                })
            } else {
                isLoding = true
                btn.classList.toggle('is-loading')
                form.classList.toggle('is-loading')

                postData(form.getAttribute('action'), d)
                    .then((data) => {
                            btn.classList.toggle('is-loading')
                            form.classList.toggle('is-loading')
                            isLoding = false
                            if (!data.error) {
                                Swal.fire({
                                    icon: 'success',
                                    text: 'Votre question a étée reçue !',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                form.elements['name'].value = ""
                                form.elements['email'].value = ""
                                form.elements['message'].value = ""
                            } else {
                                let msg = ''
                                for (const el in data["error"]) {
                                    msg += `<li>${data["error"][el]}</li>`
                                }
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    html: `<ul>${msg}</ul>`,
                                })
                            }
                        },
                        (e) => {
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