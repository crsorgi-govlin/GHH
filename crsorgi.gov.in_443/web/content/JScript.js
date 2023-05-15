
// JScript File
//-- Block right click

//document.oncontextmenu = function(){return false}
//document.ondragstart = function(){return false}
//document.onselectstart = function(){return true}

function ProceedDesignation(rd0, txt) {

    var oRadio = document.forms[0].elements[rd0];
    for (var i = 0; i < oRadio.length; i++) {

        if (oRadio[i].checked && oRadio[i].value == "5") {
            document.getElementById(txt).style.display = 'block';
        }
        else {
            document.getElementById(txt).style.display = 'none';
        }
    }
}

//Modified by nazim on date 04/06/2013 to make some field mendetory for gujarat
function RegPaymentHandle(rd0, tblCash, tblDraft, tblChal) {

    var oRadio = document.forms[0].elements[rd0];
    ValidatorEnable(document.getElementById('ctl00_content_RQ_BBCD'), false);
    ValidatorEnable(document.getElementById('ctl00_content_RQ_CFMHD'), false);
    ValidatorEnable(document.getElementById('ctl00_content_RQ_DDOCD'), false);
    ValidatorEnable(document.getElementById('ctl00_content_rqvDt'), false);
    ValidatorEnable(document.getElementById('ctl00_content_RQ_TCN'), false);
    ValidatorEnable(document.getElementById('ctl00_content_RQ_GSBHD'), false);
    ValidatorEnable(document.getElementById('ctl00_content_RQ_MH'), false);
    ValidatorEnable(document.getElementById('ctl00_content_RQ_SMH'), false);
    ValidatorEnable(document.getElementById('ctl00_content_RQ_SBHD'), false);
    for (var i = 0; i < oRadio.length; i++) {

        if (oRadio[i].checked && oRadio[i].value == "2") {
            if (document.getElementById('ctl00_content_hdnstate').value == "MP") {
                document.getElementById('ctl00_content_Tr_Cash').style.display = 'none';
            } else {
                document.getElementById('ctl00_content_Tr_Cash').style.display = 'block';
            }
            document.getElementById(tblDraft).style.display = 'none';
            document.getElementById(tblChal).style.display = 'none';
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator5'), false);
            if (document.getElementById('ctl00_content_hdnstate').value == "UP") {
                ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator5'), true);
            }
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator3'), false);
            if (document.getElementById('ctl00_content_hdnstate').value == "HI") {
                ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator3'), true);
            }

            // Drafttt
            ValidatorEnable(document.getElementById('ctl00_content_RangeValidator1'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator22'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator23'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator24'), false);

            // Challan
            //ValidatorEnable(document.getElementById('ctl00_content_RV_chno'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_BBCD'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_CFMHD'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_DDOCD'), false);
            ValidatorEnable(document.getElementById('ctl00_content_rqvDt'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_TCN'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_GSBHD'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_MH'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_SMH'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_SBHD'), false);
            //ValidatorEnable('ctl00_content_RangeValidator1', false);



        }
        else if (oRadio[i].checked && oRadio[i].value == "1") {
            document.getElementById(tblCash).style.display = 'none';
            document.getElementById(tblDraft).style.display = 'block';
            document.getElementById(tblChal).style.display = 'none';
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator5'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator3'), false);

            // Drafttt
            ValidatorEnable(document.getElementById('ctl00_content_RangeValidator1'), true);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator22'), true);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator23'), true);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator24'), true);
            document.getElementById('ctl00_content_RangeValidator1').style.display = 'none';
            document.getElementById('ctl00_content_RequiredFieldValidator22').style.display = 'none';
            document.getElementById('ctl00_content_RequiredFieldValidator23').style.display = 'none';
            document.getElementById('ctl00_content_RequiredFieldValidator24').style.display = 'none';
            // Challan
            //ValidatorEnable(document.getElementById('ctl00_content_RV_chno'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_BBCD'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_CFMHD'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_DDOCD'), false);
            ValidatorEnable(document.getElementById('ctl00_content_rqvDt'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_TCN'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_GSBHD'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_MH'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_SMH'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RQ_SBHD'), false);
        }
        else if (oRadio[i].checked && oRadio[i].value == "3") {
            document.getElementById(tblCash).style.display = 'none';
            document.getElementById(tblDraft).style.display = 'none';
            document.getElementById(tblChal).style.display = 'block';
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator5'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator3'), false);


            // Drafttt
            ValidatorEnable(document.getElementById('ctl00_content_RangeValidator1'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator22'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator23'), false);
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator24'), false);
            //             alert(document.getElementById('ctl00_content_hdnstate').value);
            if (document.getElementById('ctl00_content_hdnstate').value == "GJ") {
                // Challan
                //ValidatorEnable(document.getElementById('ctl00_content_RV_chno'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_BBCD'), false);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_CFMHD'), false);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_DDOCD'), false);
                ValidatorEnable(document.getElementById('ctl00_content_rqvDt'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_TCN'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_GSBHD'), false);
                ValidatorEnable(document.getElementById('ctl00_content_rqrd_mnrhd'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_MH'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_SMH'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_SBHD'), true);

                document.getElementById('ctl00_content_RQ_BBCD').style.display = 'none';
                document.getElementById('ctl00_content_RQ_CFMHD').style.display = 'none';
                document.getElementById('ctl00_content_RQ_DDOCD').style.display = 'none';
                document.getElementById('ctl00_content_RQ_GSBHD').style.display = 'none';
                document.getElementById('ctl00_content_rqrd_mnrhd').style.display = 'block';

                document.getElementById('ctl00_content_SPN_BCD').style.display = 'none';
                document.getElementById('ctl00_content_SPN_CFMH').style.display = 'none';
                document.getElementById('ctl00_content_SPN_DDOCD').style.display = 'none';
                document.getElementById('ctl00_content_spn_Grpshd').style.display = 'none';
                document.getElementById('ctl00_content_SPN_MNRHD').style.display = 'block';


                // document.getElementById('ctl00_content_RequiredFieldValidator32').style.display = 'none';

                //                 SPN_BCD.Visible = false;
                //                 RQ_BBCD.Enabled = false;
                //                 SPN_CFMH.Visible = false;
                //                 RQ_CFMHD.Enabled = false;
                //                 SPN_DDOCD.Visible = false;
                //                 RQ_DDOCD.Enabled = false;
                //                 SPN_ISSUEDATE.Visible = false;
                //                 rqvDt.Enabled = false;
                //                 SPN_TCN.Visible = false;
                //                 RQ_TCN.Enabled = false;
                //                 spn_Grpshd.Visible = false;
                //                 RQ_GSBHD.Enabled = false;
                //                 SPN_MNRHD.Visible = true;
                //                 rqrd_mnrhd.Enabled = true;

                //                 RQ_BBCD.Enabled = false;
                //                 RQ_CFMHD.Enabled = false;
                //                 RQ_DDOCD.Enabled = false;
                //                 rqvDt.Enabled = false;
                //                 RQ_TCN.Enabled = false;
                //                 RQ_GSBHD.Enabled = false;
                //                 RQ_MH.Enabled = false;
                //                 RQ_SMH.Enabled = false;
                //                 RQ_SBHD.Enabled = false;

            }
            else {
                // Challan
                //ValidatorEnable(document.getElementById('ctl00_content_RV_chno'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_BBCD'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_CFMHD'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_DDOCD'), true);
                ValidatorEnable(document.getElementById('ctl00_content_rqvDt'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_TCN'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_GSBHD'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_MH'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_SMH'), true);
                ValidatorEnable(document.getElementById('ctl00_content_RQ_SBHD'), true);
                //document.getElementById('ctl00_content_RV_chno').style.display = 'none';
                document.getElementById('ctl00_content_RQ_BBCD').style.display = 'none';
                document.getElementById('ctl00_content_RQ_CFMHD').style.display = 'none';
                document.getElementById('ctl00_content_RQ_DDOCD').style.display = 'none';
                document.getElementById('ctl00_content_rqvDt').style.display = 'none';
                document.getElementById('ctl00_content_RQ_TCN').style.display = 'none';
                document.getElementById('ctl00_content_RQ_GSBHD').style.display = 'none';
                document.getElementById('ctl00_content_RQ_MH').style.display = 'none';
                document.getElementById('ctl00_content_RQ_SMH').style.display = 'none';
                document.getElementById('ctl00_content_RQ_SBHD').style.display = 'none';

            }
            //ValidatorEnable('ctl00_content_RangeValidator1', false);

        }
    }
}
// END Modified by nazim on date 04/06/2013 to make some field mendetory for gujarat



function RegElectric(rd0, tblEle) {

    var oRadio = document.forms[0].elements[rd0];
    for (var i = 0; i < oRadio.length; i++) {

        if (oRadio[i].checked && oRadio[i].value == "Y") {
            document.getElementById(tblEle).style.display = 'block';
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator2'), true);
            document.getElementById('ctl00_content_RequiredFieldValidator2').style.display = 'none';
        }
        else if (oRadio[i].checked && oRadio[i].value == "N") {
            document.getElementById(tblEle).style.display = 'none';
            ValidatorEnable(document.getElementById('ctl00_content_RequiredFieldValidator2'), false);
        }
    }
}


function ProceedKindofBusiness(chk) {

    var len = document.getElementsByTagName('input').length;
    for (var i = 0; i < len; i++) {
        chkKindofBusiness
        if (oRadio[i].checked && oRadio[i].value == "5") {
            document.getElementById(txt).style.display = 'block';
        }
        else {
            document.getElementById(txt).style.display = 'none';
        }
    }
}

function getCheckBoxListItemsChecked(elementId) {
    var elementRef = document.getElementById(elementId);
    alert(elementId);
    alert(elementRef);
    var checkBoxArray = elementRef.getElementsByTagName('input');
    var checkedValues = '';

    for (var i = 0; i < checkBoxArray.length; i++) {
        var checkBoxRef = checkBoxArray[i];

        if (checkBoxRef.checked == true) {
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // AFAIK, you cannot get the value property of a ListItem in a CheckBoxList.
            // You can only get the Text property, which will be in an HTML label element.
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var labelArray = checkBoxRef.parentNode.getElementsByTagName('label');

            if (labelArray.length > 0) {
                if (checkedValues.length > 0)
                    checkedValues += ', ';

                checkedValues += labelArray[0].innerHTML;
            }
        }
    }

    return checkedValues;
}

function readCheckBoxList() {
    var checkedItems = getCheckBoxListItemsChecked('ctl00$content$chkKindofBusiness$');
    alert('Items checked: ' + checkedItems);
}

function ViewBusinessOnPrecheck() {
    var PreState = document.getElementById("ctl00_content_ddlPreState");
    var tbl_Detals1 = document.getElementById("ctl00_content_tblHeadOff");
    if (PreState.value == "0") {
        document.getElementById('ctl00_content_tblHeadOff').style.display = 'none';
        document.getElementById('ctl00_content_tr_Q2').style.display = 'none';
        document.getElementById('ctl00_content_tr_Q3').style.display = 'none';
        document.getElementById('ctl00_content_tr_Q4').style.display = 'none';
        document.getElementById('ctl00_content_tr_Q5').style.display = 'none';
        document.getElementById('ctl00_content_tbl_Detals').style.display = 'none';
        document.getElementById('ctl00_content_rdoHeadQ1_0').checked = false;
        document.getElementById('ctl00_content_rdoHeadQ1_1').checked = false;
    }
    else {
        document.getElementById('ctl00_content_tblHeadOff').style.display = 'block';
        document.getElementById('ctl00_content_tr_Q2').style.display = 'none';
        document.getElementById('ctl00_content_tr_Q3').style.display = 'none';
        document.getElementById('ctl00_content_tr_Q4').style.display = 'none';
        document.getElementById('ctl00_content_tr_Q5').style.display = 'none';
        document.getElementById('ctl00_content_tbl_Detals').style.display = 'none';
        document.getElementById('ctl00_content_rdoHeadQ1_0').checked = false;
        document.getElementById('ctl00_content_rdoHeadQ1_1').checked = false;
    }
}


function hideOFBO(chkFBO, tblfbo) {
    if (document.getElementById(chkFBO).checked)
        document.getElementById(tblfbo).style.display = 'block';
    else {
        document.getElementById(tblfbo).style.display = 'none';
    }
}

function HeadOfficeDicision(rdoStorageExcepthead, tr_CapStorageE, rdoStorageE) {
    var oRadio = document.forms[0].elements[rdoStorageExcepthead];
    for (var i = 0; i < oRadio.length; i++) {

        if (oRadio[i].checked && oRadio[i].value == "Y") {
            document.getElementById(tr_CapStorageE).style.display = 'none';
        }

        if (oRadio[i].checked && oRadio[i].value == "N") {
            document.getElementById(tr_CapStorageE).style.display = 'block';
        }
    }

    var oRadio = document.forms[0].elements[rdoStorageE];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
}

function hideOFBOMainChk(chkStorageE, Tr_StorageE, tr_headStorageE, tr_StorageEFA, CapStorageE, rdoStorageExcept, rdoStorageExcepthead, rdoStorageExceptFA, rdoStorageE) {

    if (document.getElementById(chkStorageE).checked) {
        document.getElementById(Tr_StorageE).style.display = 'block';
        document.getElementById(tr_headStorageE).style.display = 'none';
        document.getElementById(tr_StorageEFA).style.display = 'none';
        document.getElementById(CapStorageE).style.display = 'block';
    }
    else {
        document.getElementById(Tr_StorageE).style.display = 'none';
        document.getElementById(tr_headStorageE).style.display = 'none';
        document.getElementById(tr_StorageEFA).style.display = 'none';
        document.getElementById(CapStorageE).style.display = 'none';
    }
    var oRadio = document.forms[0].elements[rdoStorageExcept];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rdoStorageExcepthead];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rdoStorageExceptFA];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rdoStorageE];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
}

