const CUSTOM_MOD=true, //Set this to true if you use custom proxy modules that changes appearances using S_USER_EXTERNAL_CHANGE. Leave this as true if you don't know what it means
	 MESSAGE_OVERRIDE_CHANGES=true;

const Command = require('command'),
	  path = require('path'),
	  fs = require('fs');
	  
const customfilename=['weapon','chest','gloves','boots','head','face','weaponModel','chestModel','glovesModel','bootsModel','weaponDye','chestDye','glovesDye','bootsDye','weaponEnchant','hairAdornment','mask','back','weaponSkin','costume','costumeDye'];

module.exports = function exportlook(dispatch) {
	const command = Command(dispatch);
	
	let enabled=true,
		fileopen=true;  //dont touch this.
	
	let equips={},
		changed=[],
		customdata={},	
		playerid,
		importdata,
		stopwrite,
		importsave,
		datanamestring,
		originalequips;
		
		
	try { 
		customdata = require('./playerdata.json');
	}
	catch(e) {  
		customdata = {};  
	};
	
	try {
		importdata = require('./importdata.json');
	}
	catch(e) {
		importdata={};
	};

	
	dispatch.hook('S_LOGIN', 1, event => {
		playerid = event.cid,
		datanamestring=event.name.toLocaleLowerCase();
	});
	
	dispatch.hook('S_SPAWN_USER',3,event => {
		if(enabled)	{
			let playername=event.name.toLocaleLowerCase();
			if(customdata[playername]) {
				for(var i=0;i<changed.length;i++) {
					if(changed[i].id.equals(event.cid)) {
						break;
					};
					if(i==(changed.length-1)) {
						changed.push({id:event.cid});
					};	
				};
				Object.assign(event,customdata[playername]);
				if(MESSAGE_OVERRIDE_CHANGES) {command.message('(Exportlook) Changed '+ playername + ' to saved costume')};
				return true
			};
		};
	});
	
	dispatch.hook('S_SPAWN_ME',1, event => { //reset namelist on location change
		changed=[];
	});
	
	dispatch.hook('S_USER_EXTERNAL_CHANGE',1,event => {   //slienced packets wont be saved by default.
		if(enabled && event.id.equals(playerid)) {
			equips=Object.assign({},event),
			command.message('(Exportlook) Current Equipped saved');
		}
		else {
			for(var i=0;i<changed.length;i++) { 
				if(event.id.equals(changed[i].id)) {
					return false;
					break;
				};
			};
		};
	});
	
	if(CUSTOM_MOD) {
		dispatch.hook('S_USER_EXTERNAL_CHANGE',1,{order:6,filter:{fake:true}},event => { 	//hooks for fake packets from other modules, hook later to prevent clashes?
			if(enabled && event.id.equals(playerid)) {	
				equips = Object.assign({},event),
				command.message('(Exportlook) Current Equipped saved');
			};
		});
	};
	
	command.add('fileimport',namearg => {
		fs.readFile(path.join(__dirname,'importdata.json'),function(err,data) {
			if(err) {
				command.message('(Exportlook) Error reading file importdata.json. Check that it is in module folder');
				return
			};
			data=JSON.parse(data);
			if(typeof namearg === 'undefined') {
				Object.assign(customdata,data);
				saveplayer('playerdata.json',customdata);
				command.message('(Exportlook) Attempted to Import all data');
			}
			else if(data[namearg.toLocaleLowerCase()]) {
				customdata[namearg.toLocaleLowerCase()]=data[namearg.toLocaleLowerCase()];
				saveplayer('playerdata.json',customdata);
				command.message('(Exportlook) Attempted to Import data for '+ namearg);
			}
			else
				command.message('(Exportlook) Error Importing file: Name not found');
		});
	});

	command.add('fileexport',() => {
		importdata[datanamestring]=makesavefile(equips);
		saveplayer('importdata.json',importdata);
		command.message('(Exportlook) Created import file. Send importdata.json to another player to have them fix how all your exported characters look like on their end.');
	});
		
	//Disable/Enable Module
	command.add('eltoggle',() => {
		if(enabled) {
			enabled=false,
			players=[],
			changed=[],
			command.message('(Exportlook)Disabled');
		}
		else {
			enabled=true,
			command.message('(Exportlook)Enabled');
		};
	});
	
	function makesavefile(datatosave) {
		datatosave.inner=datatosave.innerwear;
		for(let deletename of ['id','innerwear','unk1','unk2','unk3','unk4','enable']) {
			delete datatosave[deletename]
		};
		return Object.assign({},datatosave);
	};
	
	function saveplayer(filename,dataname) {
		if(fileopen) {
			fileopen=false;
			fs.writeFile(path.join(__dirname,filename), JSON.stringify(dataname), err => {
				if(err) throw err;
				fileopen = true;
			});
		}
		else {
			clearTimeout(stopwrite);  //if file still being written
			stopwrite=setTimeout(saveplayer(filename,dataname),2000);
			return;
		};
	};
};
	
	
	
	
	
	
	
	
	
	
	
	
		