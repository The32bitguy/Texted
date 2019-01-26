
//To Do:
//Mini map,Horizontal screen, proper folder checking.

// Loads varibles
var basePath = "/sdcard"
var choosen = "/sdcard/textedit/text.txt";
var filea = [".txt",".ini",".js",".py"];

//Handle fontsize
if(app.FileExists( "/sdcard/texted/settings.ini")){

var fontsize = parseInt(app.ReadFile( "/sdcard/texted/settings.ini" ));

}else
  app.MakeFolder( "/sdcard/texted" ); 
  app.WriteFile( "/sdcard/texted/settings.ini",18 ) 


//Called when application is started. 
function OnStart() 
{ 

	//Create a layout with objects vertically centered. 
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );  

  
	//Create an edit box. 
	edt = app.CreateTextEdit( "", 1,  0.93); 
	edt.SetBackColor( "black" );
	edt.SetTextSize( fontsize);
	lay.AddChild( edt ); 
	
	//Horizontal layout for the font awesome buttons
	layBut = app.CreateLayout("Linear", "Horizontal"); 
	lay.AddChild( layBut ); 
	
   // Load scripts 
   app.LoadScript( "edtfunction.js" );
   app.LoadScript( "filebrowser.js" );
   
  
   
   // Draws font awesome.buttons
   var btns = ["[fa-undo]","[fa-gear]","[fa-file]","[fa-save]","[fa-clipboard]"];
    for( var i=0; i<btns.length; i++ )
    {
        btn = app.CreateButton( btns[i], -1, 0.07, "Fontawesome"); 
        btn.icon = btns[i];
        btn.SetTextSize( 22 );
        btn.SetOnTouch( btns_OnTouch ); 
        layBut.AddChild( btn ); 
    }
   
    
  dlgS = app.CreateListView( "Settings,Clear edit,About ","Menu" );
    dlgS.SetOnTouch( dlgS_OnTouch );
    

	 //Make back key available for use
    app.EnableBackKey( false );
  
  // Lock Orientation to Vertical
    app.SetOrientation( "Vertical" );
 

	//Add layout to app.	 
	app.AddLayout( lay ); 


}


//Font awesome events

  function btns_OnTouch()
{
txt = edt.GetText();
    switch( this.icon )
    {
        case "[fa-undo]": edt.Undo(); break;
        case "[fa-gear]": dlgS.Show(); break;
        case "[fa-clipboard]":   app.SetClipboardText( txt ) & app.ShowPopup( "Text sent to clipboard" ); break;
        case "[fa-file]": fileDlg();break;
        case "[fa-save]":  btnSave();break;
    }
  }
    


 



function dlgS_OnTouch(item) //Settings
{

	if( item == "About") { //Very long alert
	  app.Alert( "Textedit made by Cody Reams \n Coded with Droidscript \n \n This app uses font awesome \n \n https://fontawesome.com/license\n \n App  v 1.11", "About" );
	  
	 } 
	 else if( item == "Settings") {
	

      dlg = app.CreateDialog( "Settings" );
      layDl = app.CreateLayout( "linear", "VCenter,FillXY" );
    layDl.SetSize( 0.5, 0.25 );
    dlg.AddLayout( layDl );
    
    wh = app.CreateText( "Fontsize" ); //Font size
    wt = app.CreateTextEdit(parseInt(app.ReadFile( "/sdcard/texted/settings.ini" )),0.2, 0.075 );
    layDl.AddChild( wh );
    layDl.AddChild( wt );
    
    
        btn = app.CreateButton( "Apply" );
    btn.SetOnTouch( btn_OnTouch );
    layDl.AddChild( btn );
    
    dlg.Show();
} else if(item = "Clear edit"){
edt.SetText( "" );
}
}