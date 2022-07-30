function addoptions(station_list){
    for(station in station_list){
        var x = document.getElementsByTagName('select')[0];
        var option = document.createElement("option");
        option.value = station_list[station]['station_name'];
        // console.log(option.value);
        option.text = station_list[station]['station_name'];
        x.add(option);

    }
}


fetch('/allstations').then(res=>{
    return res.json()
}).then(res=>{
    addoptions(res)
})

function displayschedule(){
    var x = document.getElementsByTagName('select')[0];
    fetch(`stationschedule/${x.value}`).then(res=>{
        return res.json()
    }).then(res=>{
        console.log(res)
        addtable(res)
    })
}

function addtable(schedule){
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ""
    // for(station in schedule){
    //     console.log(schedule[station])
    // }
    for(station in schedule){
        let row_2 = document.createElement('tr')
        let row_2_data_1 = document.createElement('td')
        row_2_data_1.innerHTML = schedule[station]['train_no']
        let row_2_data_2 = document.createElement('td')
        row_2_data_2.innerHTML = schedule[station]['train_name']
        let row_2_data_3 = document.createElement('td')
        row_2_data_3.innerHTML = schedule[station]['arrival_time']
        let row_2_data_4 = document.createElement('td');
        row_2_data_4.innerHTML = schedule[station]['dept_time'] ;

        row_2.appendChild(row_2_data_1)
        row_2.appendChild(row_2_data_2)
        row_2.appendChild(row_2_data_3)
        row_2.appendChild(row_2_data_4)
        tbody.appendChild(row_2)
    }

}
