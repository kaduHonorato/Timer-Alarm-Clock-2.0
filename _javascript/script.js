// Variáveis criadas a partir de TAGS HTML

var tagPararAlarme = document.querySelector("#tagPararAlarme"); // Finaliza o cronômetro;
var tagsOpcTmp = document.querySelectorAll("input[name='opcTmp']"); // Seleciona entre o modo "alarme" e o modo "timer";

var tagTxtModo = document.querySelector("#tagTxtModo"); // Texto contido dentro da tag #tagTxtModo

var tagTxtAlarme = document.querySelector("#tagTxtAlarme"); // Texto contido dentro da tag #tagTxtAlarme
var tagTxtTimer = document.querySelector("#tagTxtTimer"); // Texto contido dentro da tag #tagTxtTimer


var tagsAcaoAlarme = document.querySelectorAll("input[name='acaoAlarme']"); // Seleciona entre o modo "reproduzir som" e o "modo abrir janela";  

var tagTxtAcao = document.querySelector("#tagTxtAcao"); // Texto contido dentro da tag #tagTxtAcao

var tagTxtSom = document.querySelector("#tagTxtSom"); // Texto contido dentro da tag #tagTxtSom
var tagTxtJanela = document.querySelector("#tagTxtJanela"); // Texto contido dentro da tag #tagTxtJanela
var tagTmpHor = document.querySelector("#tagTmpHor"); // Armazena o total de horas;
var tagTmpMin = document.querySelector("#tagTmpMin"); // Armazena o total de minutos;
var tagTmpSeg = document.querySelector("#tagTmpSeg"); // Armazena o total de segundos;
var tagTmpAtual = document.querySelector("#tagTmpAtual"); // Armazena o tempo atual do cronômetro;
var tagBtIniciaCrono = document.querySelector("#tagBtIniciaCrono"); // Botão que inicia o cronômetro;
var tagBtParaCrono = document.querySelector("#tagBtParaCrono"); // Botão que para o cronômetro;
var tagBtCancelaCrono = document.querySelector("#tagBtCancelaCrono"); // Botão que cancela o cronômetro;  
var tagTxtPararAlarme = document.querySelector("#tagTxtPararAlarme"); // Texto contido dentro da tag #tagTxtPararAlarme
var tagTxtUrlNovaJanela = document.querySelector("#tagTxtUrlNovaJanela"); // Texto contido dentro da tag #tagTxtUrlNovaJanela
var tagTxtBtSalvaUrl = document.querySelector("#tagTxtBtSalvaUrl"); // Texto contido dentro da tag #tagTxtBtSalvaUrl
var tagNovaUrl =  document.querySelector("#tagNovaUrl"); // armazena a url da nova janela;
var tagBtSalvaUrl =  document.querySelector("#tagBtSalvaUrl"); // botão que salva a url digitada; 
var tagsTxtTempo = document.querySelectorAll("#dvTagsTempo legend"); // Texto contido dentro das tags legend
var tagAlarme = document.querySelector("#tagAlarme"); // Armazena o arquivo de som que será tocado quando o cronômetro chegar ao fim;

// ========================================================================


// Variáveis Auxiliares

var alarmModeSel;
var opcTocaSom;
var cronometro;
var tmpCrono = 0;
var estadoTagsTempo;
var horarioEscolhido = new Date();
var horarioLimite;
var txtBtInicia = ["Iniciar","Continuar"]; 
var msgCancela = "A operação foi cancelada."; 
var msgAAtturl = "Url Atualizada!";
var urlNovaJanela;

// ==================================================================

 window.addEventListener("load",inicio);  

// Função Padrão de Início de código

function inicio(){


chegaDadosSalvos();

tagsOpcTmp[0].addEventListener("input",selecionaOpcCrono);
tagsOpcTmp[1].addEventListener("input",selecionaOpcCrono);

tagsAcaoAlarme[0].addEventListener("input",seleCionaAcaoCrono);
tagsAcaoAlarme[1].addEventListener("input",seleCionaAcaoCrono);

tagTmpHor.addEventListener("input",checaTagsTempo);
tagTmpMin.addEventListener("input",checaTagsTempo);
tagTmpSeg.addEventListener("input",checaTagsTempo);

tagNovaUrl.addEventListener("input",checaValidadeUrl); 
tagBtSalvaUrl.addEventListener("click",attUrl);

tagNovaUrl.value = urlNovaJanela;

checaIdiomaNavegador();
selecionaOpcCrono();
seleCionaAcaoCrono();
switchEstadoBts(tagBtCancelaCrono,true);



/*

zeraTagsTempo(tagTmpHor);
zeraTagsTempo(tagTmpMin);
zeraTagsTempo(tagTmpSeg);

*/


}

