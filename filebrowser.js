//start of fileman
// I done this file browser as a dialog to
//  Make it more plug and play.
// Once you look at the code you'll
// Realise why.
app.LoadPlugin( "UIExtras" );
uix = app.CreateUIExtras();
basePath = "/sdcard"


//Dialog containing GUI for the browser.
function fileDlg()
{

// The dialog
  fdlg = app.CreateDialog( "File browser" );
      layDlg = app.CreateLayout( "linear", "VCenter,FillXY" );
    layDlg.SetSize( 1,0.86);
    fdlg.AddLayout( layDlg );
   
    
	  //Create a text label and add it to layout.
    currPath = app.CreateText( basePath );
    layDlg.AddChild( currPath );
    
    //Get list of files in current path into an array
    filelist = app.ListFolder( currPath.GetText());
    filelist.sort();
    
    //use array to populate detail list
    detail = app.CreateList( filelist, 1, 0.66);
    detail.SetOnTouch( detailTouch)
       
    layDlg.AddChild( detail );
    

  // Button to call the make file dialog
  bac = app.CreateButton("Make file",-1,-1,);
  bac.SetOnTouch( mkfilea);
  bac.SetSize( 0.3, 0.059);
  layDlg.AddChild( bac );
  
  //Undo button in File browser 
     layFab = app.CreateLayout( "Linear", "FillXY,  Right, TouchThrough" );
 fab = uix.CreateFAButton( "[fa-undo]" );
 
 fab.SetButtonColors( "black", "White" );
 fab.SetOnTouch( onback );
 layFab.AddChild( fab );
 layDlg.AddChild( layFab );
  
 
 // Show it
 fdlg.Show();
}


function populate_detail(){
  //called whenever current path changed
  filelist = app.ListFolder( currPath.GetText() ) ;
  filelist.sort()
  detail.SetList(filelist.join(","),",");
}

function detailTouch(name){
  //user has touched a name in detail list
  var fullPath = currPath.GetText() + "/" + name
  if( testFolder(fullPath) ){
    //it's a folder with files
    //show it
    currPath.SetText( fullPath );
    populate_detail();
  }
  else{
    deal_with_file( fullPath );
    
  }
}

function testFolder( fullPath ){
  //no proper test for folders
  //in this app, it's safe to treat an empty folder like a file
  var tst = app.ListFolder( fullPath );
  if( tst.length > 0 ) return true;
  else return false;
};

function deal_with_file( fullpath){
 if( fullpath.indexOf( ".js" ) >= 0 ||
      fullpath.indexOf( ".py" ) >= 0 ||
      fullpath.indexOf( ".ini" ) >= 0 ||
      fullpath.indexOf( ".html" ) >= 0 ||
      fullpath.indexOf(".txt" ) >= 0 ){
      
      OnFileChoose( fullpath )
      
}else{
 app.ShowPopup( fullpath + " is a empty folder or is not a text file.");
 
}
}


function onback(){
  //user pressed fab
  var tmp = currPath.GetText();
  if( tmp == basePath ) fdlg.Dismiss();
  else {
    //not yet back at beginning
    //move up one level
    var tst = currPath.GetText().split("/");
    tmp = tst.pop();
    currPath.SetText( tst.join("/") );
    populate_detail();
  }
}




//Misc function(s)

function mkfile(x)
{
  var mkpath = x
  mkfiled = app.CreateDialog( "Make file" );
  
  layDlg = app.CreateLayout( "linear","Vertical" );
  layDlg.SetSize( 0.45, 0.30 );
  mkfiled.AddLayout( layDlg );
// Textedit for file name
  edtf = app.CreateTextEdit( "File",  0.31, 0.089 );
  layDlg.AddChild( edtf );

// Textedit for file ext
   ftxt  = app.CreateTextEdit( ".txt", 0.19,0.09);
  layDlg.AddChild( ftxt );
  
  
  btnDlg = app.CreateButton( "Make file", 0.25, 0.11 );
  btnDlg.SetOnTouch( btnDlgdis_OnTouch );
  layDlg.AddChild( btnDlg );
  
  mkfiled.Show();


}

function mkfilea()
{
	mkfile(currPath.GetText());
}



  function btnDlgdis_OnTouch(c)
{
//Makes files
  mkfiled.Dismiss();
  nam = edtf.GetText();
  var tmp = currPath.GetText();
  app.WriteFile( tmp + "/" + nam + ftxt.GetText() );
  app.ShowPopup( nam + " made" );
  populate_detail();
}

function detailTouchlong(name){
  //user has touched a name in detail list
  var fullpath = currPath.GetText() + "/" + name
  var tmp = fullpath
  
    mkfiled = app.CreateDialog( "Make file" );
  
  layDlg = app.CreateLayout( "linear","Vertical" );
  layDlg.SetSize( 0.45, 0.30 );
  mkfiled.AddLayout( layDlg );
// Textedit for file name
  edtf = app.CreateTextEdit( "File",  0.31, 0.089 );
  layDlg.AddChild( edtf );

// Textedit for file ext
   ftxt  = app.CreateTextEdit( ".txt", 0.19,0.09);
  layDlg.AddChild( ftxt );
  
  
  btnDlg = app.CreateButton( "Make file", 0.25, 0.11 );
  btnDlg.SetOnTouch( btnDlgdis2_OnTouch );
  layDlg.AddChild( btnDlg );
  
  mkfiled.Show();
}

  function btnDlgdis2_OnTouch(c)
{
//Makes files
  mkfiled.Dismiss();
  nam = edtf.GetText();
  app.WriteFile( tmp + "/" + nam + ftxt.GetText() );
  app.ShowPopup( nam + " made" );
  populate_detail();
}