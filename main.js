const IN = "bills.txt"

const parseString = require('xml2js').parseString;
const rp = require('request-promise');
const fs = require('fs');
const url = 'http://www.govinfo.gov/bulkdata/BILLSTATUS/';

async function main(){
   console.log(1)
   await sleep(1000)
   console.log(2)
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function printData(b) {
	var s = "";
	if (b.num) {
		s += 'Bill ' + b.num + ', ';
	}
	if (b.title) {
		s += b.title;
	} 
	s += '\n';
	if (b.sponsors.length >= 1) {
		s += 'First presented by ';
		if (b.sponsors.length > 1) {
			for (var i = 0; i < b.sponsors.length - 1; i++) {
				s += b.sponsors[i] + '; '
			}
			s += "and " + b.sponsors[b.sponsors.length - 1];
		} else {
			s += b.sponsors[0];
		}
		s += '\n';
	}
	if (b.summary) {
		s += "Summary: " + b.summary + '\n';
	}
	if (b.committees.length >= 1) {
		s += "Assigned to the following committee(s): ";
		s += b.committees[0];
		for (var i = 1; i < b.committees.length; i++) {
			s += ';' + b.committees[i];
		}
		s+= '\n';
	}
	if (b.status){
		s += "The Last Action was: " + b.status + "\n";
		if (b.statusActionDate){
			s += "This action was taken: " + b.statusActionDate;
		}
	} else {
		s += "!!! No action was retrieved";
	}
	return s;
}

async function main() {
	var r = fs.readFileSync(IN).toString().replace(/\r/gi, '').split("\n");
	for (var i in r) {
		r[i] = r[i].split(" ");
	}

	for(var i in r) {
		var tempURL = url + r[i][0] + '/' + r[i][1] + '/BILLSTATUS-' + r[i][0] + r[i][1] + r[i][2] + '.xml';
		console.log(tempURL);
		rp(tempURL)
		.then(function(html){
			parseString(html, function(err, result) {
				console.log('\n======================\n');
				if (!err) {
					var data = {};
					var bill = result.billStatus.bill[0];
					data.num = "" + bill.billNumber[0];
					var potTitles = bill.titles[0].item;
					//console.log(JSON.stringify(bill));
					for (var i in potTitles) {
						if (potTitles[i].titleType[0] === "Display Title") {
							data.title = potTitles[i].title[0];
							break;
						}
					}
					if (!data.title) {
						for (var i in potTitles) {
							if (potTitles[i].titleType[0] === "Short Titles as Introduced") {
								data.title = potTitles[i].title[0];
								break;
							}
						}
					}
					if (!data.title) {
						data.title = bill.title[0];
					}
					console.log(data.title);
					data.initDate = bill.introducedDate[0];
					data.sponsors = [];
					for (var i in bill.sponsors){
						data.sponsors[i] = bill.sponsors[i].item[0].fullName[0];
					}
					if (bill.summaries[0].billSummaries[0] != "") {
						data.summary = bill.summaries[0].billSummaries[0].item[0].text[0].split(/<.*?>/gi);
						var temp = "";
						for (var i in data.summary) {
							temp += data.summary[i] + " ";
						}
						data.summary = temp;
					}
					if(bill.committees[0].billCommittees.length > 1) {
						data.committees = [];
						for (var i in bill.committees[0].billCommittees) {
							data.committees[i] = bill.committees[0].billCommittees[i].item[0].name[0];
						}
					} else if (bill.committees[0].billCommittees.length == 1) {
						data.committees = [bill.committees[0].billCommittees[0].item[0].name[0]]
					}
					data.status = bill.latestAction[0].text[0];
					data.statusActionDate = bill.latestAction[0].actionDate[0];
					console.log(printData(data));
				} else {
					console.dir(err);
				}
			})
		})
		.catch(function(err){
			console.log("\nSomething went wrong! Bill:", "congress " + r[i][0] + " " + r[i][1] + r[i][2]);
		});
		await sleep(1000);
		console.log(i);
	}
}

main();

/*
116 hr 195
116 s 192
116 s 209
116 hr 2031
116 hr 1128
116 hr 1135
116 s 229
116 s 336
116 hr 2029
*/
/*
116 hr 209
116 hr 2031
*/