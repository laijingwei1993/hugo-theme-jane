$(function () {
  var title = document.title.substring(0, document.title.length - 6);
  var imgUrl = $("img:first").data('src') || location.origin + '/favicon.ico';
  var desc = $("meta[name='description']").attr('content');

  var shareobj = {
    title: title,
    desc: desc,
    link: location.href,
    imgUrl: imgUrl
  };

  var timeObj = {
    title: title,
    link: location.href,
    imgUrl: imgUrl
  }

  var url = "https://code.laijw.com/jsapi_signature?&url=" + encodeURIComponent(location.href);

  var ua = navigator.userAgent.toLowerCase();
  var isWeixin = ua.indexOf('micromessenger') != -1;
  if (isWeixin) {
    $.getJSON(url, function (res) {
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
      });

      wx.ready(function () {
        wx.onMenuShareAppMessage(shareobj);
        wx.onMenuShareTimeline(timeObj);
      });
    });
  }

});