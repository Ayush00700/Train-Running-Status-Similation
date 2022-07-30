const button = document.getElementById('submitbutton')
button.addEventListener("click", e=>{
    e.preventDefault()
    var x = document.getElementsByTagName('select')[0];
    var y = document.getElementsByTagName('select')[1];
    fetch(`trainsbw/${x.value}/${y.value}`).then(res=>{
        return res.json()
    }).then(res=>{
        // console.log(res)
        addtable(res)
    })
})


function addtable(trains){
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ""
    // for(train in trains){
    //     console.log(trains[train])
    // }
    for(train in trains){
        let row_2 = document.createElement('tr')
        let row_2_data_1 = document.createElement('td')
        row_2_data_1.innerHTML = trains[train]['train_no']
        let row_2_data_2 = document.createElement('td')
        row_2_data_2.innerHTML = trains[train]['train_name']
        let row_2_data_3 = document.createElement('td')
        row_2_data_3.innerHTML = trains[train]['starting_station']
        let row_2_data_4 = document.createElement('td');
        row_2_data_4.innerHTML = trains[train]['destination_station'] ;
        let row_2_data_5 = document.createElement('td');
        row_2_data_5.innerHTML = trains[train]['arrival_time'] ;
        let row_2_data_6 = document.createElement('td');
        row_2_data_6.innerHTML = trains[train]['dept_time'] ;

        row_2.appendChild(row_2_data_1)
        row_2.appendChild(row_2_data_2)
        row_2.appendChild(row_2_data_3)
        row_2.appendChild(row_2_data_4)
        row_2.appendChild(row_2_data_5)
        row_2.appendChild(row_2_data_6)
        tbody.appendChild(row_2)
    }

}

function addoptions(station_list){
    for(station in station_list){
        var x = document.getElementsByTagName('select')[0];
        var y = document.getElementsByTagName('select')[1];
        var option = document.createElement("option");
        option.value = station_list[station]['station_name'];
        // console.log(option.value);
        option.text = station_list[station]['station_name'];
        var option1 = document.createElement("option");
        option1.value = station_list[station]['station_name'];
        // console.log(option.value);
        option1.text = station_list[station]['station_name'];
        x.add(option);
        y.add(option1);

    }
}


fetch('/allstations').then(res=>{
    return res.json()
}).then(res=>{
    addoptions(res)
})
