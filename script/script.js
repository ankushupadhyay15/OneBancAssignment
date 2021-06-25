$(document).ready(function(){
$("#useridform").on("submit",function(e){
  e.preventDefault();
  var userID = $('input[type=text]').val();
  // URL variable for get request
  const url = 'http://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId='+userID+'&recipientId=2';
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();      //Request Sent
  request.onload = () => {
    if (request.status = 200) {   //Condition for checking request status
    var result = JSON.parse(request. response);
    var trxn = result.transactions.sort(function(a,b){
      return new Date(a.startDate)- new Date(b.startDate); 
    });
    // console.log(trxn);
    var arr = "";     // Decleared empty srting
    trxn.forEach((data) => {   //Loop for fetching every transaction
      arr+='<div class="txnarea">';
      arr+='<div>';
      arr+='<hr class="hr-text" data-content="'+data.startDate.substring(0,10)+'"></hr>';
      arr+='<div style="display: inline-block; width: 100%;">';
      var float = "";
      if (data.direction == 2){float="left";}else{float="right";}   //Condition for block display
      arr+='<div class="txnblock" style="float:'+float+'">'
          +'<p class="Amount">Rs '+data.amount+'</p>'
          +'<span class="status">';
      switch(data.status){      // Condition for block status display
        case 1: 
          if (data.type == 2 && data.direction == 1){arr+="<img class='check' src='image/timer.png'>You Requested</span>";}
          if (data.type == 2 && data.direction == 2){arr+="<img class='check' src='image/timer.png'>Request Received</span>";}
          break;
        case 2: 
          if (data.type == 1 && data.direction == 1){arr+="<img class='check' src='image/check.png'>You Paid</span>";}
          if (data.type == 1 && data.direction == 2){arr+="<img class='check' src='image/check.png'>You Received</span>";}
          arr+='<p>Transaction Id</p><p class="TransactionID" >'+data.id+'</p>';
          break;
        case 3: 
          arr+="Expired</span>";
          break;
        case 4: 
          arr+="Rejected</span>";
          break;
        case 5: 
          arr+="Cancel</span>";
          break;
      }       
      arr+='<div>';
      if (data.type == 2 && data.direction == 1){     //Display buttons acc to condition
        arr+='<button>Cancel</button>';
      } else if(data.type == 2 && data.direction == 2){
        arr+='<button>Pay</button><button>Reject</button>';
      }
      arr+='<span><img class="arrow" src="image/arrow.png"></span>';
      arr+='</div></div></div></div>';
      arr+='<div class="endDate" style="float:'+float+'">'+data.startDate+'</div>';
      arr+='</div>';
      arr+='</div><br>';
    });
    $("#addarea").append(arr);

    } else {
    console.log(`error ${request.status} ${request.statusText}`);     //Dispaly console error
    }
  }
  });
});