let point_count = 1;
let data = [];
let is_Per = false;
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

function Toggle_Percents(){
    if(is_Per){
        is_Per = false;
        document.getElementById("Per_Tog_Btn").innerText = "Show Percentage";

    } else {
        is_Per = true;
        document.getElementById("Per_Tog_Btn").innerText = "Show Count";
    }

    Update_Stats();
}

function Check_For_Serve(){
    let truth = Number(document.getElementById("Shot_Count").value) == 1;

    document.getElementById("ServeSide_Radio").checked = truth;
    document.getElementById("Serve_Radio").checked = truth;

    document.getElementById("ServeSide_Radio").disabled = !truth;
    document.getElementById("Serve_Radio").disabled = !truth;

    document.getElementById("Forehand_Radio").disabled = truth;
    document.getElementById("Backhand_Radio").disabled = truth;

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

    Shot_Count.innerHTML = `<input class="col-xs-2 border-0" type="number" id="Shot_Count_${p_count}" min="1" value="${shot_count}" onchange="Update_Point_Data(${p_count}, 1, 'Shot_Count_${p_count}')"/>`;
    this_point.push(shot_count);

    Side.innerHTML = Get_Select_Tag('Side', side, p_count, 2);
    this_point.push(side);

    Shot_Type.innerHTML = Get_Select_Tag('Shot_Type', shot_type, p_count, 3);
    this_point.push(shot_type);

    Miss_Place.innerHTML = Get_Select_Tag('Miss_Place', miss_place, p_count, 4);
    this_point.push(miss_place);

    End_Type.innerHTML = Get_Select_Tag('End_Type', end_type, p_count, 5);
    this_point.push(end_type);

    Ended_By.innerHTML = Get_Select_Tag('Ended_By', ended_by, p_count, 6);
    this_point.push(ended_by);

    data.push(this_point);
}

function Get_Select_Tag(key, val, p_count, col){
    let Card_Key_Val_Pair = {'Side' : ['Serve', 'Forehand', 'Backhand'],
                        'Shot_Type' : ["Serve", "Drive", "Volley", "Lob", "Overhead"],
                        'Miss_Place' : ["Winner", "Long", "Wide", "Net"],
                        'End_Type' : ["Winner", "Unforced Error", "Forced Error"]};
    
    //Get the end by selection arr
    let p_arr = []
    for(let i = 1; i <= 4; i++){
        p_val = document.getElementById("Player" + i).value;
        if(p_val !== ""){
            p_arr.push(p_val);
        }
    }
    Card_Key_Val_Pair['Ended_By'] = p_arr;
    
    let arr = Card_Key_Val_Pair[key];
    let out_str = `<select class="border-0" id="${key}_${p_count}" style="-moz-appearance: none; -webkit-appearance: none;" onchange="Update_Point_Data(${p_count}, ${col}, '${key}_${p_count}')">`;
    for(let i = 0; i < arr.length; i++){
        out_str += `<option value="${arr[i]}"`;
        if(arr[i] == val){
            out_str += ` selected`
        }
        out_str += `>${arr[i]}</option>`
    }

    return out_str;
}

function Update_Point_Data(p_count, col, e_id){
    data[p_count-1][col] = document.getElementById(e_id).value;
    //console.log(`p_count : ${p_count}, col : ${col}, ${e_id}`);
    Update_Stats();
}

function Add_Point_Data() {

    //Get Shot_Count
    let shot_count = document.getElementById("Shot_Count").value;

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
    var csv_data = [['Point Number','Shot Count','Side','Shot Type','Miss Place', 'End Type', 'Ended By']];

    // Get each row data
    for (var i = 0; i < data.length; i++) {

        // Get each column data
        var cols = data[i];

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j]);
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
        let row_arr = csv_rows[i].split(',');
        let pc = row_arr[0];
        let shot_count = row_arr[1];
        let side = row_arr[2];
        let shot_type = row_arr[3];
        let miss_place = row_arr[4];
        let end_type = row_arr[5];
        let ended_by = row_arr[6];

        if(Valid_Input(pc, shot_count, side, shot_type, miss_place, end_type, ended_by)){
            ended_by = Clean_Ended_By_Input(ended_by);

            full_csv.push([pc, shot_count, side, shot_type, miss_place, end_type, ended_by]);

            //look for unique player values to add to the player values
            if(!players.includes(ended_by)){
                players.push(ended_by);
            }
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

    for(let i = 0; i < 4; i++){
        player_elem = document.getElementById("Player"+(i+1)).value = players[i];
        Update_Player_Label("Player"+(i+1));
    }

    //Parse through each point and all it using the Create_New_Rows_method
    for(let i = 0; i < full_csv.length; i++){

        let pc = full_csv[i][0];
        let shot_count = full_csv[i][1];
        let side = full_csv[i][2];
        let shot_type = full_csv[i][3];
        let miss_place = full_csv[i][4];
        let end_type = full_csv[i][5]
        let ended_by = full_csv[i][6];
        Create_New_Rows(pc, shot_count, side, shot_type, miss_place, end_type, ended_by);
    }

    point_count = full_csv.length + 1;

    //Update the Stats fields
    Update_Stats();
}

function Clean_Ended_By_Input(ended_by){
    ended_by = ended_by.replace("\r", "");
    ended_by = ended_by.replace("\t", "");
    ended_by = ended_by.replace("\n", "");
    ended_by = ended_by.trim();
    return ended_by;
}