// ====================================================================

// Função que checa se já existem preferencias do usuário salvas no local storage e as carrega

function chegaDadosSalvos(){

var opcModo = (localStorage.getItem("opcModo") == null) ? 0 : parseInt(localStorage.getItem("opcModo"));
var opcAcao = (localStorage.getItem("opcAcao") == null) ? 0 : parseInt(localStorage.getItem("opcAcao"));
var hor = (localStorage.getItem("hor") == null) ? 0 : localStorage.getItem("hor");
var min = (localStorage.getItem("min") == null) ? 0 : localStorage.getItem("min");
var seg = (localStorage.getItem("seg") == null) ? 0 : localStorage.getItem("seg");
var url = (localStorage.getItem("url") == null) ? "https://google.com" : localStorage.getItem("url");

tagsOpcTmp[opcModo].checked = true;
tagsAcaoAlarme[opcAcao].checked = true;
tagTmpHor.value = hor;
tagTmpMin.value = min;
tagTmpSeg.value = seg;
urlNovaJanela = url;

}

// ==============================================================================================




// Função que checa o idioma do navegador e muda o idioma de alguns elementos da página conforme o resultado 

function checaIdiomaNavegador(){

if(navigator.language != "pt-BR" && navigator.language != "pt-PT"){

tagTxtPararAlarme.innerHTML = "Stop Alarm";


tagTxtModo.innerHTML = "Mode";
tagTxtAlarme.innerHTML = "Alarm Clock";
tagTxtTimer.innerHTML  = "Timer"; 

tagTxtAcao.innerHTML = "Action";
tagTxtSom.innerHTML = "Play a tune";
tagTxtJanela.innerHTML = "Open a window";

tagsTxtTempo[0].innerHTML = "Hours";
tagsTxtTempo[1].innerHTML = "Minutes";
tagsTxtTempo[2].innerHTML = "Seconds";

txtBtInicia = ["Start","Resume"];

tagBtParaCrono.innerHTML = "Pause";
tagBtCancelaCrono.innerHTML = "Cancel";

tagTxtUrlNovaJanela.innerHTML = "New Window Url";
tagTxtBtSalvaUrl.innerHTML = "Save Url";

msgAAtturl = "The Url has been updated!";
msgCancela = "The operation has been canceled.";

}

tagBtIniciaCrono.innerHTML = txtBtInicia[0];

}


// =============================================================================================================



// Função que verifica qual "modo" do cronômetro está selecionado. Alarme ou timer;

function selecionaOpcCrono(){

if(this.value != undefined)
    checaTagSel("opcModo",tagsOpcTmp);


alarmModeSel = (tagsOpcTmp[0].checked) ? true : false;
        
if(alarmModeSel)
    tagTmpHor.max = 23;
else
    tagTmpHor.max = 100;
            
     
    checaEstadoTagsRadio(tagsOpcTmp);
    checaTagsTempo();
    
}


// ====================================================================================



// Função que verifica qual "ação" deve ser realizada quando o cronômetro for zerado. Tocar um som ou abrir uma janela;

function seleCionaAcaoCrono(){

if(this.value != undefined)
    checaTagSel("opcAcao",tagsAcaoAlarme);

opcTocaSom = (tagsAcaoAlarme[0].checked) ? true : false;

checaEstadoTagsRadio(tagsAcaoAlarme);

}

// ====================================================================================

// Função que verifica qual TAG está selecionada


function checaTagSel(nomeVar,tag){

var valTagSel;

for(var x = 0; x < tag.length; x++){

if(tag[x].checked){
    valTagSel = tag[x].value; 
    break;
    }

}    

atualizaPreferenciaUser(nomeVar,valTagSel);

}

// =====================================================================================


// Função que salva no local Storage as preferencias do usuário  

function atualizaPreferenciaUser(chave,valor){

localStorage.setItem(chave,valor);

}

// =======================================================================================


// Função que checa se a url digitada é válida

function checaValidadeUrl(){

if(tagNovaUrl.checkValidity())
    switchEstadoBts(tagBtSalvaUrl,false);
 else
    switchEstadoBts(tagBtSalvaUrl,true);


}

// ======================================================================================



// Função que atualiza a url da nova janela 

function attUrl(){

urlNovaJanela = tagNovaUrl.value;

atualizaPreferenciaUser("url",urlNovaJanela);


alert(msgAAtturl);

}

