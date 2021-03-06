/*----------------------------------------------------------------------------\
|                               JSBalloon                                     |
|-----------------------------------------------------------------------------|
|                   Created by Arkady (Alex) Lesniara                         |
|                           (arkady@lesniara.com)                             |
|-----------------------------------------------------------------------------|
|                  Copyright (c) 2005 Arkady Lesniara                         |
|-----------------------------------------------------------------------------|
| This software is provided "as is", without warranty of any kind, express or |
| implied, including  but not limited  to the warranties of  merchantability, |
| fitness for a particular purpose and noninfringement. In no event shall the |
| authors or  copyright  holders be  liable for any claim,  damages or  other |
| liability, whether  in an  action of  contract, tort  or otherwise, arising |
| from,  out of  or in  connection with  the software or  the  use  or  other |
| dealings in the software.                                                   |
\----------------------------------------------------------------------------*/

var JSBalloonPath="../";

/*	Class: JSBalloon
	Provides a flexible, encapsulated way to implement a passive feedback mechanism
	in a DHTML environment. Define and initialize this object globally, otherwise it will create a new instance 
	each time you call it's constructor. Set up the object with an object array passed to the constructor or, once instantiated,
	with properties. See <Usage> for more.
*/
function JSBalloon()
{
	var tmrBalloonPopup;
	
	var blbWidth=200;;
	var titleFontStyle='font-family: MS Sans Serif;font-weight: bold; font-size:10pt;';
	var messageFontStyle='font-family: MS Sans Serif\; font-size:10pt\;';
	var footerFontStyle='font-family: MS Sans Serif\; font-size:10pt\;';
	var transShow=true;
	var transHide=true;
	var transShowFilter='progid:DXImageTransform.Microsoft.Fade(Overlap=1.00)';
	var transHideFilter='progid:DXImageTransform.Microsoft.Fade(Overlap=1.00)';
	var autoHide=true;
	var autoHideInterval=4000; // 4 sec
	var autoAway=true;
	var showCloseBox=false;
	
	if(JSBalloon.arguments.length>0)
	{
		var oArg=JSBalloon.arguments[0];
		
		if(oArg.width!=null)
		{
			blbWidth=oArg.width;
		}
		
		if(oArg.titleFontStyle!=null)
		{
			titleFontStyle=oArg.titleFontStyle;
		}
		
		if(oArg.messageFontStyle!=null)
		{
			messageFontStyle=oArg.messageFontStyle;
		}
		
		if(oArg.footerFontStyle!=null)
		{
			footerFontStyle=oArg.footerFontStyle;
		}
		
		if(oArg.transShow!=null)
		{
			transShow=oArg.transShow;
		}
		
		if(oArg.transHide!=null)
		{
			transHide=oArg.transHide;
		}
		
		if(oArg.transShowFilter!=null)
		{
			transShowFilter=oArg.transShowFilter;
		}
		
		if(oArg.transHideFilter!=null)
		{
			transHideFilter=oArg.transHideFilter;
		}
		
		if(oArg.autoHide!=null)
		{
			autoHide=oArg.autoHide;
		}
		
		if(oArg.autoHideInterval!=null)
		{
			autoHideInterval=oArg.autoHideInterval;
		}
		
		if(oArg.autoAway!=null)
		{
			autoAway=oArg.autoAway;
		}
		
		if(oArg.showCloseBox!=null)
		{
			showCloseBox=oArg.showCloseBox;
		}
	}
	
	// Public properties
	
	/*	Property: titleFontStyle
			Sets or retrieves a Cascading Style Sheet formatted value that formats the balloon's title (heading).
		
		Syntax:
			object.titleFontStyle [= sCSS ]
			
		Possible Values:
			sCSS - *variant* that specifies a properly formed Cascading Style Sheet formatting.
			
		Examples:
			balloonObj.titleFontStyle="font-family: MS Sans Serif;font-weight: bold; font-size:12pt;";
	*/
	this.titleFontStyle=titleFontStyle;
	
	/*	Property: messageFontStyle
			Sets or retrieves a Cascading Style Sheet formatted value that formats the balloon's main message body.

		Syntax:
			object.messageFontStyle [= sCSS ]
			
		Possible Values:
			sCSS - *variant* that specifies a properly formed Cascading Style Sheet formatting.
			
		Examples:
			balloonObj.messageFontStyle="font-family: MS Sans Serif;font-weight: bold; font-size:12pt;";
	*/	
	this.messageFontStyle=messageFontStyle;
	
	/*	Property: footerFontStyle
			Sets or retrieves a Cascading Style Sheet formatted value that formats the balloon's footer.

		Syntax:
			object.footerFontStyle [= sCSS ]
			
		Possible Values:
			sCSS - *variant* that specifies a properly formed Cascading Style Sheet formatting.
			
		Examples:
			balloonObj.footerFontStyle="font-family: MS Sans Serif;font-weight: bold; font-size:12pt;";
	*/	
	this.footerFontStyle=footerFontStyle;
	
	/*	Property: transShowFilter
			Sets or retrieves a value of a transition (a filter) applied when showing the balloon.
			
		Syntax:
			object.transShowFilter [= string ]
			
		Possible Values:
			string - *variant* that specifies the transition filter. More information found at http://msdn.microsoft.com/workshop/author/filter/reference/reference.asp
		
		Examples:
			balloonObj.transShowFilter="progid:DXImageTransform.Microsoft.Stretch(stretchstyle=SPIN)";
			
		See also:
			<transShow>
	*/	
	this.transShowFilter=transShowFilter;
	
	/*	Property: transHideFilter
			Sets or retrieves a value of a transition (a filter) applied when hiding the balloon.
			
		Syntax:
			object.transHideFilter [= string ]
			
		Possible Values:
			string - *variant* that specifies the transition filter. More information found at http://msdn.microsoft.com/workshop/author/filter/reference/reference.asp
		
		Examples:
			balloonObj.transHideFilter="progid:DXImageTransform.Microsoft.Slide(slidestyle=HIDE,Bands=1)";
			
		See also:
			<transHide>
	*/	
	this.transHideFilter=transHideFilter;
	
	/*	Property: transShow
			Sets or retrieves a value indicating whether to apply transition filter specified in 
			<transShowFilter> when showing the balloon.
			
		Syntax:
			object.transShow [= bValue ]
			
		Possible Values:
			bValue - *boolean* true / false
		
		Examples:
			balloonObj.transShow=true;
			
		See also:
			<transShowFilter>
	*/	
	this.transShow=transShow;
	
	/*	Property: transHide
			Sets or retrieves a value indicating whether to apply transition filter specified in 
			<transHideFilter> when hiding the balloon.
			
		Syntax:
			object.transHide [= bValue ]
			
		Possible Values:
			bValue - *boolean* true / false
		
		Examples:
			balloonObj.transHide=true;
			
		See also:
			<transHideFilter>
	*/
	this.transHide=transHide;
	
	/*	Property: autoHide
			Sets or retrieves a value indicating whether to automatically hide the balloon 
			after s time specified in <autoHideInterval>.
			
		Syntax:
			object.autoHide [= bValue ]
			
		Possible Values:
			bValue - *boolean* true / false
		
		Examples:
			balloonObj.autoHide=true;
			
		See also:
			<autoHideInterval>
	*/	
	this.autoHide=autoHide;
	
	/*	Property: autoHideInterval
			Sets or retrieves a value indicating how long to wait before executing <autoHide>.
			
		Syntax:
			object.autoHideInterval [= iValue ]
			
		Possible Values:
			iValue - *integer* number of milliseconds to wait before activating <autoHide>.
		
		Examples:
			balloonObj.autoHideInterval=5000; // 5 Sec
			
		See also:
			<autoHide>
	*/	
	this.autoHideInterval=autoHideInterval;
	
	/*	Property: autoAway
			Sets or retrieves a value of this property. 
			When set to true the balloon will immediately run the <Hide> method on mouse over.
			
			This is particularly useful when the balloon is used only for passive feedback and 
			doesn't have to be dismissed. The user may want to perform some task quickly without having
			to wait the time specified in the <autoHideInterval> while the balloon is obstructing a page
			element.
			
		Syntax:
			object.autoAway [= bValue ]
			
		Possible Values:
			bValue - *boolean* true / false
		
		Examples:
			balloonObj.autoAway=true;
	*/	
	this.autoAway=autoAway;
	
	/*	Property: width
			Sets or retrieves a value of balloon's width. The height is dynamic, the width has to be specified.
			
		Syntax:
			object.width [= iValue ]
			
		Possible Values:
			iValue - *integer* the number of pixels.
		
		Examples:
			balloonObj.width=325;
	*/		
	this.width=blbWidth;
		
	/*	Property: showCloseBox
			Sets or retrieves a value of whether the close balloon (right-upper corner) should be displayed.
			It makes sense to turn <autoHide> off when enabling this feature.
			
		Syntax:
			object.showCloseBox [= bValue ]
			
		Possible Values:
			bValue - *boolean* true / false
		
		Examples:
			balloonObj.showCloseBox=false;
	*/	
	this.showCloseBox=showCloseBox;
	
	var childID;
	
	// Constructor
	var balloonDIV = document.createElement("DIV");
	balloonDIV.style.width=String(blbWidth);
	balloonDIV.style.position="absolute";
	balloonDIV.style.visibility="hidden";
	balloonDIV.style.filter=transShowFilter+' '+transHideFilter;
	balloonDIV.style.zIndex=2001;
	
	/*	Property: balloon
			Retrieves the reference to the instantiated balloon object.
			
		Syntax:
			[obj =] object.balloon
			
		Possible Values:
			obj - *object* balloon reference
		
		Examples:
			var obj = balloonObj.balloon;
	*/
	this.balloon=balloonDIV;

	// Pulic Methods
	this.Show=Show;
	this.Hide=Hide;
	
	/*	Function: Show
			Makes the instantiated balloon appear.
			
		Balloon content note: 
			Because SELECT objects are what's known as windowed controles
			they need to be hidden when balloons are shown, otherwise they will always be on top
			(they ignore zIndex attribute). It is normally done automatically by this control.
			Sometimes, however, you may want to place a drop-down inside the balloon itself.
			To override this default behaviour add an balloonMember expando attirbute to 
			the SELECT you are placing withing.
			
			- e.g. <SELECT id=select1 name=select1 balloonMember=true>
			
		Syntax:
			(start code)
			object.Show({[title:vTitle]
						 [,message:vMessage]
						 [,footer:vFooter]
						 [,top:vTop]
						 [,left:vLeft]
						 [,anchor:vAnchor]
						 [,icon:vIcon]
						 });
			(end)
						 
		Possible Values:
			vTitle - *string* Optional title text for the balloon.
			vMessage - *string* Optional. Message body for the balloon.
			vFooter - *string* Optional. Test displayed at the bottom of the balloon on a separate line.
			vTop - *integer* Optional. Offset from the top of the screen or top of an anchor.
			vLeft - *integer* Optional. Offset from the left of the screen or left of an anchor.
			vAnchor - *object* Optional. Reference to the object that the balloon should use as reference for location. 
			vIcon - *string* Optional. Possible icon values may include one of the values below (case sensitive):
				 - Exclaim - pre-defined, triangle with an exclamation point.
				 - Stop - pre-defined, red circle with a white x inside.
				 - Info - pre-defined, white balloon with a letter "i" inside *Default*
				 - Help - a question mark inside a blue circle.
				 - a relative path to a custom icon.
			
		Examples:
			
			- balloonObj.Show({title:'JavaScript Balloon Example',message:'This is an example of a JSBalloon object. It\'s primary application is to provide a modeless feedback to DHTML applications.',anchor:tableCellObj, icon:'Info'});
			- balloonObj1.Show({title:'JavaScript Balloon Example',message:'This is an example of a JSBalloon object. It\'s primary application is to provide a modeless feedback to DHTML applications.',anchor:tableCellObj});
			- balloonObj2.Show({message:'This is an example of a JSBalloon object. It\'s primary application is to provide a modeless feedback to DHTML applications. ',anchor:tableCellObj});
	
	*/
	function Show()
	{
		var title;
		var message='';
		var icon='';
		var footer='';
		var btop=0, bleft=0;
		var atop=0, aleft=0;
		var anchor;
		var direction='SE';

		// Updates
		blbWidth=String(this.width);
		titleFontStyle=this.titleFontStyle;
		messageFontStyle=this.messageFontStyle;
		footerFontStyle=this.footerFontStyle;
		transShowFilter=this.transShowFilter;
		transHideFilter=this.transHideFilter;
		transShow=this.transShow;
		transHide=this.transHide;
		autoHide=this.autoHide;
		autoHideInterval=this.autoHideInterval;
		autoAway=this.autoAway;

		if(document.readyState!='complete')
		{
			alert('Document needs to fully load before you may show JSBalloons.');
			return;
		}
		
		if(Show.arguments.length>0)
		{
			var oArg=Show.arguments[0];
			
			if(oArg.title!=null)
			{
				title=oArg.title;
			}
			
			if(oArg.message!=null)
			{
				message=oArg.message;
			}
			
			if(oArg.icon!=null)
			{
				icon=oArg.icon;
				
				switch(icon)
				{
					case 'Exclaim':
						icon = JSBalloonPath+'images/balloon/exclaim.ico';
						SoundFx = 'Exclaim';
						break;
						
					case 'Stop':
						icon = JSBalloonPath+'images/balloon/stop.ico';
						SoundFx = 'Stop';
						break;
						
					case 'Info':
						icon = JSBalloonPath+'images/balloon/info.ico';
						SoundFx = 'Info';
						break;
					
					case 'Help':
						icon = JSBalloonPath+'images/balloon/help.ico';
						SoundFx = 'Info';
						break;
						
					default:
						SoundFx = 'Info';
				}
			}

			if(oArg.footer!=null)
			{
				footer=oArg.footer;
			}
			
			if(oArg.top!=null)
			{
				btop=oArg.top;
			}
			
			if(oArg.left!=null)
			{
				bleft=oArg.left;
			}
			
			if(oArg.anchor!=null)
			{
				anchor=oArg.anchor;
				atop=getTop(anchor);
				aleft=getLeft(anchor);
			}
		}
		
		// Figure out the best direction for the pointer
		
		// Assume SE
		var ret=balloonInfrastructure(balloonBody(	title, 
													icon, 
													message, 
													footer, 
													this.titleFontStyle,
													this.messageFontStyle,
													this.footerFontStyle,
													this.showCloseBox), direction);
		
		// Populate the contents
		balloonDIV.innerHTML=ret;
		
		var btnClose=balloonDIV.children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[2].children[0];
		btnClose.onclick=this.Hide;
		
		// check if the object is already initialized
		if(typeof(childID)!='object')
		{
			childID=document.body.appendChild(balloonDIV);	
		}
		
		if(anchor!=null)
		{

			balloonDIV.style.left = aleft+bleft;
			balloonDIV.style.top = (atop-balloonDIV.offsetHeight)+btop;
		}
		else
		{
			balloonDIV.style.left = bleft;
			balloonDIV.style.top = btop;		
		}
		
		
		var bAdjustedLeft=parseInt(balloonDIV.style.left, 10);
		var showSE;

	
		if(document.body.offsetWidth < (bAdjustedLeft+balloonDIV.offsetWidth+20))
		{		
			direction='SW';
			
			ret=balloonInfrastructure(balloonBody(	title, 
													icon, 
													message, 
													footer, 
													this.titleFontStyle,
													this.messageFontStyle,
													this.footerFontStyle,
													this.showCloseBox), direction);
			balloonDIV.innerHTML=ret;

			balloonDIV.style.left = bAdjustedLeft-balloonDIV.offsetWidth+20;
			showSE=false;
		}
		else
		{
			direction='SE';
			showSE=true;
		} 
		
		if(parseInt(balloonDIV.style.top, 10)<0)
		{
			if(showSE)
			{
				direction='NE';
				ret=balloonInfrastructure(balloonBody(	title, 
													icon, 
													message, 
													footer, 
													this.titleFontStyle,
													this.messageFontStyle,
													this.footerFontStyle,
													this.showCloseBox), direction);
				balloonDIV.innerHTML=ret;
			}
			else
			{
				direction='NW';
				ret=balloonInfrastructure(balloonBody(	title, 
													icon, 
													message, 
													footer, 
													this.titleFontStyle,
													this.messageFontStyle,
													this.footerFontStyle,
													this.showCloseBox), direction);
				balloonDIV.innerHTML=ret;
			}
			balloonDIV.style.top = parseInt(balloonDIV.style.top, 10)+balloonDIV.offsetHeight;
			if(anchor!=null)
			{
				balloonDIV.style.top = parseInt(balloonDIV.style.top, 10)+anchor.offsetHeight
			}
		}			
		
		if(this.showCloseBox)
		{
			if(direction=='SE' || direction=='SW')
			{
				btnClose=balloonDIV.children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[2].children[0];
			}
			else
			{
				btnClose=balloonDIV.children[0].children[0].children[2].children[0].children[0].children[0].children[0].children[2].children[0];
			}
			btnClose.onclick=this.Hide;
		}
		
		// Adjust all srollers
		var scrollOffsets=ScrollOffsets(anchor);
		balloonDIV.style.top=parseInt(balloonDIV.style.top, 10)-scrollOffsets[0];
		balloonDIV.style.left=parseInt(balloonDIV.style.left, 10)-scrollOffsets[1];
		
		// Hide any overlapping selects
		SuppressSelects();
		
		// Show balloon
		if(this.transShow)
		{
			balloonDIV.style.filter=this.transShowFilter+' '+this.transHideFilter;
			if(balloonDIV.filters(0).status==2 || balloonDIV.filters(0).status==1)
			{
				balloonDIV.filters(0).Stop();
			}
			balloonDIV.filters(0).Apply();
			balloonDIV.style.visibility='visible';
			balloonDIV.filters(0).Play();
		}
		else
		{
			balloonDIV.style.visibility='visible';
		}
					
		// Init autohide if true
		if(this.autoHide)
		{
			clearTimeout(this.tmrBalloonPopup);
			transHide=this.transHide;
			this.tmrBalloonPopup=setTimeout(this.Hide, this.autoHideInterval);
		}
		
		if(this.autoAway)
		{
			balloonDIV.onmouseover=Hide;
		}
		else
		{
			balloonDIV.onmouseover='';
		}
	}
	
	/*	Function: Hide
			Hide a visible balloon.
			Call this function to immediately initiate the hiding of the instantiated balloon 
			with the predefined transition in <transHideFilter> depending on the setting of <transHide>.
	*/
	function Hide()
	{
		if(balloonDIV.style.visibility=='hidden')
		{
			return;
		}

		if(transHide)
		{
			if(balloonDIV.filters(1).status==2 || balloonDIV.filters(1).status==1)
			{
				balloonDIV.filters(1).Stop();
			}
			balloonDIV.filters(1).Apply();
			balloonDIV.style.visibility='hidden';
			balloonDIV.filters(1).Play();
		}
		else
		{
			balloonDIV.style.visibility='hidden';
		}	
		
		RestoreSelects();
	}
	
	// Private

	function SuppressSelects()
	{
		var selObjects=document.getElementsByTagName("SELECT");
		
		for(var i=0;i<selObjects.length;i++)
		{	
			if(selObjects[i].balloonMember!='true')
			{
				if(selObjects[i].style.visibility=='visible' || selObjects[i].style.visibility=='')
				{
					if(ObjectOverlap(balloonDIV, selObjects[i]))
					{
						selObjects[i].style.visibility='hidden';
						// Mark as ballonhidden
						selObjects[i].baloonHidden=true;
					}
				}
			}
		}
	}
	
	function RestoreSelects()
	{
		var selObjects=document.getElementsByTagName("SELECT");
		
		for(var i=0;i<selObjects.length;i++)
		{	
			if(selObjects[i].baloonHidden)
			{
				selObjects[i].style.visibility='visible';
				// Mark as ballonhidden
				selObjects[i].baloonHidden=false;
			}
		}
	}
	
	function ObjectOverlap(obj1, obj2)
	{
		var obj1TopX = getLeft(obj1);
		var obj1TopY = getTop(obj1);
		var obj1BottomX = getLeft(obj1)+obj1.offsetWidth;
		var obj1BottomY = getTop(obj1)+obj1.offsetHeight;
		
		var obj2TopX = getLeft(obj2);
		var obj2TopY = getTop(obj2);
		var obj2BottomX = getLeft(obj2)+obj2.offsetWidth;
		var obj2BottomY = getTop(obj2)+obj2.offsetHeight;
		
		var overlapOnX = (obj1TopX < obj2BottomX && obj2TopX < obj1BottomX);
		var overlapOnY = (obj1TopY < obj2BottomY && obj2TopY < obj1BottomY);
		
		return (overlapOnX && overlapOnY);
	}

	//Positioning functions
	function getObjLeft(anObject) 
	{
	  return(anObject.offsetParent ? (getObjLeft(anObject.offsetParent) + anObject.offsetLeft) : anObject.offsetLeft);
	}
		 
	function getObjTop(anObject) 
	{
	  return(anObject.offsetParent ? (getObjTop(anObject.offsetParent) + anObject.offsetTop) : anObject.offsetTop); 
	}
		 
		 
	function getLeft(anObject) 
	{
	    return(getObjLeft(anObject));
	}
		 
	function getTop(anObject) 
	{
	    return(getObjTop(anObject));
	}
	
	function ScrollOffsets(anchor)
	{
		var aryScrolls = new Array(0,0);

		try
		{
			var parentElem=anchor.parentElement;

			while(parentElem!=null)
			{
				if(parentElem.scrollTop!=null)
				{
					aryScrolls[0]+=parseInt(parentElem.scrollTop, 10);
					aryScrolls[1]+=parseInt(parentElem.scrollLeft, 10);
				}
	
				parentElem=parentElem.parentElement;
			}
		}
		catch(ex)
		{
			// continue
		}
		return aryScrolls;
	}

	// Rendering functions
	function balloonInfrastructure(body, direction)
	{
		var ret;
		
		switch(direction)
		{
			case 'SE':
				// South East	
				ret ='<table class="JSBalloon" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" >'+
					'  <tr>'+
					'    <td height="1" width="10">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cLeftTop.gif" width="10" height="10"></td>'+
					'    <td height="7" width=100% style="border-top:1px solid #999999; border-left-width:1; border-right-width:1; border-bottom-width:1; background-color:#FFFFEA" colspan="4"></td>'+
					'    <td height="7"  width="10">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cRightTop.gif" width="10" height="10"></td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td valign=top colspan="6" style="border-left: 1px solid #999999; border-right: 1px solid #999999; background-color: #FFFFEA">'+
					body +
					'    </td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td width="10" height="7">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cLeftBottom.gif" width="10" height="10"></td>'+
					'    <td height="7" style="background-color: #FFFFEA" colspan="4" width="280"></td>'+
					'    <td width="10" height="7">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cRightBottom.gif" width="10" height="10"></td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td width="10" height="10"></td>'+
					'    <td width="1" style="border-top: 1px solid #999999; padding-left: 4; padding-right: 4; padding-top: 1; padding-bottom: 1" height="10"></td>'+
					'    <td  height="10">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/aSouthEast.gif" width="67" height="18"></td>'+
					'    <td width=100% height="10" style="border-top: 1px solid #999999; padding-left: 4; padding-right: 4; padding-top: 1; padding-bottom: 1"></td>'+
					'    <td width="70" height="10" style="border-top: 1px solid #999999; padding-left: 4; padding-right: 4; padding-top: 1; padding-bottom: 1"></td>'+
					'    <td width="10" height="10"></td>'+
					'  </tr>'+
					'</table>'
					break;

			case 'SW':					
				// South West
				ret ='<table class="JSBalloon" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" id="AutoNumber1" >'+
					'  <tr>'+
					'    <td height="1" width="10">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cLeftTop.gif" width="10" height="10"></td>'+
					'    <td height="7" width=179 style="border-top:1px solid #999999; border-left-width:1; border-right-width:1; border-bottom-width:1; background-color:#FFFFEA" colspan="4"></td>'+
					'    <td height="7"  width="11">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cRightTop.gif" width="10" height="10"></td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td valign=top colspan="6" style="border-left: 1px solid #999999; border-right: 1px solid #999999;  background-color: #FFFFEA"">'+
					body +
					'    </td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td width="10" height="7">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cLeftBottom.gif" width="10" height="10"></td>'+
					'    <td height="7" style="background-color: #FFFFEA" colspan="4" width="179"></td>'+
					'    <td width="11" height="7">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cRightBottom.gif" width="10" height="10"></td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td width="10" height="10"></td>'+
					'    <td width="70" style="border-top: 1px solid #999999; border-left-width:1; border-right-width:1; border-bottom-width:1" height="10"></td>'+
					'    <td  height="10" style="border-left-width: 1; border-right-width: 1; border-top: 1px solid #999999; border-bottom-width: 1" width="100%">'+
					'    </td>'+
					'    <td  align="right">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/aSouthWest.gif" width="67" height="18"></td>'+
					'    <td width="1" height="10" style="border-top: 1px solid #999999;"></td>'+
					'    <td width="10" height="10"></td>'+
					'  </tr>'+
					'</table>'
					break;
					
			case 'NE':	
					// North East
					ret ='<table class="JSBalloon" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" id="AutoNumber1" >'+
					'   <tr>'+
					'    <td width="10" height="9"></td>'+
					'    <td width="1" style="border-bottom:1px solid #999999; " height="9"></td>'+
					'    <td  height="9" valign="bottom">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/aNorthEast.gif" width="67" height="18"></td>'+
					'    <td width=100% height="9" style="border-bottom:1px solid #999999; "></td>'+
					'    <td width="70" height="9" style="border-bottom:1px solid #999999;"></td>'+
					'    <td width="10" height="9"></td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td height="1" width="10">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cLeftTop.gif" width="10" height="10"></td>'+
					'    <td height="7" width=100% colspan="4" bgcolor="#FFFFEA"></td>'+
					'    <td height="7"  width="10">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cRightTop.gif" width="10" height="10"></td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td valign=top colspan="6" style="border-left: 1px solid #999999; border-right: 1px solid #999999; background-color: #FFFFEA">'+
					body +
					'    </td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td width="10" height="7">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cLeftBottom.gif" width="10" height="10"></td>'+
					'    <td height="7" style="border-bottom:1px solid #999999; border-left-width:1; border-right-width:1; border-top-width:1" colspan="4" width="280" bgcolor="#FFFFEA"></td>'+
					'    <td width="10" height="7">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cRightBottom.gif" width="10" height="10"></td>'+
					'  </tr>'+
					'</table>'
					break;
					
			case 'NW':	
					// North West			
					ret ='<table class="JSBalloon" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" id="AutoNumber1" >'+
					'  <tr>'+
					'    <td width="10" height="10"></td>'+
					'    <td width="70" style="border-bottom:1px solid #999999;  border-left-width:1; border-right-width:1; " height="10"></td>'+
					'    <td  height="10" style="border-bottom:1px solid #999999; border-left-width: 1; border-right-width: 1; " width="100%">'+
					'    </td>'+
					'    <td  align="right" valign="bottom">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/aNorthWest.gif" width="67" height="18"></td>'+
					'    <td width="1" height="10" style="border-bottom:1px solid #999999;"></td>'+
					'    <td width="10" height="10"></td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td height="1" width="10">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cLeftTop.gif" width="10" height="10"></td>'+
					'    <td height="7" width=179 colspan="4" bgcolor="#FFFFEA"></td>'+
					'    <td height="7"  width="11">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cRightTop.gif" width="10" height="10"></td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td valign=top colspan="6" style="border-left: 1px solid #999999; border-right: 1px solid #999999;  background-color: #FFFFEA">'+
					body +
					'    </td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td width="10" height="7">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cLeftBottom.gif" width="10" height="10"></td>'+
					'    <td height="7" style="border-bottom:1px solid #999999; border-left-width:1; border-right-width:1; border-top-width:1" colspan="4" width="179" bgcolor="#FFFFEA"></td>'+
					'    <td width="11" height="7">'+
					'    <img border="0" src="'+JSBalloonPath+'images/balloon/cRightBottom.gif" width="10" height="10"></td>'+
					'  </tr>'+
					'</table>'
					break;
		}
		
		
		return ret;
	}
	
	function balloonBody(title, icon, body, footer, titleFontStyle, 
						messageFontStyle, footerFontStyle,
						showCloseBox)
	{
		var imgShow='none';
		var iconTitle='';
		var ballonBody=body;
		var imgClose='none';
		var headerVisible='block';
		var offsetParent="-7";
		
		if(title!=undefined)
		{
			iconTitle=title;
		}
		
		if(showCloseBox)
		{
			imgClose='block';
		}
		else
		{
			imgClose='none';
		}
		
		if(icon != '')
		{
			imgShow='block';
		}
		else
		{
			imgShow='none';
		}
		
		if(imgShow=='none' && imgClose=='none' && iconTitle=='')
		{
			headerVisible='none';
			offsetParent="0";
		}
		else
		{
			headerVisible='block';
			offsetParent="-7";
		}

		return '    <table border="0" cellpadding="3" cellspacing="0" style="cursor:default;border-collapse: collapse; position:relative; top: '+offsetParent+';left:3" width="100%">' + 
				'      <tr style="display:'+headerVisible+'">' + 
				'        <td id="BIcon" width="3%" align=left><img id=BIcon src="'+icon+'" style="display:'+imgShow+'"></td>' + 
				'        <td id="BTitle" UNSELECTABLE="on" width="90%" style="'+titleFontStyle+'" align=left>'+iconTitle+'</td>' + 
				'        <td id="BClose" width="3%" valign=top align=right><img src="'+JSBalloonPath+'images/balloon/close.jpg" style="position:relative; top: 4;left:-5;display:'+imgClose+'" onmouseover="this.src=\''+JSBalloonPath+'images/balloon/closeActive.jpg\'" onmouseout="this.src=\''+JSBalloonPath+'images/balloon/close.jpg\'" onmouseup="this.src=\''+JSBalloonPath+'images/balloon/closeActive.jpg\'" onmousedown="this.src=\''+JSBalloonPath+'images/balloon/closeDown.jpg\'" title="Close">&nbsp;</td>' + 
				'      </tr>' + 
				'      <tr>' + 
				'        <td id="BBody" UNSELECTABLE="on" style="'+messageFontStyle+'" width="100%" colspan="3">' + ballonBody +'</td>' + 
				'      </tr>' + 
				'       <tr>' + 
				'        <td id="BFooter" UNSELECTABLE="on" style="'+footerFontStyle+'" width="100%" colspan="3">' + footer +'</td>' + 
				'      </tr>' + 
				'    </table>'
	}
}

/*
	Section: Usage
		Examples of the object instantiation.
	
	Examples:
	
	(start code)
	var bl=new JSBalloon({ width:300});
	var b2=new JSBalloon();
	var b3=new JSBalloon({	width:150, 
							autoAway:false, 
							autoHide:false,
							showCloseBox:true});
							
	(end)
	
	Section: Include Setup Notes
		Please read before installing.
		
		Set the global variable JSBalloonPath to the full application path (or URL) where 
		it is located. 
		
		Make sure you included the trailing forward slash.
		
	Examples:
		- var JSBalloonPath="/appname/includes/js/JSBalloon/";
		- var JSBalloonPath="http://prodserver/appname/includes/js/JSBalloon/";
*/
