//globals
$author = $('meta[name=platform]').attr("content");
$extID = chrome.i18n.getMessage('@@extension_id');
$websiteURL = window.location.host;
$websitePathName = window.location.pathname;
$CFID = null;
var basecampURL = "https://vin65.basecamphq.com";
var basecampId = 8280143;

	
	
/*	
chrome.extension.sendMessage({CFID: "siteadmin1"}, function(response) {
  $CFID = response.CFID;
});
*/

var v65wb = {

	//global functions
	initSideBar: function(){
		v65wb.projectChecklist();
		$("html").prepend("<div class='v65wb-button'></div>");
		$(".v65wb-button").fadeIn();
		$("html").prepend("<div class='v65wb' />");
		$(".v65wb").load("chrome-extension://"+$extID+"/html/sidebar.html",function(){
			$("[v65wbjs=modalWindow]").click(function(e){
				e.preventDefault();
				v65wb.modal($(this).attr("href"), $(this).attr("v65wbjsModalHeight"), $(this).attr("v65wbjsModalWidth"));
				return false;
			});
			v65wb.getWebsiteTitle();
			v65wb.initWebsitePicker();
			v65wb.setWebsiteLink();
			v65wb.loadDesignerLaunchFields();
			v65wb.karsonMainNav();
			v65wb.addAdminLinkClass();

		});
		v65wb.showHideSideBar();
		$(".v65wb").addClass("active");
		$("body").css({"width": "-=267px", "margin-left": "250px"}, 500);
		$(".v65wb-button").css({"margin-left": "250px"}, 500);
		$(".v65wb").css({"left" : "250px"}, 500);
	},	
	showHideSideBar: function(){
		$(".v65wb-button").click(function(){
			$(".v65wb").toggleClass("active");
			if($(".v65wb").hasClass("active")){
				$("body").animate({"width": "-=267px", "margin-left": "250px"}, 500);
				$(".v65wb-button").animate({"margin-left": "250px"}, 500);
				$(".v65wb").animate({"left" : "250px"}, 500);
			} else{
				$("body").animate({"width": "100%", "margin-left": "-=250px"}, 500);
				$(".v65wb-button").animate({"margin-left": "-=250px"}, 500);
				$(".v65wb").animate({"left" : "-=250px"}, 500);	
			}
		});
	},
	getWebsiteTitle: function(){
		var website_title = $("#website .title").text();
		$(".v65wb-websiteTitle").append("<h2>"+website_title+"</h2>")
	},
	initWebsitePicker: function(){
		var masterNav = $("#masterNav form");
		masterNav.detach();
		$(".v65wb-master").append(masterNav);
		$(".v65wb-master input[type='image']").remove();
		$(".v65wb-master form").append('<div class="v65wb-message v65wb-authenticate"><input type="submit" value="Authenticate" /></div>');
	},
	projectChecklist: function(){
		$("iframe[src='/vin65/index.cfm?method=userreports.listProjectTasksModal']").addClass("listProjectTasksModal").parent().hide().prev().hide();

		$(".listProjectTasksModal").load(function(){
			$(".listProjectTasksModal").contents().find("body").addClass("v65wb-projectCheckList");
			var iframeContent = $(".listProjectTasksModal").contents();
			var vin65DesignTeam = iframeContent.find("td:contains(Vin65 Design Team)").next().not(":contains(Yes)").not(":contains(N/A)").length;
			var vin65LaunchQA = iframeContent.find("td:contains(Vin65 Launch Q/A)").next().not(":contains(Yes)").length;

			if(vin65DesignTeam != 0){
				$(".v65wb-projectChecklist").prepend("<span>"+vin65DesignTeam+"</span>")
			} else if(vin65LaunchQA != 0){
				$(".v65wb-projectChecklist").prepend("<span>"+vin65LaunchQA+"</span>")
			} else{
				$(".v65wb-projectChecklist").hide();
			}

			//iframeContent.find("td:contains(Vin65 Design Team)").parent().addClass("v65wb-deseignTeamItem");
			//iframeContent.find("td:contains(Vin65 Launch Q/A)").parent().addCLass("v65wb-v65LaunchQA");
		});
	},
	loadDesignerLaunchFields: function(){
		$(".v65wb-designerLaunch").click(function(){
			$(".v65wb-iFramePopup").load(function(){
				var iframeContent = $(".v65wb-iFramePopup").contents();
				var parseFiles = iframeContent.find("#parseFiles");
				var parseForm = iframeContent.find("#parseForm");
				
				//layouts - left column
				var homepageLayout = parseFiles.find("td:contains('Homepage')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=HomepageLayout]").val(homepageLayout);

				var cartLayout = parseFiles.find("td:contains('Cart')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=CartLayout]").val(cartLayout);

				var memberLayout = parseFiles.find("td:contains('Member')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=MemberLayout]").val(memberLayout);

				var clubLayout = parseFiles.find("td:contains('Club')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=ClubLayout]").val(clubLayout);

				var productLayout = parseFiles.find("td:contains('Product')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=ProductLayout]").val(productLayout);

				var eventDrilldownLayout = parseFiles.find("td:contains('Event Drilldown')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=EventDrilldownLayout]").val(eventDrilldownLayout);

				//layouts - right column
				var mainLayout = parseFiles.find("td:contains('Main')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=MainLayout]").val(mainLayout);

				var checkoutLayout = parseFiles.find("td:contains('Checkout')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=CheckoutLayout]").val(checkoutLayout);

				var printLayout = parseFiles.find("td:contains('Print')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=PrintLayout]").val(printLayout);

				var blogLayout = parseFiles.find("td:contains('Blog')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=BlogLayout]").val(blogLayout);

				var productDrilldownLayout = parseFiles.find("td:contains('Product Drilldown')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=ProductDrilldownLayout]").val(productDrilldownLayout);

				var recipeDrilldownLayout = parseFiles.find("td:contains('Recipe Drilldown')").next().html().replace(".cfm", ".htm");
				parseForm.find("[name=RecipeDrilldownLayout]").val(recipeDrilldownLayout);

				parseForm.find("#parseFile").before('<a href="#" id="clearFiles">Clear Files&nbsp;<img src="/assets/images/icons/next.png" width="16" height="16" border="0" align="absmiddle"></a>&nbsp;&nbsp;&nbsp;&nbsp;');

				parseForm.find("#clearFiles").click(function(e) {
					e.preventDefault();
					parseForm.find("select").val("");
					return false;
				});
			});
		});
	},

	analytics : function(){
		$(".v65wb-websiteSettings").click(function(){
			$(".v65wb-iFramePopup").load(function(){
				var iframeContent = $(".v65wb-iFramePopup").contents();
				iframeContent.find("#accordion:contains('Analytics')").click(function(){
					
				})
			});
		});
	},
	
	basecampTasks: function(){
		$.get(basecampURL+'/projects/'+basecampId+'/calendar_entries/milestones.json', function(data) {
			$('.result').html(data);
			return data;
		});
	},
	
	modal: function(url,height,width){
		$(".v65wb-modalWrapper").click(function(){
			$(".v65wb-modalWrapper").hide();
			$(".v65wb-modalWrapper .v65wb-modal").html("");		
		});

		var iframe = '<iframe src="'+url+'" width="'+width+'" height="'+height+'" scrolling="no" frameborder="0" hspace="0" vspace="0" id="iFramePopup" class="v65wb-iFramePopup" name="EditWindow"></iframe>';

		$(".v65wb-modalWrapper .v65wb-modal").html(iframe).show();
		$(".v65wb-modalWrapper").show();
		
		$(".v65wb-iFramePopup").load(function(){
			$(".v65wb-iFramePopup").contents().find("body").addClass("v65wb-iFrameContent");

			$(".v65wb-iFramePopup").contents().find("a[href='javascript:parent.closePopup()']").click(function(e){
				$(".v65wb-modalWrapper").hide();
				$(".v65wb-modalWrapper .v65wb-modal").html("");
			});

		});		
		return false;
	},

	setWebsiteLink: function(){
		var url = $("#userProfile div:nth-child(2n) a:first-child").attr("href");
		var options = url.split("'");
		$(".v65wb-viewWebsite").attr("href",options[1]);
	},

	moveMainNav: function(){
		var mainNav = $("#navigationWrapper ul");
		mainNav.detach();
		$(".v65wb-favLinks").after(mainNav);
		mainNav.addClass("v65wb-adminNav")
		$("#navigationWrapper").hide();
		mainNav.find("img").remove();
	},

	karsonMainNav: function(){
		var mainNav = $("#navigationWrapper ul").clone();
		$(".v65wb-favLinks").after(mainNav);
		mainNav.addClass("v65wb-adminNav")
		$(".v65wb-adminNav").find("img").remove();
	},

	addAdminLinkClass: function(){
		$(".v65wb-adminNav li").each(function(){
			var linkText = $(this).children("a").text();
			linkText = linkText.replace(/\s|&nbsp;/g, '');
			$(this).addClass(linkText);
		});
	},

	moveSubNav: function(){

		if($websitePathName.indexOf("dashboard") != -1){
			var subNav = $("#iFrameWrapper #subNavigation");
			subNav.detach();
			$(".v65wb-adminNav a[href^='/dashboard']").append(subNav);
		} else{
			var iframeContent = $("#iFrameWrapper iframe").contents();
			var subNav = iframeContent.find("#subNavigation");
		}		
	}
		
};

if(document.location == top.location && top.location.hostname.indexOf("siteadmin") > -1 && document.title.indexOf("Vin65") > -1){
	v65wb.initSideBar();
}