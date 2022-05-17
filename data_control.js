let point_count = 1;
let data = [];
/*
Our data is an array of arrays. Each element of the array has an index that is the point count and follows the following form.
point = [point_count, shot_count, side, shot_type, miss_place, end_type, ended_by]
*/

function Update_Player1_Label(){
    var player1 = document.getElementById("Player1");
    var player1_label = document.getElementById("Player1_Label");
    player1_label.innerText=player1.value;
    document.getElementById("Player1_Table").innerText = player1.value;
}

function Update_Player2_Label(){
    var player2 = document.getElementById("Player2");
    var player2_label = document.getElementById("Player2_Label");
    player2_label.innerText=player2.value;
    document.getElementById("Player2_Table").innerText = player2.value;
}

function Update_Player3_Label(){
    var player3 = document.getElementById("Player3");
    var player3_label = document.getElementById("Player3_Label");

    if (player3.value === ""){
        player3_label.innerText = "Player 3";
        document.getElementById("Player3_Table").innerText = "Player 3";
        document.getElementById("Player3_Radio").disabled = true;
    }
    else{
        player3_label.innerText=player3.value;
        document.getElementById("Player3_Table").innerText = player3.value;
        document.getElementById("Player3_Radio").disabled = false;
    }
}

function Update_Player4_Label(){
    var player4 = document.getElementById("Player4");
    var player4_label = document.getElementById("Player4_Label");

    if (player4.value === ""){
        player4_label.innerText = "Player 4";
        document.getElementById("Player4_Table").innerText = "Player 4";
        document.getElementById("Player4_Radio").disabled = true;
    }
    else{
        player4_label.innerText=player4.value;
        document.getElementById("Player4_Radio").disabled = false;
        document.getElementById("Player4_Table").innerText = player4.value;
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

function Get_Radio_Values(arr_of_radios){
    for (var e of arr_of_radios){
        if (document.getElementById(e + "_Radio").checked){
            //If the radio is checked we want the label innerText
            inTxt = document.getElementById(e + "_Label").innerText;
            if(inTxt == "None"){
                return "";
            }
            else{
                return inTxt;
            }
        }
    }
    return "";
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
    
    var this_point = []

    //insert the data for each new column
    Point_Number.innerHTML = point_count;
    Shot_Count.innerHTML = document.getElementById("Shot_Count").value;
    this_point.push(document.getElementById("Shot_Count").value);

    //Check the side radios for forehand or backhand
    arr = ["Forehand", "Backhand"];
    s = Get_Radio_Values(arr);
    Side.innerHTML = s;
    this_point.push(s)

    //Check the Type radios for the type of shot missed
    arr = ["Serve", "Drive", "Volley", "Lob", "Overhead"];
    s = Get_Radio_Values(arr);
    Shot_Type.innerHTML = s;
    this_point.push(s)

    //Check to see how the shot was missed
    arr = ["None", "Long", "Wide", "Net"];
    s = Get_Radio_Values(arr);
    Miss_Place.innerHTML = s;
    this_point.push(s)

    //Check to see what kind of error it was
    arr = ["Winner", "UE", "FE"];
    s = Get_Radio_Values(arr);
    End_Type.innerHTML = s;
    this_point.push(s)

    //Get data from Player Ended radio buttons
    arr = ["Player1", "Player2", "Player3", "Player4"];
    s = Get_Radio_Values(arr);
    Ended_By.innerHTML = s;
    this_point.push(s)

    data.push(this_point);

    //increment the point count
    point_count++;

    //Reset all of the input field back to their default values.
    Reset_Input_Fields();
}