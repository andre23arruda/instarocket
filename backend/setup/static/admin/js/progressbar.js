document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form')
    if (form && window.location.href.endsWith('change/')) {
        const referenceElement = document.querySelector('.submit-row')

        form.addEventListener('submit', event => {
            event.preventDefault()
            // console.log(checkFile(form))
            const progressBar = createProgressBar(referenceElement)
            if (checkFile(form)) {
                ajax(form, progressBar)
            } else {
                progressBar.value = 100
                event.target.submit()
            }
        })
    }
})

function checkFile(form) {
    let result = false
    const formData = Object.fromEntries(
        new FormData(form).entries()
    )
    for (const prop in formData) {
        result += formData[prop] instanceof File
    }
    return result
}

function createProgressBar(referenceElement) {
    const newElement = document.createElement('div')
    newElement.style.display = 'flex'
    newElement.style.alignItems = 'center'
    newElement.style.justifyContent = 'center'
    newElement.style.marginBottom = '20px'
    newElement.innerHTML = `
        <progress style="width: 75%" id="progress" value="0" max="100" />
    `
    // referenceElement.parentNode.insertBefore(newElement, referenceElement)
    referenceElement.after(newElement)
    return document.querySelector('#progress')
}


function updateProgressBar (event, progressBar) {
    if (event.lengthComputable) {
        progressBar.value = (event.loaded / event.total) * 100
    }
}

function ajax (form, progressBar) {
    const data = new FormData(form)
    const method = form.getAttribute('method')
    const url = window.location.href
    xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onload = () => {
        // console.log(xhr)
        setTimeout(() => refresh(xhr) , 1000)
    }
    xhr.upload.onprogress = event => updateProgressBar(event, progressBar)
    xhr.send(data)
}

function refresh(xhr) {
    document.open()
    document.write(xhr.responseText)
    document.close()
    window.history.replaceState({}, '', xhr.responseURL)
}

// function redirectToList(currentUrl) {
//     let redirectTo = currentUrl.split('/')
//     redirectTo.splice(-3, 3)
//     window.location.assign(redirectTo.join('/'))
// }
