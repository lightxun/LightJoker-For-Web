//# 

/**
    sourceURL=digital-clock.js
 *  Created by Light on 2017-05-17.
 */
$(document).ready(function() {
// Create two variable with the names of the months and days in an array
//    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
//    var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var monthNames = [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ];
    var dayNames= ["周日","周一","周二","周三","周四","周五","周六"]

// Create a newDate() object
    var newDate = new Date();
// Extract the current date from Date object
    newDate.setDate(newDate.getDate());
// Output the day, date, month and year

    //dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear()
   var val = newDate.getFullYear() + ' 年 '+ (newDate.getMonth() + 1) + ' 月 ' + newDate.getDate() + ' 日 ' + dayNames[newDate.getDay()];
    $('.digital-Date').html(val);

    setInterval( function() {
        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();
        // Add a leading zero to seconds value
        $(".digital-sec").html(( seconds < 10 ? "0" : "" ) + seconds);
    },1000);

    setInterval( function() {
        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes value
        $(".digital-min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);

    setInterval( function() {
        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();
        // Add a leading zero to the hours value
        $(".digital-hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
});