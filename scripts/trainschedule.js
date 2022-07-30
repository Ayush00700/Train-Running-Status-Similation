function addoptions(train_list){
    for(train in train_list){
        var x = document.getElementsByTagName('select')[0];
        var option = document.createElement("option");
        option.value = train_list[train]['train_name'];
        // console.log(option.value);
        option.text = train_list[train]['train_name'];
        x.add(option);

    }
}


fetch('/alltrains').then(res=>{
    return res.json()
}).then(res=>{
    addoptions(res)
})

function displayschedule(){
    var x = document.getElementsByTagName('select')[0];
    fetch(`trainschedule/${x.value}`).then(res=>{
        return res.json()
    }).then(res=>{
        console.log(res)
        addtable(res)
    })
}

function addtable(schedule){
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ""
    for(station in schedule){
        console.log(schedule[station])
    }
    for(station in schedule){
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = schedule[station]['station_no'];
        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = schedule[station]['arrival_time'];
        let row_2_data_3 = document.createElement('td');
        row_2_data_3.innerHTML = schedule[station]['dept_time'];
        let row_2_data_4 = document.createElement('td');
        row_2_data_4.innerHTML = `${schedule[station]['distance']} km` ;

        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        tbody.appendChild(row_2);
    }
}