function hideSlaughter(chkSlaughter, tblSlaughter, tblLarge, tblSmall, tblPoultry, chkLarge, chkSmall, chkPoultry, rdoLarge, rdoSmall, rdoBirds) {
    if (document.getElementById(chkSlaughter).checked) {
        document.getElementById(tblSlaughter).style.display = 'block';
        document.getElementById(tblLarge).style.display = 'none';
        document.getElementById(tblSmall).style.display = 'none';
        document.getElementById(tblPoultry).style.display = 'none';
    }
    else {
        document.getElementById(tblSlaughter).style.display = 'none';
        document.getElementById(tblLarge).style.display = 'block';
        document.getElementById(tblSmall).style.display = 'block';
        document.getElementById(tblPoultry).style.display = 'block';
    }
    document.getElementById(chkLarge).checked = false;
    document.getElementById(chkSmall).checked = false;
    document.getElementById(chkPoultry).checked = false;
    var oRadio = document.forms[0].elements[rdoLarge];
    for (var i = 0; i < oRadio.length; i++) {
        if (oRadio[i].checked) {
            alert(oRadio[i].value);
            oRadio[i].checked = false;
        }
    }
    var oRadio = document.forms[0].elements[rdoSmall];
    for (var i = 0; i < oRadio.length; i++) {
        if (oRadio[i].checked) {
            alert(oRadio[i].value);
            oRadio[i].checked = false;
        }
    }
    var oRadio = document.forms[0].elements[rdoBirds];
    for (var i = 0; i < oRadio.length; i++) {
        if (oRadio[i].checked) {
            //alert(oRadio[i].value);
            oRadio[i].checked = false;
        }
    }
}

