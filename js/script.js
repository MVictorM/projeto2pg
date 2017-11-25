//Ações abrir e fechar menu
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

jQuery( "#submit" ).click(function() {
    if(validarEnvioArquivos()) {
    }
});

function validarEnvioArquivos() {
    if (jQuery('#camera').get(0).files.length === 0 ||
        jQuery('#objeto').get(0).files.length === 0 ||
        jQuery('#textura').get(0).files.length === 0) {
        return false
    }
    return true
}