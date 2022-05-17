let point_count = 1;
let data = [];
/*
Our data is an array of arrays. Each element of the array has an index that is the point count and follows the following form.
point = [point_count, ended_by, shot_count, side, shot_type, miss_place, end_type]
*/

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

function Update_Player3_Label(){
    var player3 = document.getElementById("Player3");
    var player3_label = document.getElementById("Player3_Label");

    if (player3.value === ""){
        player3_label.innerText = "Player 3";
        document.getElementById("Player3_Radio").disabled = true;
    }
    else{
        player3_label.innerText=player3.value;
        document.getElementById("Player3_Radio").disabled = false;
    }
}

function Update_Player4_Label(){
    var player4 = document.getElementById("Player4");
    var player4_label = document.getElementById("Player4_Label");

    if (player4.value === ""){
        player4_label.innerText = "Player 4";
        document.getElementById("Player4_Radio").disabled = true;
    }
    else{
        player4_label.innerText=player4.value;
        document.getElementById("Player4_Radio").disabled = false;
    }
}

function Toggle_Table(){
    table = document.getElementById("match_data");
    table.classList.toggle("invisible");
}

function Reset_Input_Fields(){
    //Reset Shot count
    document.getElementById("Shot_Count").value = 1;

    //Clear all radio buttons
    document.getElementById("Serve_Radio").checked = false;
    document.getElementById("Forehand_Radio").checked = false;
    document.getElementById("Backhand_Radio").checked = false;
    document.getElementById("Drive_Radio").checked = false;
    document.getElementById("Volley_Radio").checked = false;
    document.getElementById("Lob_Radio").checked = false;
    document.getElementById("Overhead_Radio").checked = false;
    document.getElementById("None_Radio").checked = false;
    document.getElementById("Long_Radio").checked = false;
    document.getElementById("Wide_Radio").checked = false;
    document.getElementById("Net_Radio").checked = false;
    document.getElementById("Winner_Radio").checked = false;
    document.getElementById("UE_Radio").checked = false;
    document.getElementById("FE_Radio").checked = false;
    document.getElementById("Player1_Radio").checked = false;
    document.getElementById("Player2_Radio").checked = false;
    document.getElementById("Player3_Radio").checked = false;
    document.getElementById("Player4_Radio").checked = false;
}

function Add_Point_Data() {
    var table = document.getElementById("match_data");
    var row = table.insertRow(1);

    //create the new row's columns
    var Point_Number = row.insertCell(0);
    var Ended_By = row.insertCell(1);
    var Shot_Count = row.insertCell(2);
    var Side = row.insertCell(3);
    var Shot_Type = row.insertCell(4);
    var Miss_Place = row.insertCell(5);
    var End_Type = row.insertCell(6);
    var Condensed = row.insertCell(7);
    
    var this_point = []

    //insert the data for each new column
    Point_Number.innerHTML = point_count;
    Shot_Count.innerHTML = document.getElementById("Shot_Count").value;

    //Check the side radios for forehand or backhand
    if (document.getElementById("Forehand_Radio").checked){
        Side.innerHTML = document.getElementById("Forehand_Label").innerText; 
    }
    else if (document.getElementById("Backhand_Radio").checked){
        Side.innerHTML = document.getElementById("Backhand_Label").innerText; 
    }

    //Check the Type radios for the type of shot missed
    if (document.getElementById("Serve_Radio").checked){
        Shot_Type.innerHTML = document.getElementById("Serve_Label").innerText;
    }
    if (document.getElementById("Drive_Radio").checked){
        Shot_Type.innerHTML = document.getElementById("Drive_Label").innerText;
    }
    if (document.getElementById("Volley_Radio").checked){
        Shot_Type.innerHTML = document.getElementById("Volley_Label").innerText;
    }
    if (document.getElementById("Lob_Radio").checked){
        Shot_Type.innerHTML = document.getElementById("Lob_Label").innerText;
    }
    if (document.getElementById("Overhead_Radio").checked){
        Shot_Type.innerHTML = document.getElementById("Overhead_Label").innerText;
    }

    //Check to see how the shot was missed
    if (document.getElementById("None_Radio").checked){
        Miss_Place.innerHTML = "";
    }
    if (document.getElementById("Long_Radio").checked){
        Miss_Place.innerHTML = document.getElementById("Long_Label").innerText;
    }
    if (document.getElementById("Wide_Radio").checked){
        Miss_Place.innerHTML = document.getElementById("Wide_Label").innerText;
    }
    if (document.getElementById("Net_Radio").checked){
        Miss_Place.innerHTML = document.getElementById("Net_Label").innerText;
    }

    //Check to see what kind of error it was
    if (document.getElementById("Winner_Radio").checked){
        End_Type.innerHTML = document.getElementById("Winner_Label").innerText;
    }
    if (document.getElementById("UE_Radio").checked){
        End_Type.innerHTML = document.getElementById("UE_Label").innerText;
    }
    if (document.getElementById("FE_Radio").checked){
        End_Type.innerHTML = document.getElementById("FE_Label").innerText;
    }

    //Get data from Player Ended radio buttons
    if (document.getElementById("Player1_Radio").checked){
        Ended_By.innerHTML = document.getElementById("Player1_Label").innerText; 
    }
    if (document.getElementById("Player2_Radio").checked){
        Ended_By.innerHTML = document.getElementById("Player2_Label").innerText; 
    }
    if (document.getElementById("Player3_Radio").checked){
        Ended_By.innerHTML = document.getElementById("Player3_Label").innerText; 
    }
    if (document.getElementById("Player4_Radio").checked){
        Ended_By.innerHTML = document.getElementById("Player4_Label").innerText; 
    }

    //increment the point count
    point_count++;

    //Reset all of the input field back to their default values.
    Reset_Input_Fields();
}