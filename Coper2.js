

(()=>{
	"use strict";
	var wkInfo=__fisData.get('WkInfo');
	var totalPage=wkInfo.DocInfo.totalPageNum;
	var	page=0;
	var text='';
	var is_loop=true;

	var saveFile=function(fileName, data) {
		var blob = new Blob([data], {type: 'text/plain'});
		var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = fileName;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
	}

	$('html,body').scrollTop(0);
	var copyLoop=function(){
		"use strict";
		$('.reader-txt-layer').each((index,element)=>{
			//debugger;
			var parent=$(element).parents('[data-page-no]');
			var pageNum=parent.data('page-no');
			if(pageNum<=page)
				return;
			else if(pageNum===page+1){
				var elements=$('.ie-fix>',element);
				//elements.splice(0,5);
				text+=elements.text();
				window.text=text;
				++page;
				if(totalPage<=page)
					is_loop=false;
				//debugger;
				element.scrollIntoView({
					behavior:'smooth',
					block:'start'
				});
			}else{
				alert("pageNum error!");
				is_loop=false;
				return;
			}
		});
		if(is_loop)
			setTimeout(copyLoop,1000);
		else
			saveFile(wkInfo.DocInfo.title,text);
	}
	setTimeout(copyLoop,1000);
})();

