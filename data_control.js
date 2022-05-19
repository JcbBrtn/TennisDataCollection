let point_count = 1;
let data = [];
/*
Our data is an array of arrays. Each element of the array has an index that is the point count and follows the following form.
point = [point_count, shot_count, side, shot_type, miss_place, end_type, ended_by]
*/

function Update_Player_Label(p_name){
    var player = document.getElementById(p_name);
    var player_label = document.getElementById(p_name+"_Label");

    if (player.value === ""){
        player_label.innerText = p_name;
        document.getElementById(p_name+"_Table").innerText = p_name;
        document.getElementById(p_name+"_Radio").disabled = true;
    }
    else{
        player_label.innerText=player.value;
        document.getElementById(p_name+"_Table").innerText = player.value;
        document.getElementById(p_name+"_Radio").disabled = false;
    }
}

function Select_Radio(e_str){
    document.getElementById(e_str).checked=true;
}

function Toggle_Table(){
    table = document.getElementById("match_data");
    table.classList.toggle("invisible");
}

function Check_For_Serve(){
    let truth = Number(document.getElementById("Shot_Count").value) == 1;

    document.getElementById("ServeSide_Radio").checked = truth;
    document.getElementById("Serve_Radio").checked = truth;

    document.getElementById("ServeSide_Radio").disabled = !truth;
    document.getElementById("Serve_Radio").disabled = !truth;

    document.getElementById("Forehand_Radio").disabled = false;
    document.getElementById("Backhand_Radio").disabled = false;

    document.getElementById("Drive_Radio").disabled = truth;
    document.getElementById("Volley_Radio").disabled = truth;
    document.getElementById("Lob_Radio").disabled = truth;
    document.getElementById("Overhead_Radio").disabled = truth;
    document.getElementById("FE_Radio").disabled = truth;

}

function Reset_Input_Fields(){
    //Reset Shot count
    document.getElementById("Shot_Count").value = 1;

    //Clear all radio buttons
    var radios = document.getElementsByTagName('input');
    for (i = 0; i < radios.length; i++) {
        if (radios[i].type == 'radio') {
            radios[i].checked = false;
        }
    }

    Check_For_Serve();
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

function Create_New_Rows(p_count, shot_count, side, shot_type, miss_place, end_type, ended_by){
    //create the new row
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

    Point_Number.innerHTML = p_count;
    this_point.push(p_count);

    Shot_Count.innerHTML = shot_count;
    this_point.push(shot_count);

    Side.innerHTML = side;
    this_point.push(side);

    Shot_Type.innerHTML = shot_type;
    this_point.push(shot_type);

    Miss_Place.innerHTML = miss_place;
    this_point.push(miss_place);

    End_Type.innerHTML = end_type;
    this_point.push(end_type);

    Ended_By.innerHTML = ended_by;
    this_point.push(ended_by);

    data.push(this_point);
}

function Add_Point_Data() {

    //Check the side radios for forehand or backhand
    arr = ["Forehand", "Backhand"];
    let side = Get_Radio_Values(arr);

    //Check the Type radios for the type of shot missed
    arr = ["Serve", "Drive", "Volley", "Lob", "Overhead"];
    let shot_type = Get_Radio_Values(arr);
    

    //Check to see how the shot was missed
    arr = ["None", "Long", "Wide", "Net"];
    let miss_place = Get_Radio_Values(arr);
    

    //Check to see what kind of error it was
    arr = ["Winner", "UE", "FE"];
    let end_type = Get_Radio_Values(arr);
    

    //Get data from Player Ended radio buttons
    arr = ["Player1", "Player2", "Player3", "Player4"];
    let ended_by = Get_Radio_Values(arr);
    
    Create_New_Rows(point_count, shot_count, side, shot_type, miss_place, end_type, ended_by);

    //increment the point count
    point_count++;

    //Reset all of the input field back to their default values.
    Reset_Input_Fields();

    //Update the Stats fields
    Update_Stats();

    //focus back on shotcount for ease of keyboard use
    document.getElementById("Shot_Count").focus();
}

function TableToCSV(t_name) {
 
    // Variable to store the final csv data
    var csv_data = [];

    // Get each row data
    var rows = document.getElementById(t_name).rows;
    for (var i = 0; i < rows.length; i++) {

        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file 
    downloadCSVFile(csv_data, t_name);

}

function downloadCSVFile(csv_data, t_name) {

    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');

    //create CSV file's name
    var file_name = t_name + "_" + document.getElementById("Player1").value + "_"
     + document.getElementById("Player2").value + "_" 
     + document.getElementById("Player3").value + "_" + 
     document.getElementById("Player4").value + ".csv";

    // Download csv file
    temp_link.download = file_name;
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}

function Read_In_Match_Data(evt){
    var files = evt.target.files; // FileList object

    f = files[0];

    // Only process csv files.
    if (!f.type.match("text/csv")) {
        alert("We can only read in csv files.");
        return;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(f) {
        let filestring = reader.result;
        Parse_CSV_And_Add_Point(filestring);
    });

    reader.readAsText(f);
}

function Parse_CSV_And_Add_Point(filestring){
    
    csv_rows = filestring.split('\n');
    let full_csv = [];
    let players = [];
    for(let i=0; i < csv_rows.length; i++){
        let row_arr = csv_rows[i].split(',')
        full_csv.unshift(row_arr);

        //look for unique player values to add to the player values
        if(!players.includes(row_arr[1])){
            players.push(row_arr[1]);
        }
    }

    //update players values
    if(players.length > 4){
        alert("Too many player values found. Max of 4 players in a data set");
        return;
    }
    while(players.length < 4  ){
        players.push("");
    }
    //TODO UPDATE THE VALUES HERE AND CONTINUE WRITING THIS METHOD

    //Get all unique values in the Ended_by row (rows 1)
    

    Create_New_Rows(point_count, shot_count, side, shot_type, miss_place, end_type, ended_by);
}

//#################################################################
//
//                Statistical Analysis Methods
//
//#################################################################

function Mean(arr){
    if(arr.length == 0){
        return 0;
    }

    total = 0;
    for(var i in arr){
        total += arr[i];
    }
    return total/arr.length;
}

function STD(arr, mean){
    if(arr.length == 0 ){
        return 0;
    }

    // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k)=>{
      return (k - mean) ** 2
    })
     
    // Calculating the sum of updated array
   let sum = arr.reduce((acc, curr)=> acc + curr, 0);
    
   // Calculating the variance
   let variance = sum / arr.length
    
   // Returning the Standered deviation
   return Math.sqrt(sum / arr.length)
  }

