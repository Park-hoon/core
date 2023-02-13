//배경 랜덤으로 바꿔주기
var imgindex = ['pc배경화면_겨울풍경.png', 'pc배경화면_굴뚝.png', 'pc배경화면_눈사람.png', 'pc배경화면_붕어빵.png', 'pc배경화면_선물배달.png', 'pc배경화면_트리.png']
var imgnum = Math.floor(Math.random() * 6);
var img = imgindex[imgnum];
$('body').css("background-image", "url(./pc/"+img+")");
if(img == 'pc배경화면_눈사람.png' || img == 'pc배경화면_붕어빵.png'){
    $('div').css("color", "black");
    $('h1').css("color", "black");
}

var wnd;
var zh;
var skill;
var skarr = [];

$('#submit').click(function(){
    wnd = $('#wnd').val();
    zh = $('#zh').val();
    console.log('중 :'+wnd+'  코 :'+zh);
    skill = zh * 3 / wnd;
    $('#zhdj').empty();
    $('#zhdj').append('사용 스킬 수 : ');
    $('#zhdj').append(skill);
    //스킬 이름
    $('#skill_name').empty();
    for(i=0; i<skill; i++){
        $('#skill_name').append($('<input type="text" maxlength="1" id="'+"sk"+(i+1)+'" placeholder="'+(i+1)+"번째 스킬 이름"+'"class="sk">'));
        $('#skill_name').append(document.createElement('br'));
    }
    $('#skill_name').append($('<br><button id="sksubmit">입력</button>'));
    $('#sksubmit').click(addskarr);
    //스타일
    $("#skill").css("display","block");
});

// 스킬 배열
function addskarr (){
    skarr = [];
    for(i=1; i<=skill; i++){
        skarr.push($('#sk'+i).val());
    }
    const set = new Set(skarr);
    if(set.size != skarr.length){
        alert('중복된 스킬 이름을 확인해주세요');
    }else{
        if(confirm(skarr+' 의 값이 맞습니까?')){
            alert('스킬 이름에 맞게 보유중인 코어를 입력해주세요.');
            $('.sk').attr('disabled', 'disabled');
            $('#mycore').empty();
            $('#mycore').append($('<br><button id="add">추가하기</button>'));
            $('#add').click(addcore);
            $('#mycore').append($('<button id="del">삭제하기</button><br><br>'));
            $('#del').click(delcore);
            $('#mycore').append($('<br id="br"><button id="mycoresubmit">입력</button>'));
            $('#mycoresubmit').click(getcore);
            makesktable();
            //여기추가
            console.log(getCombination(skarr,3));
        }
        else{
            alert('다시 입력하세요.');
        }
    }
    //스타일
    $("#incore").css("display","block");
}

// 스킬로 dictionary 만들기
var skdic = {}
var coredic = {}

function makesktable(){
    skdic = {}
    for(i=0; i<skill; i++){
        skdic[skarr[i]] = 0;
        coredic[skarr[i]] = [];
    }
    console.log('skdic');
    console.log(skdic);
    console.log('coredic');
    console.log(coredic);
}

//코어 추가 빼기
var counter = 1;
function addcore(){
    var coreid = "core"+counter;
    var newinput = document.createElement('input');
    newinput.setAttribute('maxlength', '3');
    newinput.setAttribute("type", 'text');
    newinput.setAttribute('placeholder', '3글자만입력!');
    var coreid = "core"+counter;
    newinput.setAttribute('id', coreid);
    $('#br').before( $('<span class="count">'+counter+'. </span>'));
    $('#br').before(newinput);
    $("#br").before($('<br>'));
    counter++;
}
function delcore(){
    if(counter > 1){
        counter--;
        var coreid = "core"+counter;
        document.getElementById(coreid).previousElementSibling.remove();
        document.getElementById(coreid).nextElementSibling.remove();
        document.getElementById(coreid).remove();
    }
}

//보유 코어 리스트로 받기
var corearr=[]
function getcore(){
    corearr=[];
    for(i=1; i<counter; i++){
        var new_coreid='core'+i;
        var val = document.getElementById(new_coreid).value;
        var thiscore = val.split('');
        corearr.push(thiscore);
    }
    // 메인코어 분류별로 나누기
    classifycore();
    console.log('corearr');
    console.log(corearr);
    console.log('coredic');
    console.log(coredic);

    //스타일
    $("#end").css("display","block");
}

//      1.17
// 메인코어 분류별로 나누기
function classifycore(){
    for(i in coredic){
        coredic[i] = [];
    }
    for(i=0; i<corearr.length; i++){
        var maincore = corearr[i][0];
        coredic[maincore].push(corearr[i]);
    }
}

// 조합 만들기
//https://woong-jae.com/algorithm/220408-permutation-and-combination
function getCombination(elements, pick) {
    // 기저사례: 골라야 하는 길이가 1이면 각 원소가 조합이 된다.
    if(pick === 1) return elements.map(elem => [elem]);
    
    const combinations = [];
    // 각 원소에 남은 원소로 만들 수 있는 조합들을 붙인다.
    elements.forEach((element, index) => {
        // 만약 남은 원소의 길이가 골라야 하는 길이보다 짧으면 빈 배열이 반환되기 때문에 조합이 생성되지 않는다.
        const smallerCombinations = getCombination(elements.slice(index + 1), pick - 1);
        smallerCombinations.forEach(combination => {
            combinations.push([element].concat(combination));
        });
    });
    return combinations;
}

//중복체크
function checkMainCore(core){
    var temp = [];
    for(i in core){
        temp.push(core[i][0]);
    }
    var tpset = new Set(temp);
    if(tpset.size == core.length){
        return true;
    }
}

//2중첩 체크
function checkSameCore(core){
    for(i in core){
        if(skdic[core[i][0]] < wnd && skdic[core[i][1]] < wnd && skdic[core[i][2]] < wnd){
            skdic[core[i][0]]+=1;
            skdic[core[i][1]]+=1;
            skdic[core[i][2]]+=1;
        }else{
            for(a in skdic){
                skdic[a] = 0;
            }
            return false;
        }
    }
    return true;
}

//결과물
function coreEnd(){
    var coreCombination = getCombination(corearr,zh);
    for(c=0; c<coreCombination.length;c++){
        var cc = coreCombination[c];
        if(checkSameCore(cc) && checkMainCore(cc)){
            console.log('true');
            //출력
            $('#displayresult').empty();
            for(i in cc){
                document.getElementById('displayresult').innerHTML += (parseInt(i)+1)+'. ['+cc[i]+']';
                document.getElementById('displayresult').innerHTML += '<br>';
            }
            return true;
        }else{
            document.getElementById('displayresult').innerHTML = '없음';
            console.log('false');
        }
    }
}
////////////////////
$('#result').click(coreEnd);
