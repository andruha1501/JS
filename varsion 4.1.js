                var f = true;
                var r = true;
                var v = true;
                var target = document.querySelector("body");
                var j = 0;
                var str;
                var i = 856;
                var ide;
                var clo;
                var q = true;
                var mouse = true;
                var sec = true;
                var coun = 0;
                var hid_ele;

                var fireEvent = function(element, event) {
                    var evt;
                    var isString = function(it) {
                        return typeof it == "string" || it instanceof String;
                    }
                    element = (isString(element)) ? document.getElementById(element) : element;
                    if (document.createEventObject) {
                        // dispatch for IE
                        evt = document.createEventObject();
                        return element.fireEvent('on' + event, evt)
                    }
                    else {
                        // dispatch for firefox + others
                        evt = document.createEvent("HTMLEvents");
                        evt.initEvent(event, true, true); // event type,bubbling,cancelable
                        return !element.dispatchEvent(evt);
                    }
                }

                function Pause() {
                    var pause = document.getElementById(ide);
                    //debugger;
                    pause.click();
                    console.log("pause");    
                }

                function clickSmallVideo() {
                  var x = document.querySelectorAll('._5asm')[i];
                  x.click()
                  console.log("click small video");
                }

                function clickTitleVideo() {
                  var titCl = document.querySelector('._5o2k');
                  titCl.click()
                  console.log("click Title Video");
                }

                function Save() {
                  var arrow = document.getElementsByClassName('sf-feed')[0];
                  arrow.click();
                  arrow.click();
                  console.log("SAVE1 i = "+i);
                }

                function Save2() {
                  var saveV = document.getElementsByClassName('sf-menu-item')[0]; 
                  saveV.click();
                  console.log("save")
                   i--;

                }

                function Close() {
                    var c = document.querySelectorAll('._5tl7')[0];
                    c.click();
                    //debugger;
                    
                }

                function clickClock(tag) {

                    var clock = tag.children[0].children[1].children[0].children[0].children[2].children[0];
                    clock.click();
                    return clock;
                }

                // create an observer instance
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) { 
                        if (mutation.target.tagName === "VIDEO" && mouse && !mutation.target.classList.contains('hidden_elem')) {
                            ide = mutation.target.id;
                            hid_ele = mutation.target;
                            fireEvent(ide,"mouseenter");
                            mouse = false;
                           
                          console.log('mouse');
                        }

                    
                        if (mutation.target.classList.contains("_23if")) {
                           
                           clickTitleVideo();

       
                          } 

                        if (mutation.target.classList.contains("_11q2") && sec) {  //_4ubd _3tsq _11q2 _3htz
                            sec = false;
                            clo = clickClock(mutation.target);
                            console.log("click on clock");
                        }

                        if (mutation.removedNodes.length !== 0) { //&& mutation.removedNodes[0].classList.contains("hidden_elem") )
                            if (mutation.target.classList.contains("hidden_elem")) {
                                //debugger;
                               
                                f = r = mouse = sec = true;
                                coun = 0;
                                console.log('reset');

                                setTimeout(clickSmallVideo,1000);
                            }
                        }


                       
                        
                        if (mutation.target.classList.contains("_gn4")  && f && !hid_ele.classList.contains('hidden_elem')) {
                           // debugger;
                            //coun++;
                           // console.log(coun);
                           
                                
                                Pause();
                                //debugger;
                                str = mutation.target.style.width.slice(0, -1);  
                                str1 = clo.innerHTML.slice(3); 
                                //console.log(str1);      
                                if (str > 5.0 && str1 > 2) {                       
                                    f = false;
                                    Save();
                                   
                                }
                        }
                          
                        
                        if (mutation.target.title === "video/mp4" && r) {
                            r = false;
                            var mb = mutation.target.innerHTML.slice(0, -3);
                            if (mb > 0) {
                                Save2();
                                // console.log(mb);
                                Close();
                            }
                        }
                            
                            
                    });
                });

                // configuration of the observer
                var config = { attributes: true, childList: true, subtree: true, attributeOldValue: true  };

                // pass in the target node, as well as the observer options
                observer.observe(target, config);


                // var str = mutation.target.classList.contains("_gn4").outerHTML;

                // var str = +mutation.target.style.width;

                //var pusk = setInterval(clickSmallVideo, 20000);