/*
 * timer2
 * https://github.com/moneyfly/timer2
 * Author: Moneyfly
 * Copyright (c) 2019 timer2
 * Licensed under the MIT license.
 */
"use strict";
( function($) {    
    // Collection method.
    $.fn.timer2 = function(options) {
        var $this = $(this);
        options = $.extend({
            day:true,
            hour:true,
            munute:true,
            second:true
        },options );
        
        return this.each(function() {
            var $this = $(this);
            // clean exist
            $this.siblings('.timer2-box').remove();
            var value;
            // Do something awesome to each selected element.
            if(this.tagName === "DIV" || this.tagName === "SPAN"){
                value = this.innerText.trim();
                if(! /^[0-9]+$/.test(value)){
                    return ;
                }
                this.innerText = $.fn.timer2.format_time(parseInt(value));
            } 
            if(this.tagName === "INPUT" && this.getAttribute('type')==='text'){
                //Create container
                value = $this.val();
                if(! /^[0-9]+$/.test(value)){
                    return ;
                }
                var dhms = $.fn.timer2.get_dhms(value);
                var day_ct = options.day && '<input type="text" title="day" class="timer2-inside input-day" value="'+dhms[0]+'">' + "days" || "";
                var hms = [];
                var hms_str = [];
                if(options.hour){
                    hms.push('<input type="text" title="hour" class="timer2-inside input-hour" value="'+dhms[1]+'">');
                    hms_str.push('hh');
                }
                if(options.munute){
                    hms.push('<input type="text" title="minute" class="timer2-inside input-minute" value="'+dhms[2]+'">');
                    hms_str.push('mm');
                }
                if(options.second){
                    hms.push('<input type="text" title="second" class="timer2-inside input-second" value="'+dhms[3]+'">');
                    hms_str.push('ss');
                }
                hms_str = hms_str.join(":")
                var content = day_ct+hms.join(":")+(hms_str!="" && "("+hms_str+")" || "") ;
                var $container = $(document.createElement("div")).attr({"class": "timer2-box"}).html(content);
                // Insert before
                $this.before($container);
                // Hide itself
                $this.hide();
                // enable event, find child input enable onchange
                $container.children(".timer2-inside").bind("propertychange change click keyup input paste", function(){
                    var $value = $(this).val();
                    if($(this).attr("title") === "day" && ! /^[0-9]+$/.test($value)){
                        $(this).val(0);
                    }
                    if($(this).attr("title") === "hour"){
                        if($value > 23){
                            $(this).val(23);    
                        } else if ( ! /^[0-9]+$/.test($value)){
                            $(this).val(0);
                        }else {
                            $(this).val(parseInt($value ));
                        }
                    }
                    if(($(this).attr("title") === "minute" || $(this).attr("title") === "second") ){
                        if($value > 59){
                            $(this).val(59);    
                        } else if ( ! /^[0-9]+$/.test($value)){
                            $(this).val(0);
                        }else {
                            $(this).val(parseInt($value ));
                        }
                    }
                    // Get day hour minut second
                    var dhms = {day:0,hour:0,minute:0,second:0};
                    $container.children(".timer2-inside").each(function(){
                        dhms[$(this).attr("title")] = $(this).val();
                    });
                    $this.val($.fn.timer2.get_seconds(dhms.day,dhms.hour,dhms.minute,dhms.second));
                });
                
            } 
        });
    };
    
    $.fn.timer2.format_time = function(seconds) {
        var pad_zero = function(num) {
            return num < 10 && "0" + num || num;
        };
        var dhms = $.fn.timer2.get_dhms(seconds);
        var day = dhms[0] > 1 && dhms[0]+"days " || (dhms[0] > 0 && dhms[0]+"day " || ""); 
        return day+pad_zero(dhms[1])+":"+pad_zero(dhms[2])+":"+pad_zero(dhms[3]); 
    };
    
    $.fn.timer2.get_dhms = function(seconds) {
        var second = seconds - Math.floor(seconds/60)*60;
        var minute = Math.floor((seconds - Math.floor(seconds/3600)*3600)/60);
        var hour = Math.floor((seconds - Math.floor(seconds/86400)*86400)/3600);
        var day = Math.floor(seconds/86400);
        return [day,hour,minute,second]; 
    };
    
    $.fn.timer2.get_seconds = function(day,hour,minute,second) {
        return Math.floor(day*86400+3600*hour+60*minute+second*1); 
    };
}(jQuery));
