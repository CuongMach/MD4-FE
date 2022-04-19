function getAllCity() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/cities`,

        success: function (cities) {
            let content = ``;
            for (let i = 0; i < cities.length; i++) {
                content += `  
        <tr>
        <td>${i + 1}</td>
        <td><a href="/ktmd4/dist/js/pages/showcity.html?id=${cities[i].id}">${cities[i].name}</a></td>
        <td>${cities[i].area}</td>
        <td>${cities[i].population}</td>
        <td>${cities[i].gdp}</td>
        <td>${cities[i].country.name}</td>
        <td><button class="btn btn-primary" data-target="#edit-city" data-toggle="modal"
                                        type="button" onclick="editFormCity(${cities[i].id})"><i class="fa fa-unlock"></i></button>
            <button class="btn btn-danger" data-target="#delete-city" data-toggle="modal"
                                        type="button" onclick="showDeleteCity(${cities[i].id})"><i class="fa fa-lock"></i></button></td>
        </tr>`
            }
            $('#table-city').html(content);
        }
    })
    event.preventDefault();
}

function drawCountry() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/countries',
        success: function (countries) {
            let content = `<option>Chọn quốc gia</option>`
            for (let i = 0; i < countries.length; i++) {
                content += `<option value="${countries[i].id}">${countries[i].name}</option>`
            }
            $('#option_country').html(content);
        }
    })
}

function createNewCity() {
    let name = $('#name').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let option_country = $('#option_country').val();
    let city = {
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        country: {
            id: option_country,
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cities',
        data: JSON.stringify(city),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        success: function () {
            getAllCity();
            showSuccessMessage("Thành công")
        },
        error: function () {
            showErrorMessage('Lỗi')
        }
    })
}

function editFormCity(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities/${id}`,
        success: function (city) {
            $('#edit-name').val(city.name);
            $('#edit-area').val(city.area);
            $('#edit-population').val(city.population);
            $('#edit-gdp').val(city.gdp);
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/countries',
                success: function (countries) {
                    let content = `<option value="${city.country.id}">${city.country.name}</option>`
                    for (let i = 0; i < countries.length; i++) {
                        content += `<option value="${countries[i].id}">${countries[i].name}</option>`
                    }
                    $('#edit-option_country').html(content);
                }


            })
            let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editCity(${id})" type="button" aria-label="Close"
                            class="close" data-dismiss="modal">Chỉnh sửa
                    </button>`;
            $('#id-edit-city').html(content);
        }
    })
}

function editCity(id) {
    let name = $('#edit-name').val();
    let area = $('#edit-area').val();
    let population = $('#edit-population').val();
    let gdp = $('#edit-gdp').val();
    let option_country = $('#edit-option_country').val();
    let editCity = {
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        country: {
            id: option_country,
        }
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/cities/${id}`,
        data: JSON.stringify(editCity),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        success: function () {
            getAllCity();
            showSuccessMessage("Thành công")
        },
        error: function () {
            showErrorMessage('Lỗi')
        }
    })
}

function showDeleteCity(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteCity(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
    $('#id-delete-city').html(content);
}

function deleteCity(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/cities/${id}`,
        success: function () {
            getAllCity();
            showSuccessMessage('Xóa thành công!');
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}


$(document).ready(function () {
    getAllCity();
})