function hideSlaughter1(chkSlaughter, tblSlaughter, chkLarge, chkSmall, chkPoultry) {
    if (document.getElementById(chkSlaughter).checked) {
        document.getElementById(tblSlaughter).style.display = 'block';
    }
    else {
        document.getElementById(tblSlaughter).style.display = 'none';
    }
    document.getElementById(chkLarge).checked = false;
    document.getElementById(chkSmall).checked = false;
    document.getElementById(chkPoultry).checked = false;
}

function hideOil(a, element) {

    if (document.getElementById(a).checked)
        document.getElementById(element).style.display = 'block';
    else {
        document.getElementById(element).style.display = 'none';
    }
}


function hide(a, element, b, c) {

    if (document.getElementById(a).checked)
        document.getElementById(element).style.display = 'block';
    else {
        document.getElementById(element).style.display = 'none';
        if (b != null) {
            document.getElementById(b).checked = false;
        }
        var oRadio = document.forms[0].elements[c];
        for (var i = 0; i < oRadio.length; i++) {
            if (oRadio[i].checked) {
                //alert(oRadio[i].value);
                oRadio[i].checked = false;
            }
        }
    }
}

function hide_veg(a, element) {

    if (document.getElementById(a).checked)
        document.getElementById(element).style.display = 'block';
    else
        document.getElementById(element).style.display = 'none';
}
function hideOFBOMainChkStorage(chkStorageE, Tr_StorageE, tr_headStorageE, tr_StorageEFA, CapStorageE, rdoStorageExcept, rdoStorageExcepthead, rdoStorageExceptFA, rdoStorageE, tr_state, rdoStorageExceptPort) {

    if (document.getElementById(chkStorageE).checked) {
        document.getElementById(Tr_StorageE).style.display = 'block';
        document.getElementById(tr_headStorageE).style.display = 'none';
        document.getElementById(tr_StorageEFA).style.display = 'none';
        document.getElementById(CapStorageE).style.display = 'none';
        document.getElementById(tr_state).style.display = 'none';
    }
    else {
        document.getElementById(Tr_StorageE).style.display = 'none';
        document.getElementById(tr_headStorageE).style.display = 'none';
        document.getElementById(tr_StorageEFA).style.display = 'none';
        document.getElementById(CapStorageE).style.display = 'none';
        document.getElementById(tr_state).style.display = 'none';
    }

    var oRadio = document.forms[0].elements[rdoStorageExceptPort];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }

    var oRadio = document.forms[0].elements[rdoStorageExcept];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rdoStorageExcepthead];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rdoStorageExceptFA];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rdoStorageE];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
}

function PortDicision(rd0, tr1, rd1, tr2, rd2, tr3, rd3, tr4, rd4) {

    var oRadio = document.forms[0].elements[rd0];
    for (var i = 0; i < oRadio.length; i++) {


        if (oRadio[i].checked && oRadio[i].value == "N") {
            document.getElementById(tr3).style.display = 'none';
            document.getElementById(tr1).style.display = 'none';
            document.getElementById(tr2).style.display = 'none';
            document.getElementById(tr4).style.display = 'block';
        }
        if (oRadio[i].checked && oRadio[i].value == "Y") {
            document.getElementById(tr3).style.display = 'none';
            document.getElementById(tr1).style.display = 'none';
            document.getElementById(tr2).style.display = 'none';
            document.getElementById(tr4).style.display = 'none';
        }

    }

    var oRadio = document.forms[0].elements[rd1];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rd2];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rd3];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }

    var oRadio = document.forms[0].elements[rd4];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
}


