// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function citizenSignUp() {
    $('#msg-signup').hide();
    $('.loaderDiv').show();
    $('.loadMsg').html('আপনার তথ্যটি জাতীয় নির্বাচন কমিশনের ডাটাবেসে  যাচাই করা হচ্ছে। অনুগ্রহপূর্বক অপেক্ষা করুন।');
    url = "https://ldtax.gov.bd/citizen/nidCheck/";
    var msgMobile = '';
    var msgNid = '';
    var msgDob = '';

    var mobile = $('#reg-mobile').val();
    var nid = $('#reg-nid').val();

    var day = $('#reg-dd').val();
    var month = $('#reg-mm').val();
    var year = $('#reg-yy').val();
    var dob = year + '-' + month + '-' + day;

    if (mobile == '') {
        msgMobile = 'আপনার মোবাইল নাম্বার লিখুন।';
    } else if (mobile.length != 11) {
        msgMobile = 'আপনার সঠিক মোবাইল নাম্বার লিখুন।';
    } else {
        msgMobile = '';
    }

    if (nid == '') {
        msgNid = 'আপনার NID নাম্বার লিখুন।';
    } else if (nid.length !== 10 && nid.length !== 17) {
        //   msgNid='আপনার সঠিক NID নাম্বার লিখুন';
        msgNid = 'আপনার NID টি দশ বা সতের ডিজিটের হবে।';
    } else {
        msgNid = '';
    }

    if (dob == '') {
        msgDob = 'আপনার জন্ম তারিখ লিখুন।';
    } else {
        msgDob = '';
    }

    $('#msg-reg-mobile').html(msgMobile);
    $('#msg-reg-nid').html(msgNid);
    $('#msg-reg-dob').html(msgDob);

    if (mobile == '' || nid == '' || dob == '' || mobile.length != 11 || nid.length < 10) {
        $('.loaderDiv').hide();
        return false;
    }
    debugger;
    $.ajax({
        url: url,
        method: 'POST',
        data: { mobile: mobile, nid: nid, dob: dob },
        timeout: 90000,
        success: function (data) {
            debugger;
            var rData = JSON.parse(data);
            console.log('rData ' + rData);
            if (rData.success == 'false') {
                $('#msg-signup').html(rData.data);
                $('#msg-signup').show();
                $('.loaderDiv').hide();
            } else {
                $('#signupCheck').hide();
                $('#msg-signupDetails').html(rData.data);
                $('.loaderDiv').hide();
            }
        },
        error: function (xmlhttprequest, textstatus, message) {
            if (textstatus === "timeout") {
                $('#msg-signup').html('আবার চেষ্টা করুন।');
            } else {
                $('#msg-signup').html(message);
            }
            $('#msg-signup').show();
            $('.loaderDiv').hide();
        }

    });
}
