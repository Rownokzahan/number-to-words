$("#submit").click(function(e){
    e.preventDefault();
    const number = $("#number").val();
    const numberLength= number.toString().length;
    if(numberLength>9){
        $("#digit-info").css("display","block");
    }else{
        $(".entered-div").css("display","block");
        const words = numberToWords(number);
        $("#words").text(words);
    }
});



function numberToWords(number){
    const less20 = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen','seventeen', 'eighteen', 'nineteen'];
    
    function lessThen100(n){
        const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred'];
        let numberInWords = '';
        if(n<20){
            numberInWords = less20[n];
            return numberInWords; 
        }
        else{
            const firstDigit = Math.floor(n/10);
            const secondDigit = n%10;
            numberInWords = tens[firstDigit]+'-' + less20[secondDigit]; 
            return numberInWords; 
        }       
    }

    function hundred(n){
        if(n==0) return "";
        let numberInWords ="";
        const firstDigit = Math.floor(n/100);
        const lastDigits = n%100;
        numberInWords = less20[firstDigit]+" hundred "+lessThen100(lastDigits);
        return numberInWords;
    }

    function thousand(n){
        if(n==0) return "";
        let numberInWords ="";
        const firstDigit = Math.floor(n/1000);
        const lastDigits = n%1000;
        if(lastDigits<100){
            numberInWords = lessThen100(firstDigit)+" thousand "+lessThen100(lastDigits); 
        }else{
            numberInWords = lessThen100(firstDigit)+" thousand "+hundred(lastDigits);
        }
        return numberInWords;
    }

    function lack(n){
        if(n==0) return "";
        let numberInWords ="";
        const firstDigit = Math.floor(n/100000);
        const lastDigits = n%100000;
        if(lastDigits<100){
            numberInWords = lessThen100(firstDigit)+" lack "+lessThen100(lastDigits); 
        }
        else if (lastDigits>=100 && lastDigits<1000){
            numberInWords = lessThen100(firstDigit)+" lack "+hundred(lastDigits);
        }else{
            numberInWords = lessThen100(firstDigit)+" lack "+thousand(lastDigits);
        }
        return numberInWords;
    }

    function crore(n){
        if(n==0) return "";
        let numberInWords ="";
        const firstDigit = Math.floor(n/10000000);
        const lastDigits = n%10000000;
        if(lastDigits<100){
            numberInWords = lessThen100(firstDigit)+" crore "+lessThen100(lastDigits); 
        }
        else if (lastDigits>=100 && lastDigits<1000){
            numberInWords = lessThen100(firstDigit)+" crore "+hundred(lastDigits);
        }else if (lastDigits>=1000 && lastDigits<10000){
            numberInWords = lessThen100(firstDigit)+" crore "+thousand(lastDigits);
        }else{
            numberInWords = lessThen100(firstDigit)+" crore "+lack(lastDigits);
        }
        return numberInWords;
    }


    let numberLength= number.toString().length;
    let words ='';

    if(numberLength==1 && number==0){
        words ="zero";
    } 
    else if(number==null || number=='' || number<0 || number[0]== 0){
        words ="Invalid or negative number";
    } 
    else if(number<100){
        words = lessThen100(number);
    }   
    else if(number>=100 && number<1000){
        words = hundred(number);
    }
    else if(number>=1000 && number<100000){
        words = thousand(number);
    }
    else if(number>=100000 && number<10000000){
        words = lack(number);
    }
    else if(number>=10000000 && number<1000000000){
        words = crore(number);
    }

    return words;
}