/*! timer2 - v0.0.1 - 2019-10-01
* Copyright (c) 2019 Moneyfly; Licensed MIT */
"use strict";
( function($) {    
    // Collection method.
    $.fn.timer2 = function(options) {
        options = $.extend({
            
        },options );
        
        return this.each(function() {
            // Do something awesome to each selected element.
            if(this.tagName === "DIV" || this.tagName === "SPAN"){
                var value = this.innerText.trim();
                if(! /^[0-9]+$/.test(value)){
                    return ;
                }
                this.innerText = $.fn.timer2.format_time(parseInt(value));
            } 
            if(this.tagName === "INPUT" && this.getAttribute('type')==='text'){
                console.log("input text");
            } 
        });
    };
    
    $.fn.timer2.format_time = function(seconds) {
        var pad_zero = function(num) {
            return num < 10 && "0" + num || num;
        };
        var second = pad_zero(seconds - Math.floor(seconds/60)*60);
        var minute = pad_zero(Math.floor((seconds - Math.floor(seconds/3600)*3600)/60));
        var hour = pad_zero(Math.floor((seconds - Math.floor(seconds/86400)*86400)/3600));
        var day = Math.floor(seconds/86400);
        day  = day > 1 && day+"days " || (day > 0 && day+"day " || ""); 
        return day+hour+":"+minute+":"+second; 
    };

}(jQuery));
