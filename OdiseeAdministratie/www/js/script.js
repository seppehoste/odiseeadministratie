$(document).ready(function(){
	$('#button').on('click', function(e){
		e.preventDefault();
		//Resets waardes indien er errors waren
		var error = $('#error');
		error.text('');
		$('#nummer').css('border-color', 'rgb(34,31,32)');
		$('#wachtwoord').css('border-color', 'rgb(34,31,32)');

		//declareren variabelen
		var OK = true;
		var num = $('#nummer').val();
		var pas = $('#wachtwoord').val();

		//REGEX
		//^(u|s|r) => letters u, r of s
		//[0-9]{7} => 7 getallen
		// /^(u|s|r)+[0-9]{7}/
		var patt = new RegExp(/^(u|r)+[0-9]{7}/g);
		var bool = patt.test(num);

		//FORMSCHECKING
		if(num==''){
			$('#nummer').css('border-color', '#d11d05');
			error.append('Gelieve een nummer op te geven!<br />');
			OK = false;
		}
		else if(!bool){
			$('#nummer').css('border-color', '#d11d05');
			error.append('Gelieve een correct nummer op te geven!<br />');
			OK = false;
		}
		if(pas==''){
			$('#wachtwoord').css('border-color', '#d11d05');
			error.append('Gelieve een passwoord op te geven!<br />');
			OK = false;
		}

		if(OK){
			var Docent = new RegExp(/^(u)/g);
			var Student = new RegExp(/^(r)/g);
			/**
			 * LOGIN VERIFICATIE HIER
			*/
			if(Docent.test(num)){
				document.location.href = 'scan.html';
			} else if(Student.test(num)){
				document.location.href = 'overzicht.html';
			}
		}
		
	});
	
	//FOOTER FIX
	$('.input').on('focus',function() {
		$('footer').hide();
	});

	$('.input').on('blur',function() {
		$('footer').show();
	});

	//NFC ICON HANDLING
	$('#NFCicon').on('click', function(e){
		e.preventDefault();
		var rand = Math.floor((Math.random() * 10) + 1);
		console.log("getal: " + rand);
		if(rand % 2 === 0) {
				$('.loading').fadeTo('slow', 0.001, function()
				{
				    $(this).css('background-image', 'url("img/nfcgreen.png")');
				}).fadeTo('slow', 1);
		} else{
			$('.loading').fadeTo('slow', 0.001, function()
				{
				    $(this).css('background-image', 'url("img/nfcred.png")');
				}).fadeTo('slow', 1);
		}
	});
});