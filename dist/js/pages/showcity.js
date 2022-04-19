let idCity = new URL(location.href).searchParams.get("id");

function getCity() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/cities/${idCity}`,
        success: function (city) {
            let content = `  
        <tr>
        <td>1</td>
        <td>${city.name}</td>
        <td>${city.area}</td>
        <td>${city.population}</td>
        <td>${city.gdp}</td>
        <td>${city.country.name}</td>
        <td><button class="btn btn-primary" data-target="#edit-city" data-toggle="modal"
                                        type="button" onclick="editFormCity(${city.id})"><i class="fa fa-unlock"></i></button>
            <button class="btn btn-danger" data-target="#delete-city" data-toggle="modal"
                                        type="button" onclick="showDeleteCity(${city.id})"><i class="fa fa-lock"></i></button></td>
        </tr>`
            $('#show-city').html(content);
        }
    })
    event.preventDefault();
}

getCity();