function StateDicision(rd0, tr1, rd1, tr2, rd2, tr3, rd3) {

    var oRadio = document.forms[0].elements[rd0];
    for (var i = 0; i < oRadio.length; i++) {

        if (oRadio[i].checked && oRadio[i].value == "Y") {
            document.getElementById(tr3).style.display = 'none';
            document.getElementById(tr1).style.display = 'block';
            document.getElementById(tr2).style.display = 'none';
        }

        if (oRadio[i].checked && oRadio[i].value == "N") {
            document.getElementById(tr3).style.display = 'block';
            document.getElementById(tr1).style.display = 'none';
            document.getElementById(tr2).style.display = 'none';
        }
    }

    var oRadio = document.forms[0].elements[rd1];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rd2];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
    var oRadio = document.forms[0].elements[rd3];
    for (var i = 0; i < oRadio.length; i++) {
        oRadio[i].checked = false;
    }
}


function check(e) {
    var keynum
    var keychar
    var numcheck
    // For Internet Explorer  
    if (window.event) {
        keynum = e.keyCode
    }
        // For Netscape/Firefox/Opera  
    else if (e.which) {
        keynum = e.which
    }
    keychar = String.fromCharCode(keynum)
    //List of special characters you want to restrict
    if (keychar.match(/[!,@,#,$,%,^,*,?,~,-,+,<,>,`,'']/g)) {

        return false;
    }
    else {
        return true;
    }
}

function convertTomd5() {
    if (document.forms[0].ctl00$txtpwd.value != "" && document.forms[0].ctl00$txtuid.value != "") {
        var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        var randomstring1 = '';

        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        for (var j = 0; j < string_length; j++) {
            var rnum1 = Math.floor(Math.random() * chars.length);
            randomstring1 += chars.substring(rnum1, rnum1 + 1);
        }        
        //function changed by satyabir for MD5Flag encryption on Dated:08/09/2014 and Modified on :--///////////
        if (document.forms[0].ctl00$Hdn_md5.value != "Y") {
            var hash = CryptoJS.HmacSHA256(document.forms[0].ctl00$txtpwd.value, document.forms[0].challenge.value);
            var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);            
            var hash1 = CryptoJS.HmacSHA256(hashInBase64, document.forms[0].ctl00$Hdn_seckey.value);
            var hashInBase641 = CryptoJS.enc.Base64.stringify(hash1);
            //alert(hashInBase64);
            //alert(hashInBase641);
            //alert(document.forms[0].ctl00$Hdn_seckey.value);
            //alert(document.forms[0].ctl00$txtpwd.value);
            document.forms[0].ctl00$fssai.value = hashInBase641;
            document.forms[0].ctl00$txtpwd.value = randomstring + randomstring1;
            //document.forms[0].ctl00$Hdn_md5.value = "";
            //document.forms[0].ctl00$Hdn_seckey.value = "";
            //document.forms[0].ctl00$fssai.value = randomstring + hashInBase64 + randomstring1;
            //document.forms[0].ctl00$txtpwd.value = randomstring + randomstring + randomstring + randomstring;
        }
        else {
            // End/////////////////////////////////////////////////////////////////////////////////////////////
            var passstring = hex_hmac_md5(document.forms[0].ctl00$txtpwd.value, document.forms[0].challenge.value);
            document.forms[0].ctl00$fssai.value = randomstring + passstring + randomstring1;
            document.forms[0].ctl00$txtpwd.value = randomstring + randomstring + randomstring + randomstring;
        }
        return true;
    }
    else {
        alert("Please enter Userid and Password.");

        return false;
    }
}

//Registration Relaed method

function convertTomd51() {

    var Name = document.forms[0].txtFBOName.value;
    var Company = document.forms[0].txtCompany.value;
    var Mobile = document.forms[0].txtMobile.value;
    var Email = document.forms[0].txtEmail.value;
    var State = document.forms[0].ddlState.value;
    var District = document.forms[0].ddlDistrict.value;
    var Pin = document.forms[0].txtPin.value;
    var Uid = document.forms[0].txtuid.value;
    var Pwd = document.forms[0].txtpwd.value;
    var ConPwd = document.forms[0].txtConfirm.value;
    var SecQ = document.forms[0].ddlQuest.value;
    var SecA = document.forms[0].txtSecAns.value;

    if (Name != "" && Email != "To receive alert on Email" && Company != "" && Mobile != "To receive alert on Mobile" && Uid != "" && Pwd != ""
       && State != "0" && ConPwd != "" && District != "0" && SecQ != "0" && Pin != "" && SecA != "") {
        if (document.forms[0].txtpwd.value != "" && document.forms[0].txtConfirm.value != "" && document.forms[0].txtuid.value != "") {
            if (document.forms[0].txtpwd.value == document.forms[0].txtConfirm.value) {

                if (document.forms[0].txtpwd.value.length > 5 && document.forms[0].txtpwd.value.length < 21) {
                    if (document.forms[0].txtpwd.value.match(/[!,@,#,$,%,^,*,?,_,~,-]/g)) {
                        document.forms[0].hdnPass.value = document.forms[0].txtpwd.value;
                        var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
                        var string_length = 8;
                        var randomstring = '';
                        var randomstring1 = '';

                        for (var i = 0; i < string_length; i++) {
                            var rnum = Math.floor(Math.random() * chars.length);
                            randomstring += chars.substring(rnum, rnum + 1);
                        }
                        for (var j = 0; j < string_length; j++) {
                            var rnum1 = Math.floor(Math.random() * chars.length);
                            randomstring1 += chars.substring(rnum1, rnum1 + 1);
                        }
                        ////satyabir modification on 08/09/2014
                        var hash = CryptoJS.HmacSHA256(document.forms[0].txtpwd.value, document.forms[0].challenge.value);
                        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
                        document.forms[0].fssai.value = hashInBase64;
                        document.forms[0].txtpwd.value = randomstring;
                        document.forms[0].txtConfirm.value = randomstring;
                        ////satyabir end

                        //var passstring = hex_hmac_md5(document.forms[0].txtpwd.value, document.forms[0].challenge.value);
                        //var passstring = hex_hmac_md5(document.forms[0].txtConfirm.value, document.forms[0].challenge.value);
                        //document.forms[0].fssai.value = randomstring + hashInBase64 + randomstring1;
                        //document.forms[0].txtpwd.value = randomstring;
                        //document.forms[0].txtConfirm.value = randomstring;

                        return true;
                    }
                    else {
                        alert("Please enter at least one special character like (!,@,#,$,%,^,*,?,_,~,-) in Password.");
                        return false;
                    }

                }
                else {
                    alert("Password Length should be 6 to 20 character !");
                    return false;
                }
            }
            else {
                alert("Password and Confirm Password mismatch..!")
                return false;
            }
        }
        else {
            alert("Please enter Userid and Password")
            return false;
        }
    }
    else {
        alert("Please enter mandatory fields")
        return false;
    }
}


function ForgotPasswordconvertTomd51() {


    var Pwd = document.forms[0].hdnPass.value;
    if (document.forms[0].hdnPass.value.length > 5 && document.forms[0].hdnPass.value.length < 21) {

        var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        var randomstring1 = '';

        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
            var aa = Math.floor(Math.random() * chars.length);
        }
        for (var j = 0; j < string_length; j++) {
            var rnum1 = Math.floor(Math.random() * chars.length);
            randomstring1 += chars.substring(rnum1, rnum1 + 1);
        }
        //Satyabir
        var hash = CryptoJS.HmacSHA256(document.forms[0].hdnPass.value, document.forms[0].challenge.value);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        document.forms[0].fssai.value = randomstring + hashInBase64 + randomstring1;
        //Satyabir
        //var passstring = hex_hmac_md5(document.forms[0].hdnPass.value, document.forms[0].challenge.value);
        //document.forms[0].fssai.value = randomstring + passstring + randomstring1;
        return true;
    }


}



function ResetconvertTomd5() {

    if (document.forms[0].txtnewPassword.value != "" && document.forms[0].txtConfirmPass.value != "" && document.forms[0].txtuid.value != "") {
        if (document.forms[0].txtnewPassword.value == document.forms[0].txtConfirmPass.value) {

            if (document.forms[0].txtnewPassword.value.length > 5 && document.forms[0].txtnewPassword.value.length < 21) {
                if (document.forms[0].txtnewPassword.value.match(/[!,@,#,$,%,^,*,?,_,~,-]/g)) {
                    //document.forms[0].hdnPass.value = document.forms[0].txtnewPassword.value;
                    var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
                    var string_length = 8;
                    var randomstring = '';
                    var randomstring1 = '';

                    for (var i = 0; i < string_length; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        randomstring += chars.substring(rnum, rnum + 1);
                    }
                    for (var j = 0; j < string_length; j++) {
                        var rnum1 = Math.floor(Math.random() * chars.length);
                        randomstring1 += chars.substring(rnum1, rnum1 + 1);
                    }

                    var passstring = hex_hmac_md5(document.forms[0].txtnewPassword.value, document.forms[0].challenge.value);
                    var passstring1 = hex_hmac_md5(document.forms[0].txtConfirmPass.value, document.forms[0].challenge.value);
                    document.forms[0].txtpassword.value = hex_hmac_md5(document.forms[0].txtpassword.value, document.forms[0].challenge.value);
                    document.forms[0].fssai.value = randomstring + passstring + randomstring1;
                    document.forms[0].txtnewPassword.value = passstring;
                    document.forms[0].txtConfirmPass.value = passstring1;

                    return true;
                }
                else {
                    alert("Please enter at least one special character like (!,@,#,$,%,^,*,?,_,~,-) in Password.");
                    return false;
                }

            }
            else {
                alert("Password Length should be 6 to 20 character !");
                return false;
            }
        }
        else {
            alert("Password and Confirm Password mismatch..!")
            return false;
        }
    }
    else {
        alert("Please enter Userid and Password")
        return false;
    }
}

function convertTomdPass5() {
    if (document.forms[0].ctl00$content$txtInp.value != "") {
        var passstring = hex_hmac_md5(document.forms[0].ctl00$content$txtInp.value, document.forms[0].challenge.value);
        document.forms[0].ctl00$content$lbl.value = passstring;
        return false;
    }
    else {
        alert("Please Enter Input Value")

        return false;
    }
}



// Print in New Window

function SelectedValue(HiddenField, FORWARDTO) {
    document.getElementById('ctl00_ContentPlaceHolderMain_' + HiddenField).value = document.getElementById('ctl00_ContentPlaceHolderMain_' + FORWARDTO).value
    // alert(document.getElementById('ctl00_ContentPlaceHolderMain_' + HiddenField).value)
}


function Dept_Filter(Dept_Name, FORWARDTO) {
    var Elmt_Name, Split_Str, Parse_Array_Out, size

    try {

        if (document.getElementById('ctl00_ContentPlaceHolderMain_HiddenField1').value.length == 0) {

            document.getElementById('ctl00_ContentPlaceHolderMain_HiddenField1').value = "0";
        }


        Split_Str = document.getElementById('ctl00_ContentPlaceHolderMain_' + document.getElementById('ctl00_ContentPlaceHolderMain_' + Dept_Name).value).value

        Parse_Array_Out = Split_Str.split("$")

        size = Parse_Array_Out.length

        document.getElementById('ctl00_ContentPlaceHolderMain_' + FORWARDTO).length = 0;

        var UserSkipped = 'False';

        document.getElementById('ctl00_ContentPlaceHolderMain_' + FORWARDTO)[0] = new Option("Select", "0");



        for (i = 1; i < size; i++) {
            var Parse_Array_In

            Parse_Array_In = Parse_Array_Out[i].split("@")

            var optn = document.createElement("OPTION");
            optn.text = Parse_Array_In[1];
            optn.value = Parse_Array_In[0];

            document.getElementById('ctl00_ContentPlaceHolderMain_' + FORWARDTO).options.add(optn);
            if (document.getElementById('ctl00_ContentPlaceHolderMain_HiddenField1').value != "0") {

                if (document.getElementById('ctl00_ContentPlaceHolderMain_HiddenField1').value.toUpperCase() == Parse_Array_In[0].toUpperCase()) {

                    document.getElementById('ctl00_ContentPlaceHolderMain_' + FORWARDTO).selectedIndex = true;
                }
            }


        }


        ///--- Bind Default Value

        if (document.getElementById('ctl00_ContentPlaceHolderMain_HiddenField1').value != "0") {

            var cbo = document.getElementById('ctl00_ContentPlaceHolderMain_' + FORWARDTO);

            for (i = 0; i < cbo.length; i++) {

                if (document.getElementById('ctl00_ContentPlaceHolderMain_HiddenField1').value.toUpperCase() == cbo.options[i].value.toUpperCase()) {
                    //alert(i.toString());

                    //cbo.selectedindex = i;
                    cbo.options[i].selected = true;
                    return;
                }
            }

        }







    }
    catch (Error) {

    }


}



function BindControlValueTAS(ControlName, ActionControlID) {
    //alert(document.getElementById(ActionControlID).value);
    if (document.getElementById(ActionControlID).value == "Accept") {
        document.getElementById(ControlName).options[0].selected = true;
    }
    else {
        document.getElementById(ControlName).options[18].selected = true;
    }
}


//function displayHTML(printContent) {
//    var inf = printContent;
//    win = window.open("", 'popup', 'toolbar=no,menubar=yes,location=no,status=yes,scrollbars=yes,resizable=yes');
//    win.document.write('<html><head><title>Certificate</title>');
//    win.document.write('<link href="../css/style.css" rel="stylesheet" type="text/css" />');
//    win.document.write('</head><body onLoad="self.print()"><center>');
//    win.document.write(inf);
//    win.document.write('</center></body></html>');
//    win.document.close();
//}


function displayHTML(printContent) {
    var inf = printContent;
    win = window.open("", 'popup', 'toolbar=no,menubar=yes,location=no,status=yes,scrollbars=yes,resizable=yes');
    win.document.write('<html><head>');
    win.document.write('<link href="../css/style.css" rel="stylesheet" type="text/css" />');
    win.document.write('<style type="text/css" media="print">@page{size: auto;margin: 0mm;} ');
    win.document.write('body{ background-color:#FFFFFF; margin: 0px;} @media print { #header, #footer { visibility: hidden !important; display: none !important;}}</style>');
    win.document.write('</head><body onLoad="self.print()" bgcolor="#FFFFFF"><center>');
    win.document.write(inf);
    win.document.write('</center></body></html>');
    win.document.close();
}
//

//	function CalcQtyShipped(NetWt, SortshipmentQty, QtyActual) 
//	{
//	    alert("Hello");
//	    var Elnetwt = document.getElementById('' + NetWt + '').value;
//	    var ElSortShipQty = document.getElementById('' + SortshipmentQty + '').value;
//	    var ElQtyActual = document.getElementById('' + QtyActual + '');
//	    alert("hello"); 
//	    ElQtyActual.value = parseFloat(Elnetwt) - parseFloat(ElSortShipQty)        
//	}


function AcceptDigitsWithDot(objtextbox)//objtextbox is the control name
{
    var exp = /[^\d.]/g;
    objtextbox.value = objtextbox.value.replace(exp, '');
    var s = objtextbox.value;
    var i = s.indexOf(".");
    if (i < 0 || s.substr(i + 1).length < 3) return;
    // alert("Only 6 digits to the right of the decimal are allowed!");
    objtextbox.value = s.substring(0, i + 3);
}


function OpenWindowEdit(URL) {
    var NewWin = window.open(URL, "EditUserDetails", "height=560,width=750,top=200,left=100,resizable=no,scrollbars=1");
}

function OpenWindowShipmentEdit(URL) {
    var NewWin = window.open(URL, "EditUserDetails", "height=360,width=750,top=200,left=100,resizable=no,scrollbars=1");
}

function OpenViewHistory(URL) {
    var NewWin = window.open(URL, "EditUserDetails", "height=300,width=950,top=200,left=100,resizable=no,scrollbars=1");
}

function confirmDeleteApplication() {
    if (confirm("Are you sure to delete complete application?"))
        return true;
    else
        return false;
}
function confirmDelete() {
    if (confirm("Are you sure to delete shipment and its product details?"))
        return true;
    else
        return false;
}

function OpenWindowDelete(URL) {
    if (confirm("Are you sure to Delete !"))
        var NwWin = window.open(URL, "DeleteConfirmation", "height=175,width=350,top=200,left=100,resizable=no,scrollbars=no");
}

function OpenWindowSmall(URL, title) {
    var newWin = window.open(URL, title, "menubar=no,toolbar=no,scrollbars=1,resizable=no,height=350,width=530,top=250,left=300");
    newWin.focus()
}
function OpenWindowBig(URL, title) {
    var newWin = window.open(URL, title, "location=no,status=yes,menubar=no,toolbar=no, scrollbars=1,resizable=yes,height=" + (screen.height - 10) + ",width=" + (screen.width - 10) + ",top=0,left=0");
    newWin.focus();

}

function OpenWindowWithMenu(URL, title) {
    var newWin = window.open(URL, title, "location=no,status=yes,menubar=yes,toolbar=no, scrollbars=1,resizable=yes,height=" + (screen.height - 10) + ",width=" + (screen.width - 10) + ",top=0,left=0");
    newWin.focus();

}

function Product_type(controlid) {
    clearremitems = false
    for (idmy = 0; idmy < document.getElementById(controlid).length; idmy++) {

        if (document.getElementById(controlid).options[0].selected) {
            clearremitems = true
        }
        if ((clearremitems) && (idmy > 0)) {
            document.getElementById(controlid).options[idmy].selected = false
        }
    }
}
function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    //alert(randomstring);
}
function ResetPwdTomd5() {
    //alert('');
    var strNewPass = document.getElementById("txtPwd").value;
    var strCPass = document.getElementById("txtCpwd").value;
    // alert(strNewPass.length);
    if (document.forms[0].txtPwd.value !== "" && document.forms[0].txtCpwd.value != "") {

        if (strNewPass.length > 20 || strNewPass.length < 6) {
            alert("Password Length should be 6 to 20 character !");
            return false;
        }
        else {
            if (document.forms[0].txtPwd.value.match(/[!,@,#,$,%,^,*,?,_,~,-]/g)) {
                document.forms[0].txtPwd.value = hex_hmac_md5(document.forms[0].txtPwd.value, document.forms[0].challenge.value);
                document.forms[0].txtCpwd.value = hex_hmac_md5(document.forms[0].txtCpwd.value, document.forms[0].challenge.value);

                if (document.forms[0].txtPwd.value == document.forms[0].txtCpwd.value) {
                    return true;
                }
                else {
                    alert("New Password and Conform Password should be same")
                    document.forms[0].txtPwd.value = "";
                    document.forms[0].txtCpwd.value = "";
                    document.forms[0].txtPwd.focus();
                    return false;
                }

            }
            else {
                alert("Please enter at least one special character like (!,@,#,$,%,^,*,?,_,~,-) in Password.");
                return false;
            }
        }
    }
    else {
        alert("All Password entries are mandatory")

        return false;
    }
}


//====== testing Function End Here

function daysLeft(SubmissionDate, LastDate, Noofdays) {
    var date1 = new Date(document.getElementById(SubmissionDate)) // document.form1.date_of_submission.value)
    var date2 = new Date(document.getElementById(LastDate)) // document.form1.last_date.value)
    one_day = 1000 * 60 * 60 * 24
    no_of_days = Math.ceil((date1.getTime() - date2.getTime()) / one_day)
    //'document.form1.no_days.value=no_of_days

    if (no_of_days < 0) {
        //document.form1.no_days.value=0 
        document.getElementById(Noofdays).value = 0;
    }
    else {
        //document.form1.no_days.value=no_of_days
        document.getElementById(Noofdays).value = no_of_days;
    }
}

function sll(id) {
    var frm = document.forms[0];
    for (i = 0; i < frm.elements.length; i++) {
        if (frm.elements[i].type == "checkbox") {
            frm.elements[i].checked = document.getElementById(id).checked;
        }
    }
}



function increaseFontSize() {
    var p = document.getElementsByTagName('td');
    var max = 15;
    for (i = 0; i < p.length; i++) {
        if (p[i].style.fontSize) {
            var s = parseInt(p[i].style.fontSize.replace("px", ""));
        }
        else {
            var s = 12;
        }
        if (s != max) {
            s += 1;
        }
        p[i].style.fontSize = s + "px";
        var f = p[i].getElementsByTagName("font");
        for (j = 0; j < f.length; j++) {
            if (f[j].style.fontSize) {
                var s1 = parseInt(f[j].style.fontSize.replace("pt", ""));
            }
            else {
                var s1 = 12;
            }
            if (s1 != max) {
                s1 += 1;
            }
            f[j].style.fontSize = s1 + "pt"
        }
    }
}
function decreaseFontSize() {
    var p = document.getElementsByTagName('td');
    var min = 10;
    for (i = 0; i < p.length; i++) {
        if (p[i].style.fontSize) {
            var s = parseInt(p[i].style.fontSize.replace("px", ""));
        }
        else {
            var s = 12;
        }
        if (s != min) {
            s -= 1;
        }
        p[i].style.fontSize = s + "px";

        var f = p[i].getElementsByTagName("font");
        for (j = 0; j < f.length; j++) {
            if (f[j].style.fontSize) {
                var s1 = parseInt(f[j].style.fontSize.replace("pt", ""));
            }
            else {
                var s1 = 12;
            }
            if (s1 != min) {
                s1 -= 1;
            }
            f[j].style.fontSize = s1 + "pt"
        }
    }
}



// function ChangedPwdTomd5()
//  {
//     

//     var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
//     var string_length = 8;
//     var randomstring = '';
//     var randomstring1 = '';
//     
//     for (var i = 0; i < string_length; i++) 
//     {
//         var rnum = Math.floor(Math.random() * chars.length);
//         randomstring += chars.substring(rnum, rnum + 1);
//     }
//    

//     if (document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value !== "" && document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value != "") 
//     {
//         
//         document.aspnetForm.ctl00$ContentPlaceHolderMain$omyu.value = document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value
//         document.aspnetForm.ctl00$ContentPlaceHolderMain$MyRANDAM.value = randomstring;
//         document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value = hex_hmac_md5(document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value, randomstring);

//         //alert(hex_hmac_md5(document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value, randomstring));
//        

//         return true;


//     }
//     else
//      {
//                 return false;
//      }
// }


function ChangedPwdTomd5() {

    var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
    var string_length = 12;
    var randomstring = '';
    var randomstring1 = '';

    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

    if (document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value !== "" && document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value != "") {

        var MyValEnc = endecrypt_js(true, document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value);

        document.aspnetForm.ctl00$ContentPlaceHolderMain$omyu.value = MyValEnc;
        // document.aspnetForm.ctl00$ContentPlaceHolderMain$omyu.value = document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value
        document.aspnetForm.ctl00$ContentPlaceHolderMain$oapeda.value = hex_hmac_md5(document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value, document.aspnetForm.challenge.value);
        document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value = randomstring;  //hex_hmac_md5(document.aspnetForm.ctl00$ContentPlaceHolderMain$txtPassword.value, document.aspnetForm.challenge.value);

        return true;

    }
    else {
        return false;
    }
}

function convertTomd5Forgot() {
    if (document.forms[0].txtEmail.value != "") {
        if (document.forms[0].txtnewPassword.value != "" && document.forms[0].txtConfirmPass.value != "") {
            if (document.forms[0].txtnewPassword.value == document.forms[0].txtConfirmPass.value) {
                document.forms[0].hdnPass.value = document.forms[0].txtnewPassword.value;
                var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
                var string_length = 8;
                var randomstring = '';
                var randomstring1 = '';
                var randomstring3 = '';
                var randomstring4 = '';

                for (var i = 0; i < string_length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
                }
                for (var j = 0; j < string_length; j++) {
                    var rnum1 = Math.floor(Math.random() * chars.length);
                    randomstring1 += chars.substring(rnum1, rnum1 + 1);
                }

                // var passstring = hex_hmac_md5(document.forms[0].txtnewPassword.value, document.forms[0].challenge.value);

                //satyabir incryption technick change on 09/09/2014
                var hash = CryptoJS.HmacSHA256(document.forms[0].txtnewPassword.value, document.forms[0].challenge.value);
                var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
                //end satyabir
                document.forms[0].fssai.value = randomstring + hashInBase64 + randomstring1;
                document.forms[0].txtnewPassword.value = randomstring;
                document.forms[0].txtConfirmPass.value = randomstring;


                for (var k = 0; k < string_length; k++) {
                    var rnum2 = Math.floor(Math.random() * chars.length);
                    randomstring3 += chars.substring(rnum2, rnum2 + 1);
                }
                for (var l = 0; l < string_length; l++) {
                    var rnum3 = Math.floor(Math.random() * chars.length);
                    randomstring4 += chars.substring(rnum3, rnum3 + 1);
                }
                //var passstring1 = hex_hmac_md5(document.forms[0].txtEmail.value, document.forms[0].challenge.value);
                //satyabir incryption technick change on 09/09/2014
                var hash = CryptoJS.HmacSHA256(document.forms[0].txtEmail.value, document.forms[0].challenge.value);
                var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
                //end satyabir
                document.forms[0].fssaiOld.value = randomstring3 + hashInBase64 + randomstring4;
                return true;
            }
            else {
                alert("New Password and Conform Password should be same")

                return false;
            }
        }
        else {
            alert("Please Enter New Password and Confirm Password")

            return false;
        }

    }
    else {
        alert("Please Enter Old Password")

        return false;
    }
}



function DecMyUP() {


    var MyValEnc = endecrypt_js(false, document.aspnetForm.ctl00$ContentPlaceHolderMain$omyu.value);

    document.aspnetForm.ctl00$ContentPlaceHolderMain$omyu.value = MyValEnc;
    //alert(MyValEnc);
}

/*function ValChar(txtVal) 
{

var str = txtVal.value;
var ltr = new RegExp("[a-zA-Z]", "g");
//alert(str.length);
if(str.length > 0)
{
if (!(str.search(ltr) >= 0 ))
{
alert("Value must contain at least one character");
txtVal.focus();
} 
}
}*/

function ValChar(txtVal, txtName) {

    var str = txtVal.value;
    var str_txtName = txtName;
    var ltr = new RegExp("[a-zA-Z]", "g");
    if (str.length > 0) {
        if (!(str.search(ltr) >= 0)) {
            alert(str_txtName + " must have at least one character");
            txtVal.focus();
        }
    }
}
//Added By Nazim on 27/08/2013 for Duplicate License
function RegPaymentHandleDup(rd0, tblDraft, tblOnline, trDoc) {

    var oRadio = document.forms[0].elements[rd0];

    for (var i = 0; i < oRadio.length; i++) {

        if (oRadio[i].checked && oRadio[i].value == "2") {
            document.getElementById(tblOnline).style.display = 'block';
            document.getElementById(tblDraft).style.display = 'none';
            document.getElementById(trDoc).style.display = 'block';
        }
        else if (oRadio[i].checked && oRadio[i].value == "1") {
            document.getElementById(tblOnline).style.display = 'none';
            document.getElementById(tblDraft).style.display = 'block';
            document.getElementById(trDoc).style.display = 'block';
        }
    }
}
function RegPaymentHandleDup_SL(rd0, tblDraft, tblChallan, trDoc, trCash) {

    var oRadio = document.forms[0].elements[rd0];

    for (var i = 0; i < oRadio.length; i++) {

        if (oRadio[i].checked && oRadio[i].value == "2") {
            document.getElementById(tblChallan).style.display = 'block';
            document.getElementById(tblDraft).style.display = 'none';
            document.getElementById(trCash).style.display = 'none';
            document.getElementById(trDoc).style.display = 'block';
        }
        else if (oRadio[i].checked && oRadio[i].value == "1") {
            document.getElementById(tblChallan).style.display = 'none';
            document.getElementById(trCash).style.display = 'none';
            document.getElementById(tblDraft).style.display = 'block';
            document.getElementById(trDoc).style.display = 'block';
        }
        else if (oRadio[i].checked && oRadio[i].value == "3") {
            document.getElementById(tblChallan).style.display = 'none';
            document.getElementById(tblDraft).style.display = 'none';
            document.getElementById(trDoc).style.display = 'block';
            document.getElementById(trCash).style.display = 'block';
        }

    }
}
//*****END******//
function ValNumChar(txtVal, txtName) {

    var str = txtVal.value;
    var str_txtName = txtName;
    var ltr = new RegExp("[a-zA-Z]", "g");
    var num = new RegExp("[0-9]", "g");
    if (str.length > 0) {
        if (!(str.search(ltr) >= 0 || str.search(num) >= 0)) {
            alert(str_txtName + " value must contain at least one character OR one numeric value.");
            txtVal.focus();
        }
    }
}
function convertTomd5ForCentralLoginPage() {
    if (document.forms[0].ctl00$content$txtpwd.value != "" && document.forms[0].ctl00$content$txtuid.value != "") {


        var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        var randomstring1 = '';

        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        for (var j = 0; j < string_length; j++) {
            var rnum1 = Math.floor(Math.random() * chars.length);
            randomstring1 += chars.substring(rnum1, rnum1 + 1);
        }

        var passstring = hex_hmac_md5(document.forms[0].ctl00$content$txtpwd.value, document.forms[0].challenge.value);

        //document.forms[0].ctl00$ContentPlaceHolderMain$txtpwd.value=randomstring+passstring+randomstring1;
        document.forms[0].ctl00$content$fssai.value = randomstring + passstring + randomstring1;
        document.forms[0].ctl00$content$txtpwd.value = randomstring + randomstring + randomstring + randomstring;


        //document.forms[0].ctl00$ContentPlaceHolderMain$txtpwd.value=hex_hmac_md5(document.forms[0].ctl00$ContentPlaceHolderMain$txtpwd.value,document.forms[0].challenge.value);   
        return true;
    }
    else {
        alert("Please enter Userid and Password.");

        return false;
    }
}

//AddedControl By Nazim on 300114 for Premises Type
function OtherType(ddlpre, txtOther, rfOther) {
    var lang = document.getElementById(ddlpre);
    if (lang.value == "Others") {
        document.getElementById(txtOther).style.display = 'block';
        ValidatorEnable(document.getElementById(rfOther), true);
        document.getElementById(txtOther).innerHTML = "";

    }
    else {
        document.getElementById(txtOther).style.display = 'none';
        ValidatorEnable(document.getElementById(rfOther), false);
    }

}
//-------End-------//
// Java script added by manoj on 25/03/2014 for validate max lenth(500) of remarks.

function ValidateText(txt) {
    try {
        var maxLen = 501;
        if (txt.value.length > (maxLen - 1)) {
            var cont = txt.value;
            txt.value = cont.substring(0, (maxLen - 1));
            alert("Remark(s) can not be more than 500 characters.");
            return false;
        };
    } catch (e) {
    }
}


//Created by nazim on date 28/03/2014 
function RegTypeHandle(rd0, trELectonically, trPhysically) {

    var oRadio = document.forms[0].elements[rd0];

    for (var i = 0; i < oRadio.length; i++) {

        if (oRadio[i].checked && oRadio[i].value == "1") {


            document.getElementById(trELectonically).style.display = 'block';
            document.getElementById(trPhysically).style.display = 'none';


        }
        else if (oRadio[i].checked && oRadio[i].value == "2") {
            document.getElementById(trELectonically).style.display = 'none';
            document.getElementById(trPhysically).style.display = 'block';
        }
    }
}
// END Modified by nazim on date 28/03/2014 