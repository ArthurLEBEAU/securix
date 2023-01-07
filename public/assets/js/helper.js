/**
 * 
 * @param {String} url 
 * @param {Object} data 
 * @returns {void}
 */
export async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

/**
 * 
 * @param {String} url 
 * @param {Object} dataJ 
 * @returns {Promise<boolean>}
 */
export function performPost(url, dataJ) {
    let d = dataJ

    return postData(url, d)
        .then((data) => {
                if (!data.error) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Operation reussit !',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    return true
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
                    return false
                }
            },
            (e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'reessayer plus tard!',
                })
                return false
            });
}

/**
 * 
 * @param {number} date 
 * @returns {String}
 */
export function getMonthFromNumber(date) {
    switch (date) {
        case 0:
            return 'JAN'
        case 1:
            return 'FEB'
        case 2:
            return 'MAR'
        case 3:
            return 'AVR'
        case 4:
            return 'MAI'
        case 5:
            return 'JUN'
        case 6:
            return 'JUL'
        case 7:
            return 'AOU'
        case 8:
            return 'SEP'
        case 9:
            return 'OCT'
        case 10:
            return 'NOV'
        case 11:
            return 'DEC'

        default:
            break;
    }
}