var fs = require('fs');
var exec = require('child_process').exec;
var option = {
	psm : 6,
	lang: 'dolink',
	path: './',
	tesseract: 'tesseract',
	unicharset_extractor: 'unicharset_extractor',
	mftraining: 'mftraining',
	cntraining: 'cntraining',
	combine_tessdata: 'combine_tessdata'
}

readdir(function(list){
	createTr(list);
})

function readdir(cb){
	fs.readdir(option.path, function(err, list){
		if(err) throw new Error(err);
		cb(list);
	})
}

function createTr(list){
	var trList =[];
	var num = 0;
	list.forEach(function(l){
		if(l.substr(-4) === '.tif'){
			var trName = l.substring(0, l.length - 4);
			trList.push(option.tesseract + ' ' +l + ' ' + trName + ' -psm ' + option.psm + ' nobatch box.train');
		}
	})

	for(var i=0; i< trList.length; i++){
		exec(trList[i], function(err, result){
			if(err) throw new Error(err);
			num++;
			if(num === trList.length){
				unicharset();
			}
		});
	}
}

function unicharset(){
	var str = option.unicharset_extractor;
	readdir(function(list){
		list.forEach(function(l){
			if(l.substr(-4) === '.box'){
				str+= ' ';
				str+= l;
			}
		})
		exec(str, function(err, result){
			if(err) throw new Error(err);
			mftraining();
		})
	})
}

function mftraining(){
	var str = option.mftraining + ' ' + '-F font_properties -U unicharset -O ' + option.lang + '.unicharset';
	readdir(function(list){
		list.forEach(function(l){
			if(l.substr(-3) === '.tr'){
				str+= ' ';
				str+= l;
			}
		})
		exec(str, function(err, result){
			if(err) throw new Error(err);
			cntraining();
		})
	})
}

function cntraining(){
	var str = option.cntraining;
	readdir(function(list){
		list.forEach(function(l){
			if(l.substr(-3) === '.tr'){
				str+= ' ';
				str+= l;
			}
		})
		exec(str, function(err, result){
			if(err) throw new Error(err);
			rename();
		})
	})
}

function rename(){
	var num = 0;
	readdir(function(list){
		list.forEach(function(l){
			if(l === 'normproto' || l === 'inttemp' || l === 'pffmtable' || l === 'shapetable'){
				exec('rename '+ l + ' ' + option.lang + '.' + l, function(err, result){
					if(err) throw new Error(err);
					num++;
					if(num === 4){
						combine_tessdata();
					}
				})
			}
		})
	})
}

function combine_tessdata(){
	exec(option.combine_tessdata + ' ' + option.lang + '.', function(err, result){
		if(err) throw new Error(err);
		console.log(result);
		unlink();
	});
}

function unlink(){
	readdir(function(list){
		var num = 0;
		list.forEach(function(l){
			if(l.substr(-3) === '.tr' || l.substr(-4) === '.txt' || l.substr(-10) === 'unicharset' || l === option.lang + '.normproto' || l === option.lang + '.inttemp' || l === option.lang + '.pffmtable' || l === option.lang + '.shapetable'){
				console.log(++num + '. success delete %s', l);
				fs.unlinkSync(l);
			}
		})
	})
}