function Valid_Input(pc, shot_count, side, shot_type, miss_place, end_type, ended_by){
    try {
        if(Number(pc) != pc || Number(shot_count) != shot_count){
            console.log("Point Count :" +  pc)
            console.log("Shot count : " + shot_count);
            return false;
        }
        if(!["Forehand", "Backhand", "Serve", ""].includes(side.trim())){
            console.log("Side : " + side);
            return false;
        }
        if (!["Serve", "Drive", "Volley", "Lob", "Overhead", ""].includes(shot_type.trim())){
            console.log("Shot Type : " + shot_type);
            return false;
        }
        if (!["Winner", "Long", "Wide", "Net", ""].includes(miss_place.trim())){
            console.log("Miss Place : " + miss_place);
            return false;
        }
        if (!["Winner", "Unforced Error", "Forced Error"].includes(end_type.trim())){
            console.log("End Type : " + end_type);
            return false;
        }

        return true;

    } catch (ex) {
        console.log(ex.toString());
    }
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
                Reset_Cell("Total_"+stat);
            }

            var count = Get_Shot_Count_Stats(check, player_name);
            Insert_Value_Into_Stats(p + "_" + stat, count);

            Add_Count_To_Total(stat, count, i);
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

        Insert_Count(p + "_BTB", btb_count);

        let mean = Mean(sc_for_player);
        avg_arr.push(mean);
        Insert_Count(p+"_ASC", mean);

        let std = STD(sc_for_player, mean);
        Insert_Count(p+"_SSC", std);

        Insert_Count(p+"_ST",mean + std);

        //Lets do the 3 letter stat family
        for(var f_key in first_letter_column_val_pair){
            for(var s_key in second_letter_column_val_pair){
                for(var t_key in third_letter_column_val_pair){

                    var stat = f_key + s_key + t_key;
                    if(i == 0){
                        Reset_Cell("Total_"+stat);
                    }

                    var count = Get_Other_Counts(player_name, 5, first_letter_column_val_pair[f_key], 3, second_letter_column_val_pair[s_key], 4, third_letter_column_val_pair[t_key]);

                    Insert_Value_Into_Stats(p + "_" + stat, count);

                    Add_Count_To_Total(stat, count, i);
                }
            }
        }
        
        side_col_val_pairs = {'F': 'Forehand', 'B': 'Backhand', 'S': 'Serve'};
        first_letter_column_val_pair['W'] = 'Winner'
        second_letter_column_val_pair['S'] = 'Serve';

        for(var f_key in first_letter_column_val_pair){
            let total_f_key_count = 0;

            for(var s_key in side_col_val_pairs){
                var stat = f_key + s_key;
                
                if(stat != 'FS'){
                    if(i == 0){
                        Reset_Cell("Total_"+stat);
                    }

                    var count = Get_Other_Counts(player_name, 5, first_letter_column_val_pair[f_key], 2, side_col_val_pairs[s_key], 5, first_letter_column_val_pair[f_key]);

                    if (count == 0){
                        count = Get_Other_Counts(player_name, 5, first_letter_column_val_pair[f_key], 3, side_col_val_pairs[s_key], 5, first_letter_column_val_pair[f_key]);
                    }

                    total_f_key_count+= count

                    Insert_Value_Into_Stats(p + "_" + stat, count)

                    Add_Count_To_Total(stat, count, i);
                }
            }
            if(f_key == 'W'){
                for(var s_key in second_letter_column_val_pair){
                    var stat = f_key + s_key;
                    if(i == 0){
                        Reset_Cell("Total_"+stat);
                    }
                    var count = 0;

                    count = Get_Other_Counts(player_name, 5, first_letter_column_val_pair[f_key], 3, second_letter_column_val_pair[s_key], 5, first_letter_column_val_pair[f_key]);

                    total_f_key_count += count;

                    Insert_Value_Into_Stats(p + "_" + stat, count)

                    Add_Count_To_Total(stat, count, i);
                }
            }
            Insert_Value_Into_Stats(p + "_" + f_key, total_f_key_count)

            if(i == 0){
                Reset_Cell("Total_"+f_key);
            }

            Add_Count_To_Total(f_key, total_f_key_count, i);

        }
    }

    //Need to do the Total column for Avg, SD, and Shot Tolerance
    Insert_Count("Total_BTB", total_btb);

    total_mean = Mean(total_sc);
    Insert_Count("Total_ASC", total_mean)

    total_std = STD(total_sc, total_mean);
    Insert_Count("Total_SSC", total_std)

    Insert_Count("Total_ST", total_mean + total_std)
}

function Insert_Value_Into_Stats(cell_id, val){
    let to_insert = "";
    if(is_Per){
        Insert_Percent(cell_id, val);
    } else {
        Insert_Count(cell_id, val);
    }
}

function Insert_Count(cell_id, val){
    document.getElementById(cell_id).innerText = val.toString().substring(0, 4);
}

function Insert_Percent(cell_id,val){
    document.getElementById(cell_id).innerText = (100 * (val/ point_count)).toString().substring(0, 4) + "%";
}

function Reset_Cell(cell_id){
    document.getElementById(cell_id).innerText = 0;
}

function Add_Count_To_Total(property, count, i){
    total = document.getElementById("Total_" + property).innerText;
    if(total.slice(-1) == "%"){
        total = total.slice(0, -1);
    }
    if ((i == 3) && is_Per){
        Insert_Percent("Total_" + property, Number(total) + count);
    } else {
        Insert_Count("Total_" + property, Number(total) + count);
    }
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