function Update_Stats(){
    let checks = [SCL3, FT9, TT20, SG20];
    let stats = ["SCL3", "FT9", "TT20", "SG20"]
    let players = ["Player1", "Player2", "Player3", "Player4"];
    let total_btb = 0;
    let avg_arr = [];
    let total_sc = [];
    
    for(let i =0; i < players.length; i++){

        let first_letter_column_val_pair = {'U': 'Unforced Error', 'F': 'Forced Error'}; //column number 5
        let second_letter_column_val_pair = {'D': "Drive", 'V': 'Volley', 'L': 'Lob', 'O': 'Overhead'}; //column number 3
        let third_letter_column_val_pair = {'N':'Net', 'L': 'Long', 'W': 'Wide'}; //column number 4

        let total = 0;
        p = players[i];
        player_name = document.getElementById(p + "_Label").innerText;

        //Shot Count Family of Stats
        for (let j=0; j < stats.length; j++){
            let check = checks[j];
            let stat = stats[j];

            //reset Total Column to 0 if Player1 is the current player.
            if(i == 0){
                document.getElementById("Total_"+stat).innerText=0;
            }

            var count = Get_Shot_Count_Stats(check, player_name);
            document.getElementById(p + "_" + stat).innerText = count;

            Add_Count_To_Total(stat, count);
        }

        //Time to do BTB, avg, sd and shot tolerance
        let last_shot_count = 0;
        let btb_count = 0;
        let sc_for_player = [];
        for(let j = 0; j < data.length; j++){
            point = data[j];

            if(point[6] == player_name){
                sc_for_player.push(Number(point[1]));
                if(point[1] >= 10 && last_shot_count >= 10){
                    btb_count++;
                }
            }

            if(p == "Player4"){
                if(point[1] >= 10 && last_shot_count >= 10){
                    total_btb++;
                }
                total_sc.push(Number(point[1]));
            }

            last_shot_count = point[1];
        }

        document.getElementById(p + "_BTB").innerText = btb_count;

        let mean = Mean(sc_for_player);
        avg_arr.push(mean);
        document.getElementById(p+"_ASC").innerText = mean.toString().substring(0, 3);

        let std = STD(sc_for_player, mean);
        document.getElementById(p+"_SSC").innerText = std.toString().substring(0, 3)

        document.getElementById(p+"_ST").innerText = (mean + std).toString().substring(0, 3);

        //Lets do the 3 letter stat family
        for(var f_key in first_letter_column_val_pair){
            for(var s_key in second_letter_column_val_pair){
                for(var t_key in third_letter_column_val_pair){

                    var stat = f_key + s_key + t_key;
                    if(i == 0){
                        document.getElementById("Total_"+stat).innerText=0;
                    }

                    var count = Get_Other_Counts(player_name, 5, first_letter_column_val_pair[f_key], 3, second_letter_column_val_pair[s_key], 4, third_letter_column_val_pair[t_key]);

                    document.getElementById(p + "_" + stat).innerText = count;

                    Add_Count_To_Total(stat, count);
                }
            }
        }
        
        side_col_val_pairs = {'F': 'Forehand', 'B': 'Backhand', 'S': 'Serve'};
        first_letter_column_val_pair['W'] = 'Winner'

        for(var f_key in first_letter_column_val_pair){
            for(var s_key in side_col_val_pairs){
                var stat = f_key + s_key;
                
                if(stat != 'FS'){
                    if(i == 0){
                        document.getElementById("Total_"+stat).innerText=0;
                    }

                    var count = Get_Other_Counts(player_name, 5, first_letter_column_val_pair[f_key], 2, side_col_val_pairs[s_key], 5, first_letter_column_val_pair[f_key]);

                    document.getElementById(p + "_" + stat).innerText = count;

                    Add_Count_To_Total(stat, count);
                }
            }
            if(f_key == 'W'){
                for(var s_key in second_letter_column_val_pair){
                    var stat = f_key + s_key;
                    if(i == 0){
                        document.getElementById("Total_"+stat).innerText=0;
                    }
                    var count = 0;

                    count = Get_Other_Counts(player_name, 5, first_letter_column_val_pair[f_key], 3, second_letter_column_val_pair[s_key], 5, first_letter_column_val_pair[f_key]);

                    document.getElementById(p + "_" + stat).innerText = count;

                    Add_Count_To_Total(stat, count);
                }
            }
        }
    }

    //Need to do the Total column for Avg, SD, and Shot Tolerance
    document.getElementById("Total_BTB").innerText = total_btb;

    total_mean = Mean(total_sc);
    document.getElementById("Total_ASC").innerText = total_mean.toString().substring(0, 3);

    total_std = STD(total_sc, total_mean);
    document.getElementById("Total_SSC").innerText = total_std.toString().substring(0, 3);

    document.getElementById("Total_ST").innerText = (total_mean + total_std).toString().substring(0, 3);
}

function Add_Count_To_Total(property, count){
    total = document.getElementById("Total_" + property).innerText;
    document.getElementById("Total_" + property).innerText = Number(total) + count;
}

function SCL3(point, player){
    return (point[6] == player) && (Number(point[1]) <= 3);
}

function FT9(point, player){
    return (point[6] == player) && (Number(point[1]) > 3) && (Number(point[1] < 10));
}

function TT20(point, player){
    return (point[6] == player) && (Number(point[1]) > 9) && (Number(point[1] < 20));
}

function SG20(point, player){
    return (point[6] == player) && (Number(point[1]) >= 20);
}

function Get_Shot_Count_Stats(Check_Func, player){
    total = 0;
    for (let i = 0; i < data.length; i++){
        point = data[i];
        if(Check_Func(point, player)){
            total+=1;
        }
    }
    return total;
}

function Get_Other_Counts(player, row1, check1, row2, check2, row3, check3){
    let total = 0;
    for(let i = 0; i < data.length; i++){
        point = data[i];
        if (point[6] == player && point[row1] == check1 && point[row2] == check2 && point[row3] == check3){
            total++;
        }
    }
    return total;
}