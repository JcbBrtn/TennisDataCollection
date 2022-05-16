let point_count = 1;

function Update_Player1_Label(){
    var player1 = document.getElementById("Player1");
    var player1_label = document.getElementById("Player1_Label");
    player1_label.innerText=player1.value;
}

function Update_Player2_Label(){
    var player2 = document.getElementById("Player2");
    var player2_label = document.getElementById("Player2_Label");
    player2_label.innerText=player2.value;
}

function Focus_On_Submit_Button(){
    document.getElementById("Submit_Btn").focus();
}

function Add_Point_Data() {
    var table = document.getElementById("match_data");
    var row = table.insertRow(2);

    //create the new row's columns
    var Point_Number = row.insertCell(0);
    var Ended_By = row.insertCell(1);
    var Shot_Count = row.insertCell(2);
    var Side = row.insertCell(3);
    var Shot_Type = row.insertCell(4);
    var Miss_Place = row.insertCell(5);
    var End_Type = row.insertCell(6);
    var Condensed = row.insertCell(7);
    

    //insert the data for each new column
    Point_Number.innerHTML = point_count;
    Shot_Count.innerHTML = document.getElementById("Shot_Count").value;
    Side.innerHTML = document.getElementById("Side").value;
    Shot_Type.innerHTML = document.getElementById("Shot").value;
    Miss_Place.innerHTML = document.getElementById("Place").value;
    End_Type.innerHTML = document.getElementById("Type").value;

    if (document.getElementById("Player1_Radio").checked){
        Ended_By.innerHTML = document.getElementById("Player1_Label").innerText; 
    }

    if (document.getElementById("Player2_Radio").checked){
        Ended_By.innerHTML = document.getElementById("Player2_Label").innerText; 
    }

    //increment the point count
    point_count++;

    //Change focus back to Shot count for ease of keyboard use
    document.getElementById("Shot_Count").focus()
}