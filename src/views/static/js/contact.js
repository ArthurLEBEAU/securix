import { performPost } from './helper.js'
$(document).ready(async function() {
    const form = document.querySelector('form#msgForm')
    const btn = document.querySelector('form#msgForm button')
    let isLoding = false
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        if (!isLoding) {
            let d = {
                name: form.elements['name'].value,
                email: form.elements['email'].value,
                description: form.elements['message'].value
            }
            if (d.email == "" || d.name == "") {
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
                performPost(form.getAttribute('action'), d).then((p) => {
                        isLoding = false
                        btn.classList.toggle('is-loading')
                        form.classList.toggle('is-loading')
                        btn.textContent = "Envoyer"
                        if (p) {
                            form.elements['name'].value = ""
                            form.elements['email'].value = ""
                            form.elements['message'].value = ""
                        }

                    },
                    (e) => {
                        isLoding = false
                        btn.textContent = "Envoyer"
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "une erreur c'est poduite!",
                        })
                    })

            }

        }

    })

});