// ========================================================================================



// Função que checa se as TAGS radio estão selecionadas ou não e as formata de acordo com o resultado   


function checaEstadoTagsRadio(tag){

    for(var x = 0; x < tag.length; x++){
    
    
    if(tag[x].parentElement.getAttribute("class","eleDesativado"))
    tag[x].parentElement.classList.remove("eleDesativado");
        
    
    if(tag[x].checked){
       
    tag[x].parentElement.classList.add("eleSelecionado");
    if(tag[x].parentElement.getAttribute("class","eleNaoSelecionado"))
    tag[x].parentElement.classList.remove("eleNaoSelecionado");
    
    
    
    }else{
    
    
    tag[x].parentElement.classList.add("eleNaoSelecionado");
    if(tag[x].parentElement.getAttribute("class","eleSelecionado"))
    tag[x].parentElement.classList.remove("eleSelecionado");
    
    
    }

    }
    
    }


// =======================================================================================================



// Função que zera o valor da tag passada como parâmetro


function zeraTagsTempo(tag){

tag.value = 0;

}

// ====================================================


// Funçao que desabilita ou habilita a tag passada como parâmetro 

function switchTagsTempo(tag,chave){

tag.disabled = chave;
        
}

// ==============================================================


// Função que valida os valores contidos nas TAGS de tempo 

function checaTagsTempo(){


var tagsTempo = [tagTmpHor,tagTmpMin,tagTmpSeg];
 

for(var x = 0; x < tagsTempo.length; x++){

    estadoTagsTempo = (tagsTempo[x].checkValidity());

    
    if(!(estadoTagsTempo))
        break;

}


if(estadoTagsTempo){

atualizaPreferenciaUser("hor",tagsTempo[0].value);
atualizaPreferenciaUser("min",tagsTempo[1].value);
atualizaPreferenciaUser("seg",tagsTempo[2].value);

}

if(!(alarmModeSel))
    addTmpCrono();

checaTmpeModo();

}

// =============================================================================


// Função que adiciona os valores contidos nas tags de tampo à variável tmpCrono; 

function addTmpCrono(){

tmpCrono =  parseInt((tagTmpHor.value * 3600)) + parseInt((tagTmpMin.value * 60)) + parseInt((tagTmpSeg.value));

}


// ===========================================================================


// Função que configura o alarme caso o modo alarme esteja ativado

function configAlarme(){

    horarioEscolhido.setHours(tagTmpHor.value);
    horarioEscolhido.setMinutes(tagTmpMin.value);
    horarioEscolhido.setSeconds(tagTmpSeg.value);  
    
    horarioLimite = new Date();
        
    var segsHorarioEscolhido = (horarioEscolhido.getHours() * 3600) + (horarioEscolhido.getMinutes() * 60) + (horarioEscolhido.getSeconds());
    var segsHorarioLimite = (horarioLimite.getHours() * 3600) + (horarioLimite.getMinutes() * 60) + (horarioLimite.getSeconds());
    
    if(segsHorarioEscolhido >= segsHorarioLimite)
        tmpCrono = segsHorarioEscolhido - segsHorarioLimite;
    else
        tmpCrono = (segsHorarioEscolhido + (3600 * 24)) - segsHorarioLimite;
  

}


// ====================================================================


// Função que checa o valor de tmpCrono e qual modo do alarme está selecionado

function checaTmpeModo(){


switchEstadoBts(tagBtIniciaCrono,(
                                  !(
                                    ((tmpCrono > 0) || (alarmModeSel)) && (estadoTagsTempo)
                                   )
                                 )
               );


}

// ==========================================================================

 

tagBtIniciaCrono.addEventListener("click",function(){

    switchBtsCrono(this,tagBtParaCrono);
    desabilitaElementos();
    iniciaCrono();
 

});


tagBtParaCrono.addEventListener("click",function(){

tagBtIniciaCrono.innerHTML = txtBtInicia[1];

switchBtsCrono(this,tagBtIniciaCrono);
   
paraCrono();
     
});


// Função que inverte a visibilidade dos botões passados como parâmetro

function switchBtsCrono(tag1,tag2){

var classesBt = tag1.getAttribute("class") + " " + "ghost";

tag1.setAttribute("class",classesBt);

if(tag2.hasAttribute("class","ghost"))
tag2.classList.remove("ghost");

}

// ======================================================================


tagBtCancelaCrono.addEventListener("click",function(){
   

    window.clearInterval(cronometro);
    alert(msgCancela);
    switchBtsCrono(tagBtParaCrono,tagBtIniciaCrono);
    finalizaCrono();
 
 });

