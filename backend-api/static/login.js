'use strict';
$(document).ready(function() {
  var selectAccountCallback = function(type, token) {
    log('user logged on ' + type, 'with token ', token);
    $('#social-token').html(token);
    $('#social-token-container').fadeIn();
    $('#btn-authenticate').attr('disabled', false);
    social_token = token;
    token_type = type;
  };

  var config = {
    selectAccount: selectAccountCallback,
    googleLoader: '#google-loader'
  };
  $().socialLogin(config);
});

var googleApiClientId =
  '758979408479-h8rgnvkfhro2o2i3q3idek10r5cbt4u3.apps.googleusercontent.com';

(function($) {
  $.fn.socialLogin = function(config) {
    var selectAccount = config.selectAccount;

    $.getScript('./login-google.js', function() {
      GoogleLogin(selectAccount, config.googleLoader, googleApiClientId);
    });

    return this;
  };
})(jQuery);
