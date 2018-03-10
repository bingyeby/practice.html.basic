(function(){
    var myMusic = (function(){

        var music = function(){
            //��Ƶ�ļ��ӿڣ������������ֵĲ���
            window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

            //���󶯻�֡
            window.requestAnimationFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame;

            var $audio = $("audio");
            var playBtn = $("play");
            var search = $("search");
            var prev = $("prev");
            var next = $("next");
            var slists = $("s-lists");
            var $songs = slists.getElementsByTagName("li");
            var mark = true;
            var n = 0;

            //���
            var wp_processBar = $("wp_processBar");
            var wp_processBtn = $("wp_processBtn");
            var wp_playTime = $("wp_playTime");
            var wp_process = $("wp_process");
            var totalTime = $("totalTime");
            var txt = data[0].lrc;//������
            var lrcCon = $("lrcCon");

            //��������
            var vol_btn = $("vol-btn");
            var vol_bar = $("vol-bar");
            var vol_process = $("vol-process");
            var volume_mute = $("volume-mute");

            var jsons = {
                init : function(){ //��ʼ��
                    slists.innerHTML = jsons.templateLists(data);
                    jsons.playMusic();
                    jsons.searchMusic();
                    this.analyserMus();
                },

                playMusic : function(){ //��������
                    var _this = this;
                    //���š���ͣ
                    playBtn.onclick = function(){
                        if(mark){
                            $audio.play();
                            _this.clearOtherStyle(n);
                            this.classList.add("play");
                        }else{
                            $audio.pause();
                            this.classList.remove("play");
                        }
                        mark = !mark;
                        totalTime.innerHTML = time($audio.duration);
                    };

                    //��һ��:
                    prev.onclick = function(){
                        n--;
                        if(n<0)n = data.length-1;
                        _this.playing(n);
                    }

                    //��һ��
                    next.onclick = function(){
                        n++;
                        if(n > data.length-1) n=0;
                        _this.playing(n);
                    }
                    // �������
                    _this.clickLists();

                    //��������Զ���ת
                    $audio.addEventListener("ended",function(){
                        n++;
                        if(n > data.length-1) n=0;
                        _this.playing(n);
                    },false);

                    //��ǰ����ʱ��
                    $audio.addEventListener("timeupdate",function(){
                        nowTime();
                    });

                    //�ر������б�
                    $("packupLists").onclick = function(){
                        $("searchLists").style.height = "0px";
                    }

                    //���
                    wp_processBtn.onmousedown = function(ev){
                        var ev = ev || window.event;
                        var x = ev.clientX - this.offsetLeft;
                        document.onmousemove = function(ev){
                            var _left = ev.clientX - x;
                            if (_left <= 0){
                                _left = 0;
                            }
                            if(_left >= wp_process.offsetWidth-wp_processBtn.offsetWidth){
                                _left = wp_process.offsetWidth-wp_processBtn.offsetWidth;
                            }
                            wp_processBtn.style.left = _left + "px";
                            wp_processBar.style.width = _left + "px";
                            var proN = _left/(wp_process.offsetWidth-wp_processBtn.offsetWidth);
                            $audio.currentTime = proN*$audio.duration;
                            nowTime();
                        }
                        document.onmouseup = function(){
                            document.onmousemove = null;
                            document.onmouseup = null;
                        }
                        return false;
                    }

                    //��������
                    vol_btn.onmousedown = function(ev){
                        var ev = ev || window.event;
                        var x = ev.clientX - this.offsetLeft;
                        document.onmousemove = function(ev){
                            var w = ev.clientX - x;
                            if (w <= 0){
                                w = 0;
                            }
                            if(w >= vol_process.offsetWidth-vol_btn.offsetWidth){
                                w = vol_process.offsetWidth-vol_btn.offsetWidth;
                            }
                            vol_bar.style.width = w + "px";
                            vol_btn.style.left = w + "px";
                            var proN = w/(vol_process.offsetWidth-vol_btn.offsetWidth);
                            $audio.volume = proN;
                            nowTime();
                        }
                        document.onmouseup = function(){
                            document.onmousemove = null;
                            document.onmouseup = null;
                        }
                        return false;
                    }

                    //����
                    volume_mute.onclick = function(){
                        $audio.volume = 0;
                        vol_bar.style.width = 0;
                        vol_btn.style.left = 0;
                    };

                    //����ʱ��
                    function nowTime(){
                        wp_playTime.innerHTML = time(audio.currentTime);
                        var n = $audio.currentTime/$audio.duration;
                        wp_processBtn.style.left = n*(wp_process.offsetWidth-wp_processBtn.offsetWidth)+"px";
                        wp_processBar.style.width = n*(wp_process.offsetWidth-wp_processBtn.offsetWidth)+"px";
                    }
                    //���ͬ��
                    _this.currentLrc();
                },

                //����б���
                clickLists : function(){
                    //����б���
                    var _this = this;
                    var $songs = $("s-lists").getElementsByTagName("li");
                    for(var i=0;i<$songs.length;i++){
                        (function(index){
                            $songs[index].onclick = function(){
                                n = index;
                                _this.playing(n);
                            }
                        })(i);
                    }
                    /*$("s-lists").onclick = function(ev){ ί�з�ʽ��û��Ҫ
                     var ev = ev || window.event;
                     console.log(ev);
                     if(ev.target.nodeName.toLocaleLowerCase() === "a"){
                     console.log(ev.target.parentNode);
                     }
                     };*/
                },

                //�����ܷ���
                playing:function(n){
                    this.clearOtherStyle(n); //���ѡ���б����ʽ
                    $audio.src = data[n].src; //��ȡ����url
                    txt = data[n].lrc; //��ȡ���
                    playBtn.classList.add("play");
                    mark = false;
                    this.currentLrc(); //���ͬ�� ��ʼ��
                    $audio.play(); //����
                    this.load(); //���� ����
                },
                //���������Ƿ����
                load:function (){
                    $audio.addEventListener("canplay",function(){
                        totalTime.innerHTML = time(audio.duration);
                    },false);
                },
                //�����ʽ
                clearOtherStyle : function (n){
                    for(var i = 0;i<$songs.length;i++){
                        $songs[i].classList.remove("active");
                    }
                    $songs[n].classList.add("active");
                },
                //���ͬ��
                currentLrc : function(){
                    var lrcArr = txt.split("[");
                    //console.log(lrcArr);
                    var html = '';
                    for (var i=0;i < lrcArr.length ;i++ )
                    {
                        var arr = lrcArr[i].split("]");
                        //console.log(arr);
                        var time = arr[0].split(".");
                        var timer = time[0].split(":");
                        //console.log(timer);
                        var ms = timer[0]*60 + timer[1]*1;//��ʱ��ת��Ϊ��
                        //console.log(ms);
                        var text = arr[1];//�������
                        if (text){
                            html += "<p id=gc"+ms+">"+text+"</p>"
                        }
                        lrcCon.innerHTML = html;
                    }
                    var sum = 0;
                    var curTime = 0;
                    var oP= lrcCon.getElementsByTagName("p");
                    for(var i=0;i<oP.length;i++){
                        oP[i].style.display = 'none';
                    }
                    $audio.addEventListener("timeupdate",function(){
                        curTime = parseInt(this.currentTime);//��ȡ��ǰ���ŵ�ʱ��
                        if (document.getElementById("gc"+curTime)){
                            for (var i=0;i<oP.length ;i++  ){
                                oP[i].style.display = "none";
                            }
                            document.getElementById("gc"+curTime).style.display = "block";
                        }
                    });
                },

                //��������
                searchMusic : function(){
                    var _this = this;
                    var curr = 1; //Ĭ����ʾ��һҳ����
                    search.onclick = searchSong; //���������ť����
                    //�س�������
                    document.body.onkeydown = function(ev){
                        var ev = ev || window.event;
                        if(ev.keyCode === 13){
                            searchSong();
                        };
                    }

                    function searchSong(){
                        var searchVal = $("searchInput").value;
                        var slDetails = $("sl-details");
                        if(searchVal.trim() == "")return false;
                        $("searchInput").value = "";
                        dome(curr);
                        function dome(curr){
                            console.log("jinlai");
                            jsonp({
                                url :"http://so.ard.iyyin.com/s/song_with_out",
                                data : {
                                    q : searchVal,
                                    page : curr || 1,
                                    size:10
                                },//�����ֵ
                                callback : "callback",//�ص��������֡�Ĭ��callback��
                                success : function(data){ //�ɹ�ִ�лص�
                                    if(data.code === 1){
                                        var html = "";
                                        var toall = parseInt(data.pages/10); //ҳ��
                                        var datas = data.data; //��ȡ��ǰ��������
                                        /*
                                         //ģ�����÷���
                                         var html = template("text",datas);
                                         slDetails.innerHTML = html;
                                         */
                                        for(var i=0;i<datas.length;i++){
                                            var song_name = datas[i].song_name ? datas[i].song_name : "��";
                                            var singer_name = datas[i].singer_name ? datas[i].singer_name : "��";
                                            var album_name = datas[i].album_name ? datas[i].album_name : "��";
                                            var duration = "";
                                            var typeDescription = "";
                                            if(datas[i].url_list[1]){
                                                duration = datas[i].url_list[1].duration ? datas[i].url_list[1].duration : "��";
                                                typeDescription = datas[i].url_list[1].typeDescription ? datas[i].url_list[1].typeDescription : "��";
                                            }else{
                                                continue;
                                            }
                                            html += '<li data-url="'+datas[i].url_list[1].url+'" data-songId="'+datas[i].song_id+'" data-songName = "'+song_name+'" data-songerName = "'+singer_name+'">'+
                                                '	<a href="javascript:;">'+singer_name +'</a>'+
                                                '	<a href="javascript:;">'+song_name+'</a>'+
                                                '	<a href="javascript:;">'+album_name+'</a>'+
                                                '	<a href="javascript:;">'+duration+'</a>'+
                                                '	<a href="javascript:;">'+typeDescription+'</a>'+
                                                '</li>';
                                        }
                                        slDetails.innerHTML = html;  //���������б�
                                        $("searchLists").style.display = "block";
                                        $("searchLists").style.height = "100%";
                                        _this.getLyrics(); //��ȡ���߸��

                                        //��ʼ����ҳ
                                        laypage({
                                            cont: 'pagesbox', //������ֵ֧��id����ԭ��dom����jquery���󡣡��������Ϊ����<div id="page1"></div>
                                            pages: toall, //ͨ����̨�õ�����ҳ��
                                            curr: curr || 1, //��ǰҳ
                                            jump: function(obj, first){ //������ҳ��Ļص�
                                                if(!first){ //�����ҳ�����������������ݵ�ǰҳ��obj.curr
                                                    dome(obj.curr);
                                                }
                                            },
                                            groups : 5 // ������ʾ��ҳ��
                                        });
                                    }else{
                                        alert("��ȡ�б�ʧ��");
                                    }
                                },//�ɹ��ص�����
                                fail : function(){
                                    alert("����ʧ�ܣ�");
                                }//ʧ�ܻص�
                            });
                        }
                    }
                },
                //��������б� ���Ÿ���+��ȡ��ʣ�
                getLyrics : function(){
                    var _this = this;
                    var $lis = $("sl-details").getElementsByTagName("li");
                    for(var i=0;i<$lis.length;i++){
                        (function(index){
                            $lis[index].onclick = function(){
                                var songUrl = this.dataset.url;
                                var songId = this.dataset.songid;
                                var songName = this.dataset.songname;
                                var songerName = this.dataset.songername;
                                getLy(songerName,songName,songId,songUrl);
                            };
                        })(i);
                    }

                    //��ȡ���
                    function getLy(songerName,songName,songId,src){
                        jsonp({
                            url :"http://lp.music.ttpod.com/lrc/down",
                            data : {
                                lrcid : "",
                                artist : songerName,
                                title : songName,
                                song_id : songId
                            },//�����ֵ
                            callback : "callback",//�ص������֡�Ĭ��callback��
                            success : function(datas){
                                if(datas.code === 1){
                                    data.push({
                                        "name" : songName,
                                        "singer" : songerName,
                                        "src" : src,
                                        "lrc" : datas.data.lrc
                                    });
                                    var len = data.length;
                                    var newD = data[len-1]; //��ȡ���һ��������Ϣ
                                    n = len-1; //����
                                    //����Ĭ���б�
                                    var $li = document.createElement("li");
                                    var $a = document.createElement("a");
                                    $li.className = "active";
                                    $a.href = "javascript:void(0)";
                                    $a.innerHTML = newD.name;
                                    $li.appendChild($a);
                                    var allLi = $("s-lists").getElementsByTagName("li");
                                    for(var i=0;i<allLi.length;i++){
                                        allLi[i].classList.remove("active");
                                    }
                                    $("s-lists").appendChild($li);

                                    _this.clickLists(); //���³�ʼ���������
                                    $("countNum").innerHTML = len;
                                    $audio.src = newD.src;
                                    txt = newD.lrc;
                                    playBtn.classList.add("play");
                                    mark = false;
                                    _this.currentLrc();
                                    $audio.play();
                                    _this.load();
                                }else{
                                    alert("��ȡ���ŵ�ַʧ��");
                                }
                            }
                        });
                    }
                },

                //��Ƶ�ڵ����,������canvas��Ƶ
                analyserMus : function(){
                    var actx = new AudioContext(); //����һ�����ֶ���
                    // ����һ����Ƶ�ڵ�
                    var analyser = actx.createAnalyser();
                    //��������ý��Դ�ڵ�
                    var audioSrc = actx.createMediaElementSource($audio);
                    //��ý��Դ�ڵ��������������
                    audioSrc.connect(analyser);

                    //������������Ŀ������ӣ���������
                    analyser.connect(actx.destination);
                    var num = 100;
                    var can = $("canvasVoice");
                    var cxt = can.getContext("2d");
                    color = cxt.createLinearGradient(can.width*0.5,0,can.width*0.5,150);
                    color.addColorStop(0,"#00f");
                    color.addColorStop(0.5,"#f00");
                    color.addColorStop(1,"#0f0");
                    colorf = cxt.createLinearGradient(can.width*.5,150,can.width*.5,250);
                    colorf.addColorStop(0,"#0f0");
                    colorf.addColorStop(0.5,"#f00");
                    colorf.addColorStop(1,"#00f");
                    draw();
                    function draw(){
                        //����һ��������Ƶ�εȳ������� ���Զ�ת��Ϊ0-255֮������ӡ�
                        var voicehigh = new Uint8Array(analyser.frequencyBinCount);
                        //��������������Ƶ������ӵ���������
                        analyser.getByteFrequencyData(voicehigh);
                        //console.log(voicehigh);
                        var step = Math.round(voicehigh.length/num);
                        cxt.clearRect(0,0,can.width,can.height);
                        cxt.globalAlpha = 0.3;//͸����
                        cxt.beginPath();
                        for(var i=0;i<num;i++){
                            var value = (voicehigh[step*i])/2;
                            cxt.fillStyle = color;
                            cxt.fillRect(i*10+can.width*0.5,150,7,-value+1);
                            cxt.fillRect(can.width*0.5-(i-1)*10,150,7,-value+1);
                            cxt.fillStyle = colorf;
                            cxt.fillRect(i*10+can.width*0.5,150,7,value+1);
                            cxt.fillRect(can.width*0.5-(i-1)*10,150,7,value+1);
                        }
                        cxt.closePath();
                        requestAnimationFrame(draw);
                    }
                },
                templateLists : function(data){ //�����б�ģ��
                    var html = "";
                    for(var i = 0;i<data.length;i++){
                        html +=	'<li> '+
                            '	<a href="javascript:void(0)">'+data[i].name+'</a>'+
                            '</li>';
                    }
                    return html;
                }
            };
            function $(id){
                return document.getElementById(id);
            }
            String.prototype.trim=function(){ //ȥ�����ҿո�
                return this.replace(/(^\s*)|(\s*$)/g, "");
            }
            //����ʱ���ʽ
            function time(cTime){
                cTime = parseInt(cTime);
                //var h = formatData(Math.floor(cTime/3600));
                var m = formatData(Math.floor(cTime%3600/60));
                var s = formatData(Math.floor(cTime%60));
                return m+":"+s;
            }
            function formatData(num){
                return num < 10 ? "0"+num : ' '+num;
            }
            return jsons.init();
        };
        return music;
    })();
    window.myMusic = myMusic; // ���ؽӿڵ���
})();
