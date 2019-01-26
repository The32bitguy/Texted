//edt functions
function mkfileb_OnTouch()
{
	mkfile()
}

//Called when a file is chosen.
function OnFileChoose( file )
{
    fdlg.Dismiss();
    choosen = file
    app.ShowPopup( choosen + " loaded" );
    txt = app.ReadFile( choosen );
    edt.SetText( txt );
    
}


//Called when user touches save button. 
function btnSave() 
{ 
     app.ShowPopup( choosen );
     txt = edt.GetText();
    app.WriteFile( choosen, txt );
} 


function Convert(x) { // Convert function
  var parsed = parseInt(x);
  if (isNaN(parsed)) { return 0 }
  return parsed;
}



	 function btn_OnTouch() // Apply button in settings
{
var tmp = wt.GetText(); //Gets and converts text
var fontsize = Convert(tmp);

app.WriteFile( "/sdcard/texted/settings.ini", fontsize ); //Writes font size
app.ShowPopup( fontsize );
	edt.SetTextSize( parseInt(app.ReadFile( "/sdcard/texted/settings.ini" ))  );
}