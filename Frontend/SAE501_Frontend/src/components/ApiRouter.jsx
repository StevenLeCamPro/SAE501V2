const api = "http://127.0.0.1:8000"

function ApiRouter (table, method, id) {

    if (id) {
        var apiUrl = `${api}/${table}/${id}/${method}`
    } else {
        var apiUrl = `${api}/${table}/${method}`
    }

    console.log(apiUrl)

    return apiUrl

}

export default ApiRouter