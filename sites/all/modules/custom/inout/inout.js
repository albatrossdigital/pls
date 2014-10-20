// only run if we are in a supported browser
var workingHREF = '';
 

  // Refresh the table contents every 60 seconds
  setInterval ( "doSomething()", 60000 );
  // Refresh the whole page every hour
  setTimeout("location.reload(true);", 600000);

  jQuery(document).ready(function () {
    jQuery("#returnOnText").datepicker({
      altField: '#returnOnText',
      showOn: 'button', 
      buttonText: "Pick a day",
      constrainInput: false,
      duration: ""
    });
    
    jQuery("#startOnText").datepicker();
    
    jQuery("#endOnText").datepicker();

    setupCheckInFunction();
    setupCheckOutFunction();
  });

function doSomething ( )
{
  // alert('Called doSomething');
  // $('div.inout-container').html('BAM!!!!!!!!!!!!!');

  var callRefresh = function (data) {
    jQuery('div.inout-container').html(data.refresh);

    setupCheckInFunction();
    setupCheckOutFunction();
  }
 
  jQuery.ajax({
    type: 'POST',
    url: '/inout/refresh',
    dataType: 'json',
    success: callRefresh,
    data: 'js=1'
  });
}

function setupCheckOutFunction ()
{
    var dialog = jQuery("#dialog").dialog({
      bgiframe: true,
      autoOpen: false,
      height: 320,
      width: 700,
      modal: true,
      overlay: { backgroundColor: "#000", opacity: 0.5 },
      buttons: {
        'Check Out': function() {
          var returnOnSelect = jQuery("#returnOnSelect"),
              returnOnText = jQuery("#returnOnText"),
              msgSelect = jQuery("#msgSelect"),
              msgText = jQuery("#msgText"),
              returnAtSelect = jQuery("#returnAtSelect"),
              returnAtText = jQuery("#returnAtText");

          var checkOut = function (data) {
            jQuery('div.inout-status-button'+data.uid).html(data.link);
            jQuery('td.inout-msg'+data.uid).html(data.msg);
            jQuery('td.inout-return'+data.uid).html(data.returnonat);
            document.getElementById('inout-row'+data.uid).className='outrow';
      
            setupCheckInFunction("");
          }

          jQuery.ajax({
            type: 'POST',
            url: workingHREF,
            dataType: 'json',
            success: checkOut,
            data: 'js=1&returnOnSelect='+escape(returnOnSelect.val())
                  +'&returnOnText='+escape(returnOnText.val())
                  +'&msgSelect='+escape(msgSelect.val())
                  +'&msgText='+escape(msgText.val())
                  +'&returnAtSelect='+escape(returnAtSelect.val())
                  +'&returnAtText='+escape(returnAtText.val())
          });

          jQuery(this).dialog('close');
        },
        Cancel: function() {
          jQuery(this).dialog('close');
        }
      },
      close: function() {
        // allFields.val('').removeClass('ui-state-error');
      },
      open: function() {
            jQuery("#returnOnSelect").val("");
            jQuery("#returnOnText").val("");
            jQuery("#msgSelect").val("");
            jQuery("#msgText").val("");
            jQuery("#returnAtSelect").val("");
            jQuery("#returnAtText").val("");
      }
    });

    jQuery('a.checkout-link').click(function() {
      workingHREF = this.href;
      dialog.dialog('open');
 
      return false;
    });
}

function setupCheckInFunction ()
{
    jQuery('a.checkin-link').click(function () {
      var checkIn = function (data) {
        jQuery('div.inout-status-button'+data.uid).html(data.link);
        jQuery('td.inout-msg'+data.uid).html('');
        jQuery('td.inout-return'+data.uid).html('');
        document.getElementById('inout-row'+data.uid).className='inrow';
        setupCheckOutFunction();
      }

      jQuery.ajax({
        type: 'POST',
        url: this.href,
        dataType: 'json',
        success: checkIn,
        data: 'js=1'
      });

      return false;
    });
}