// Função que para o cronômetro

 function paraCrono(){

    window.clearInterval(cronometro);
    
}

// ===================================


// Função que desabilita elementos

function desabilitaElementos(){


    switchEstadoBts(tagsOpcTmp[0],true);
    switchEstadoBts(tagsOpcTmp[1],true);
    
    
    tagsOpcTmp[0].parentElement.setAttribute("class","fundoCinza2 eleDesativado");
    tagsOpcTmp[1].parentElement.setAttribute("class","fundoCinza2 eleDesativado");
    
    switchEstadoBts(tagsAcaoAlarme[0],true);
    switchEstadoBts(tagsAcaoAlarme[1],true);
    
    tagsAcaoAlarme[0].parentElement.setAttribute("class","fundoCinza2 eleDesativado");
    tagsAcaoAlarme[1].parentElement.setAttribute("class","fundoCinza2 eleDesativado");
    
    
    switchTagsTempo(tagTmpHor,true);
    switchTagsTempo(tagTmpMin,true);
    switchTagsTempo(tagTmpSeg,true);
    switchEstadoBts(tagBtCancelaCrono,false);
    

    switchEstadoBts(tagBtSalvaUrl,true);
 
    if(alarmModeSel){
        switchEstadoBts(tagBtParaCrono,true);
        setTimeout(configAlarme,1000);

        }else
            switchEstadoBts(tagBtParaCrono,false);

        
}

// =======================================================================


// Função que cria o intervalo do cronômetro

function iniciaCrono(){

cronometro = window.setInterval(attCrono,1000);
    
}

// =========================================================


// Função que atualiza o cronômetro 

function attCrono(){

if(tmpCrono == 0){

        window.clearInterval(cronometro);
              
        tagPararAlarme.setAttribute("class","eleAtivado");
        tagPararAlarme.addEventListener("click",pausaAlarme);
        switchEstadoBts(tagBtIniciaCrono,true);
        switchEstadoBts(tagBtParaCrono,true);
        switchEstadoBts(tagBtCancelaCrono,true);    



        if(opcTocaSom)       
            tocaAlarme(); 
        else 
            abreJanela();    
      

    

}else{

    tmpCrono--;
   

var horas = ((tmpCrono - (tmpCrono % 3600)) / 3600);
var minutos = ((tmpCrono - (tmpCrono % 60)) / 60) - (horas * 60);
var segundos = (tmpCrono % 60);
tagTmpAtual.innerHTML = addZero(horas) + ":" + addZero(minutos) + ":" + addZero(segundos);     

}  

}

// ========================================================

// Função que adiciona um zero aos valores menores que dez 

function addZero(val){

if(val < 10)
val = "0" + val;

return val;

}

// ==============================================================


// Função que reproduz o som do alarme

function tocaAlarme(){


tagAlarme.play();

}

// ================================================

// Função que pausa o alarme reativa uns elementos e desativa outros

function pausaAlarme(){

tagAlarme.pause();
tagAlarme.currentTime = 0;
finalizaCrono();
switchBtsCrono(tagBtParaCrono,tagBtIniciaCrono);
switchEstadoBts(tagBtIniciaCrono,false);
switchEstadoBts(tagBtParaCrono,false);
tagPararAlarme.removeEventListener("click",finalizaCrono);
tagPararAlarme.setAttribute("class","eleDesativado");

}

// ===============================================================


// Função que finaliza o cronômetro

function finalizaCrono(){

switchTagsTempo(tagTmpHor,false);    
switchTagsTempo(tagTmpMin,false);
switchTagsTempo(tagTmpSeg,false);

switchEstadoBts(tagsOpcTmp[0],false);
switchEstadoBts(tagsOpcTmp[1],false);

switchEstadoBts(tagsAcaoAlarme[0],false);
switchEstadoBts(tagsAcaoAlarme[1],false);

switchEstadoBts(tagBtCancelaCrono,true);  

checaValidadeUrl();

tagBtIniciaCrono.innerHTML = txtBtInicia[0];

tagTmpAtual.innerHTML = "00:00:00"; 

checaEstadoTagsRadio(tagsOpcTmp);

checaEstadoTagsRadio(tagsAcaoAlarme);
checaTagsTempo();

}


// =====================================================================


function switchEstadoBts(bt,chave){

bt.disabled = chave;

}


function abreJanela(){

var Novajanela = window.open(urlNovaJanela,"_blank","width=900,height=500");    



}


