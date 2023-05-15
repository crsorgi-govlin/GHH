var BirthLegalForm = {
		inIt: function(subDistrict, regUnitNo, villageId, urlAjax, getAllDropDownDetailsUrl, editFormId, getAllDropDownEditDetailsUrl, getDDOptionsUrl, maxRegYear, hospitalUrl,childFirstName, birLeRegNo) {

		this.villageId = villageId;
		this.regUnitNo = regUnitNo;
		this.birLeRegNo = birLeRegNo;
		//this.User_StateId = User_StateId;

        this.urlAjax = urlAjax;
        this.editDetailsUrl = getAllDropDownEditDetailsUrl;
        this.editFormId = editFormId;
        this.getDDOptionsUrl = getDDOptionsUrl;
        this.editFormId = editFormId;
        this.hospitalUrl = hospitalUrl;
        //this.childFirstName = childFirstName;
        var _this = this;

        _this.dateDisplay(maxRegYear);
        //        _this.removeFieldSpace();
        //        _this.dropDownFieldsToShowToolTip();
        _this.validateForm();
        //_this.placeOfBirthSection(subDistrict); // Curretly open on page load, Later put the condition
		//_this.placeOfBirthSection(regUnitNo,villageId);
		_this.placeOfBirthSection(regUnitNo,villageId);

        _this.informantSection();
        _this.permanentAddressSame();
        _this.parentchildBirthAddressSame();
        _this.formSubmit();
        _this.validateChildName(childFirstName,editFormId);

        if (editFormId > 0) {
            _this.getAllDropDownEditDetails();
            $("#editCheck").val("2");
            //_this.checkDuplicate(2); // ON BLURING ON THE MOTHER'S NAME ......................IN TO DO // 2 for edit form
        }
        else {

            _this.getAllDropDownDetails(getAllDropDownDetailsUrl);
            //_this.checkDuplicate(1); // ON BLURING ON THE MOTHER'S NAME ......................IN TO DO // 1 for new form

        }

        _this.replacePincodeZero();
    },
    dateDisplay: function(maximumRegYear) {
        if(this.editFormId > 0 && this.birLeRegNo != '' && this.birLeRegNo != null){
			var reportDate = $("#birth_legal_bir_le_reporting").val();
            //format the date
            dArr = reportDate.split("-");  // ex input "2010-01-18"

            var formatedDate =  dArr[2]+ "-" +dArr[1]+ "-" +dArr[0];

			var dateOfBirth = $("#birth_legal_bir_le_dob").val();
			dArr1 = dateOfBirth.split("-");  // ex input "2010-01-18"
			var formatedDate1 =  dArr1[2]+ "-" +dArr1[1]+ "-" +dArr1[0];
			
			
			var date1 = new Date(reportDate);
            var date2 = new Date(dateOfBirth);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            //alert(diffDays);
			var tj=0;
			if(diffDays >= 21){
				//$("#birth_legal_bir_le_dob").prop("disabled",true);
				tj=1;

			}
				
			var d = new Date(reportDate);

            //console.log(d.toLocaleDateString());
            d.setDate(d.getDate() - 21);
            var formatedDate2 = d.toLocaleDateString();
		    
			var num = formatedDate2.split("/");
			//alert(num);
			var trueDate = num[1]+ "-" +num[0]+ "-" +num[2];

			if(tj==1){
				trueDate = formatedDate1;
				formatedDate = formatedDate1;
			}

			
            $("#birth_legal_bir_le_reporting").datepicker({
                buttonImageOnly: false,
                minDate:formatedDate,
                maxDate: formatedDate,
                dateFormat: 'dd-mm-yy',
                changeMonth: false,
                changeYear: false,
                showOn: 'button'

            });
            $("#birth_legal_bir_le_reporting").attr('readOnly', 'true');
			$("#birth_legal_bir_le_dob").attr('readOnly', 'true');
            //$("#birth_legal_bir_le_dob").datepicker("option", "maxDate", '18-03-2014');
            $("#birth_legal_bir_le_dob").datepicker({
                buttonImageOnly: false,
                minDate:trueDate,
                maxDate: formatedDate,
                dateFormat: 'dd-mm-yy',
                changeMonth: false,
                changeYear: false,
                showOn: 'button'
            });
        }
        else if(this.editFormId > 0 && (this.birLeRegNo == '' || this.birLeRegNo == null)){
            var reportDate = $("#birth_legal_bir_le_reporting").val();
            var date1 = new Date(reportDate);
            var date2 = new Date(dateOfBirth);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            //alert(diffDays);
            var tj=0;
            if(diffDays >= 21){
                //$("#birth_legal_bir_le_dob").prop("disabled",true);
                tj=1;

            }

            var d = new Date(reportDate);

            //console.log(d.toLocaleDateString());
            d.setDate(d.getDate() - 21);
            var formatedDate2 = d.toLocaleDateString();

            var num = formatedDate2.split("/");
            //alert(num);
            var trueDate = num[1]+ "-" +num[0]+ "-" +num[2];

            if(tj==1){
                trueDate = formatedDate1;
                formatedDate = formatedDate1;
            }
            //format the date
            dArr = reportDate.split("-");  // ex input "2010-01-18"

            var formatedDate =  dArr[2]+ "-" +dArr[1]+ "-" +dArr[0];
            $("#birth_legal_bir_le_reporting").datepicker({
                buttonImageOnly: false,
                minDate:formatedDate,
                maxDate: formatedDate,
                dateFormat: 'dd-mm-yy',
                changeMonth: false,
                changeYear: false,
                showOn: 'button'

            });
           // alert(formatedDate);
            $("#birth_legal_bir_le_reporting").attr('readOnly', 'true');
            //$("#birth_legal_bir_le_dob").datepicker("option", "maxDate", '18-03-2014');
            $("#birth_legal_bir_le_dob").datepicker({
                buttonImageOnly: true,
                minDate:trueDate,
                maxDate: formatedDate,
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
                showOn: 'both',
                onSelect: function(dateText, inst) {
                    $("#birth_legal_bir_le_sex").focus();
                    var regDate = $("#birth_legal_bir_le_reporting").val();
                    var dobDate = $("#birth_legal_bir_le_dob").val();
                    var maxRegYear = maximumRegYear;
                    var callingType = 1;
                    birthRegisterSuccess.regVsDobDateValidation(regDate, dobDate, maxRegYear, callingType);
                    //To calculate days if greater than 21 days show confirm box
                    var start = $('#birth_legal_bir_le_dob').datepicker('getDate');
                    var end = $('#birth_legal_bir_le_reporting').datepicker('getDate');
                    var days = (end - start) / 1000 / 60 / 60 / 24;
                    if (typeof(days) != 'undefined' && days >= 21) {
                        var r = confirm("Delayed Registration. Check if all requisite documents attached?");
                        if (r == false)
                            location.reload(true);
                    }

                }
            });

		}
		else{

			var userRole = $("#userRole").val();
			var state = $("#birth_legal_bir_le_birth_state").val();
				if(userRole==9 || userRole==10){
			   $("#birth_legal_bir_le_reporting").datepicker({
                buttonImageOnly: true,
                maxDate: "M D",
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
                showOn: 'both',
				minDate: new Date(2020,1,-4)

            });
                    }else{
            $("#birth_legal_bir_le_reporting").datepicker({
                buttonImageOnly: true,
                maxDate: "M D",
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
                showOn: 'both'

            });
					}
            $("#birth_legal_bir_le_reporting").change(function() {
                $("#birth_legal_bir_le_dob").datepicker("option", "maxDate", $(this).val());
				
				/*added by nagendra*/
				if(userRole==9 || (userRole==14 && state != 2)){
					var todaydate = new Date();
					var end = $('#birth_legal_bir_le_reporting').datepicker('getDate');
					var datediff = (todaydate - end) / 1000 / 60 / 60 / 24;
					var totaldays = -(parseInt(datediff)+20);
					//alert(totaldays);
				
				$("#birth_legal_bir_le_dob").datepicker("option", "minDate", totaldays);
				}
				/* added by nagendra */
            //            var regDate1 = $("#birth_legal_bir_le_reporting").val();
            //            var dobDate1 = $("#birth_legal_bir_le_dob").val();
            //          $("#birth_legal_bir_le_dob").focus();
            });
            $("#birth_legal_bir_le_reporting,#birth_legal_bir_le_dob").attr('readOnly', 'true');
            $("#birth_legal_bir_le_dob").datepicker({
                buttonImageOnly: true,
                maxDate: "M D",
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
                showOn: 'both',
                onSelect: function(dateText, inst) {
                    $("#birth_legal_bir_le_sex").focus();
                    var regDate = $("#birth_legal_bir_le_reporting").val();
                    var dobDate = $("#birth_legal_bir_le_dob").val();
                    var maxRegYear = maximumRegYear;
                    var callingType = 1;
                    birthRegisterSuccess.regVsDobDateValidation(regDate, dobDate, maxRegYear, callingType);
                    //To calculate days if greater than 21 days show confirm box
                    var start = $('#birth_legal_bir_le_dob').datepicker('getDate');
                    var end = $('#birth_legal_bir_le_reporting').datepicker('getDate');
                    var days = (end - start) / 1000 / 60 / 60 / 24;
 				   var state = $("#birth_legal_bir_le_birth_state").val();
					var userRole = $("#userRole").val();
					if(state==4 && userRole!=11 ){
						 if (typeof(days) != 'undefined' && days >= 21) {
                        var r = confirm("Delayed Registration. Check if all requisite documents attached?");
                        if (r == false)
                            location.reload(true);
                    }

					}else{
						 if (typeof(days) != 'undefined' && days >= 21) {
                        var r = confirm("Delayed Registration. Check if all requisite documents attached?");
                        if (r == false)
                            location.reload(true);
                     }

						}
                }
            });

			//Delayed Registration Ashish Yadav 29-11-2017
			       //if(userRole==9 || userRole==10 || (userRole==14 && state != 2))
					 if(userRole==10||userRole==9||userRole==14)
			          {
					    $("#birth_legal_bir_le_dob").datepicker("option", "minDate", -20);
				      }
        }
    },
    removeFieldSpace: function() {
        var allInput = $("input");
        $.each(allInput, function(index, value) {
            var elementId = $(this).attr("id");
        //            $().tri
        //            var Pincode = jQuery.trim($("#birth_legal_bir_le_parent_pincode").val());
        //           console.log(elementId)
        });
    },
    dropDownFieldsToShowToolTip: function() {
        var _this = this;
        var fieldArray = [
        'birth_legal_bir_le_sex',
		'country',
		'countryperm',
		'countrybirth',
        'birth_legal_bir_le_parent_state',
        'birth_legal_bir_le_parent_district',
        'birth_legal_bir_le_perm_state',
        'birth_legal_bir_le_perm_district',
        'birth_legal_bir_le_birth_state',
        'birth_legal_bir_le_birth_district',
        ];
        _this.displayToolTipOnDropDownValue(fieldArray);
    },
    // COMMON FUNTION .... WILL MOVE TO COMMON JS LATER
    displayToolTipOnDropDownValue: function(fieldArray) {
        $.each(fieldArray, function(index, value) {
            var dropDownTotalValue = $("#" + fieldArray[index] + " option").length;
            for (i = 0; i < dropDownTotalValue; i++) {
                $('#birth_legal_bir_le_birth_district').attr({
                    "title": $('#birth_legal_bir_le_birth_district').text()
                });
            }
        });
    },
    displayToolTipOnSelectedValue: function() {
    // Can be done once the drop fields are done
    },
    validateForm: function() {
        // Validate charachter String for security
        jQuery.validator.addMethod("checkForm", function(value, element) {
            var result = /[;()!@&$#%\'{}`*|,\":<>][0-9]/i.test(value);
            return !result;
        }, "");
        // Validate charachter String for security
        jQuery.validator.addMethod("checkstring", function(value, element) {
            var result = /^[a-zA-Z. ]*$/i.test(value);
            return result;
        }, "");
        // Validate charachter String with space
        jQuery.validator.addMethod("spacestring", function(value, element) {
            var result = /^[a-zA-Z. ]*$/i.test(value);
            return result;
        }, "");
		// Added by Naveen 30-03-2016 5:51 pm (start)
		// Validate alphanumeric charachter with space
		$.validator.addMethod("alphanumeric", function(value, element) {
            //var pattern = /^[a-zA-Z0-9]*$/g;
			var pattern = /^[a-zA-Z0-9/.-]+$/i;
			if(value != ''){
            var result = pattern.test(value);
            return result;
			}
			else{

					return true;
				}
        }, "");
		// Added by Naveen 30-03-2016 5:51 pm (end)
        jQuery.validator.addMethod("checkUID", function(value, element) {
            var result = /^[0-9 ]*$/i.test(value);
            return result;
        }, "");
		
		
		// validate reg number by nagendra for check less than 22 and greater than 23
		jQuery.validator.addMethod("regnumber", function(value, element) {
              var value = $('#birth_legal_bir_le_reg_no').val();
			 if (value.trim().length == '22' || value.trim().length == '23'){  
                    return false;
                    		
                } 
                else { 
                    return true;    
                } 
              		
        }, "");
		
		jQuery.validator.addMethod("birleDobCheck", function(value, element){
			
			var userRole = $('#userRole').val();
		if ((userRole == '9') || (userRole == '10')||(userRole == '14')){
			var last_date = $('#serverdate1').val();
			//alert(last_date);
              var bir_le_reporting_date = $('#birth_legal_bir_le_reporting').val();
			  var bir_le_dobb = $('#birth_legal_bir_le_dob').val();
				var dateParts = bir_le_dobb.split("-");
				var day = dateParts[0];
				var month = dateParts[1] - 1;
				var year = dateParts[2];
				bir_le_dobb1 = new Date(year, month, day);
				//bir_le_dobb1 = dateParts[0]+ "-" +dateParts[1]+ "-" +dateParts[2];
				
				var pp = bir_le_reporting_date.split("-");
				var day = pp[0];
				var month = pp[1] - 1;
				var year = pp[2];
				bir_le_reporting_date1 = new Date(year, month, day);
				//bir_le_reporting_date1 = pp[0]+ "-" +pp[1]+ "-" +pp[2];
				
				var qq = last_date.split("-");
				var day = qq[0];
				var month = qq[1] - 1;
				var year = qq[2];
				last_date1 = new Date(year, month, day);
				//last_date1 = qq[0]+ "-" +qq[1]+ "-" +qq[2];*/
				  if((bir_le_dobb1 <= bir_le_reporting_date1) && (bir_le_dobb1 >= last_date1)){				 
					   return true; 
					} else {
					   return false;	
					} 	
                } else {
                    return true;
				}					
                 
			
        }, "");

        /**
 * @author: uday shankar singh <usingh@ubicsindia.com, udayshankar1306@gmail.com>
 * function to check for the 3 special character.
 * be sure before editing
 */
        jQuery.validator.addMethod("checkRegEx", function(value, element) {
            if(value != ''){
                var result = /^[A-Za-z0-9 \d=., /]+$/i.test(value);
                return result;
            }
            else
                return true;
        }, "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed");

        //    $.validator.addMethod("regex", function(value, element, regexpr) {
        //      return regexpr.test(value);
        //    }, "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed");
        // Validate state
        //        jQuery.validator.addMethod("statevalidate", function(value, element) {
        //            if (($('#birth_legal_bir_le_birth_place').val() == 2 || $('#birth_legal_bir_le_birth_place').val() == 3) && value != '<?php echo $userStateId; ?>')
        //                return false;
        //            else
        //                return true;
        //        }, "");
        // Validate dist
        //        jQuery.validator.addMethod("distvalidate", function(value, element) {
        //            if (($('#birth_legal_bir_le_birth_place').val() == 2 || $('#birth_legal_bir_le_birth_place').val() == 3) && value != '<?php echo $userDistrictId; ?>')
        //                return false;
        //            else
        //                return true;
        //        }, "");
        // Validate uid
        jQuery.validator.addMethod("uid", function(value, element) {
            var father_uid = $('#birth_legal_bir_le_father_uid').val();
            var mother_uid = $('#birth_legal_bir_le_mother_uid').val();
			var child_uid = $('#birth_legal_bir_le_child_uid').val();
			if (!father_uid && !mother_uid && !child_uid)
                return true;
			//if both the id's are entered
			if (father_uid && mother_uid) {
			    if (father_uid == mother_uid)
                    return false;
                else
                    return true;
            }
			if (father_uid && child_uid) {
			    if (father_uid == child_uid)
                    return false;
                else
                    return true;
            }

			if (mother_uid && child_uid) {
				if (child_uid == mother_uid)
                    return false;
                else
                    return true;
            }

            //if only father id is entered
			if (father_uid && !mother_uid && !child_uid)
                return true;
            if (!father_uid && mother_uid && !child_uid)
                return true;
			if (!father_uid && !mother_uid && child_uid)
                return true;



        }, "");
        //trim

		//---------ADDED BY ANUPAM 09-JUNE-2016-------------------------------//

    /*    $("#birth_legal_bir_le_child_mname, #birth_legal_bir_le_child_lname, #birth_legal_bir_le_father_mname, #birth_legal_bir_le_father_lname, #birth_legal_bir_le_mother_mname, #birth_legal_bir_le_mother_lname").change(function() {
            var x = this.value;
            this.value = x.replace(/\s/g, "");
        });   */
        $("#frmBirthRegStep1").validate({
            rules: {
                "birth_legal[bir_le_form_no]": {
                    checkForm: true,
                    alphanumeric: true, // Added by Naveen 30-03-2016 5:52 pm
                    maxlength: 11
                },
				"birth_legal[bir_le_father_mobile]": {
                    number: true,
                    maxlength: 11,
					minlength:10
                },
				"birth_legal[bir_le_mother_mobile]": {
                    number: true,
                    maxlength: 11,
					minlength:10
                },
				"birth_legal[bir_le_father_email]": {
                      maxlength: 50,
					 email: true
                },
				"birth_legal[bir_le_mother_email]": {
                     maxlength: 50,
					 email: true
                },
				"birth_legal[EID]": {
                     number: true,
                     maxlength: 28,
				     minlength: 28,
                },
                "birth_legal[bir_le_reporting]": {
                    required: true,
                    dateISO: true
                },
				"birth_legal[bir_le_reg_no]": {
					required: true,
					regnumber: true,
				    maxlength: 30
                   
                },
                "birth_legal[bir_le_dob]": {
                    required: true,
					//birleDobCheck: true,
                    dateISO: true
				},
                "birth_legal[bir_le_sex]": {
                    required: true
                },
				"country": {
                    required: function() {
						var parentadd = $('input[name="parentadd"]:checked').val();
						if (parentadd=='Outside India'||parentadd=='1')
                            return true;
                        else
                            return false;
                    }
                },
				"countryperm": {
                    required: function() {
						var permaadd = $('input[name="permaadd"]:checked').val();
						if (permaadd=='Outside India'||permaadd=='1')
                            return true;
                        else
                            return false;
                    }
                },
				"countrybirth": {
                    required: function() {
						var birthadd = $('input[name="birthadd"]:checked').val();
						if (birthadd=='Outside India')
                            return true;
                        else
                            return false;
                    }
                },
				"birth_legal[bir_le_reg_unit]": {
                    required: true
                },
				//---------Adopted Child Validation-----------
				"birth_legal[bir_le_registration_date]": {
                    required: true,
                    dateISO: true
                },
				"birth_legal[bir_le_remarks]": {
                    required: false
                },
				
				"birth_legal[bir_le_date_and_number_of_adopted_date]": {
                    required: true,
                    dateISO: true
                },
				"birth_legal[bir_le_date_and_number_of_adopted_no]": {
                    required: true
                },
				"birth_legal[bir_le_adopted_mother_fname]": {
                    required: false
                },
				"birth_legal[bir_le_adopted_mother_mname]": {
                    required: false
                },
				"birth_legal[bir_le_adopted_mother_lname]": {
                    required: false
                },
				"birth_legal[bir_le_adopted_mother_uid]": {
                    required: false
                },
				"birth_legal[bir_le_adopted_father_fname]": {
                    required: false
                },
				"birth_legal[bir_le_adopted_father_mname]": {
                    required: false
                },
				"birth_legal[bir_le_adopted_father_lname]": {
                    required: false
                },
				"birth_legal[bir_le_adopted_father_uid]": {
                    required: false
                },
				//---------Adopted Child Validation-----------
                "birth_legal[bir_le_child_fname]": {
                    checkstring: false,
                    maxlength: 50
                },
                "birth_legal[bir_le_child_mname]": {
                    checkstring: false,
                    maxlength: 20
                },
                "birth_legal[bir_le_child_lname]": {
                    checkstring: false,
                    maxlength: 20
                },
                "birth_legal[bir_le_father_fname]": {
                    required: false,
                    checkstring: false,
                    maxlength: 50
                },
                "birth_legal[bir_le_father_mname]": {
                    checkstring: false,
                    maxlength: 20
                },
                "birth_legal[bir_le_father_lname]": {
                    checkstring: false,
                    maxlength: 20
                },
                "birth_legal[bir_le_mother_fname]": {
                    required: false,
                    checkstring: false,
                    maxlength: 50
                },
                "birth_legal[bir_le_mother_mname]": {
                    checkstring: false,
                    maxlength: 20
                },
                "birth_legal[bir_le_mother_lname]": {
                    checkstring: false,
                    maxlength: 20
                },

                "birth_legal[bir_le_parent_bldg]": {
                    maxlength: 50,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_parent_house_no]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_parent_street_name]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_parent_postoffice]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_parent_cityvillage]": {
                    required: true
                },
                "birth_legal[bir_le_parent_state]": {
                    required: true
                },
                "birth_legal[bir_le_parent_district]": {
                    required: true
                },
                "birth_legal[bir_le_parent_sub_district]": {
                    required: true
                },
                "birth_legal[bir_le_parent_pincode]": {
                    number: true,
                    minlength: 6
                },

                "birth_legal[bir_le_perm_bldg]":{
                    maxlength: 50,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_perm_house_no]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_perm_street_name]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_perm_postoffice]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },

                "birth_legal[bir_le_perm_cityvillage]": {
                    required: true
                },
                "birth_legal[bir_le_perm_state]": {
                    required: true
                },
                "birth_legal[bir_le_perm_district]": {
                    required: true
                },
                "birth_legal[bir_le_perm_sub_district]": {
                    required: true
                },
				"birth_legal[bir_le_perm_pincode]": {
                    number: true,
                    minlength: 6
                },
                "birth_legal[bir_le_birth_place]": {
                    required: true
                },
                /*Ashsih block 17-5-17
				"birth_legal[bir_le_informant_name]": {
                    required: true,
                    // spacestring: true,
                    maxlength: 90
                },
                "birth_legal[bir_le_informant_address]": {
                    required: true
                },
				*/
                "birth_legal[bir_le_informant_pincode]": {
                    number: true,
                    minlength: 6
                },
                "birth_legal[bir_le_birth_place_name]": {
                    required: function() {
                        if ($('#birth_legal_bir_le_birth_place').val() == 1)
                            return true;
                        else
                            return false;
                    }

                },
                "birth_legal[bir_le_father_uid]": {
                    checkUID: true,
                    minlength: 14,
                    uid: true
                },
				"birth_legal[bir_le_child_uid]": {
                    checkUID: true,
                    minlength: 14,
                    uid: true
                },
                "birth_legal[bir_le_mother_uid]": {
                    checkUID: true,
                    minlength: 12,
                    uid: true
                },
                "birth_legal[bir_le_birth_pincode]": {
                    number: true,
                    minlength: 6
                },
                "birth_legal[bir_le_birth_bldg]":{
                    maxlength: 50,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_birth_house_no]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_birth_street_name]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },
                "birth_legal[bir_le_birth_postoffice]":{
                    maxlength: 35,
                    checkRegEx: false,
                    required: false
                },
				//Added by Naveen 15-04-2016 at 4:02 pm to validate subdistrict and cityvillage of Place of birth (start)
                "birth_legal[bir_le_birth_cityvillage]": {
                    required: function() {
                        if ($('#birth_legal_bir_le_birth_place').val() == 2 || $('#birth_legal_bir_le_birth_place').val() == 3)
                            return true;
                        else
                            return false;
                    }
                },
				"birth_legal[bir_le_birth_sub_district]": {
                    required: function() {
                        if ($('#birth_legal_bir_le_birth_place').val() == 2 || $('#birth_legal_bir_le_birth_place').val() == 3)
                            return true;
                        else
                            return false;
                    }
                },
				//Added by Naveen 15-04-2016 at 4:02 pm to validate subdistrict and cityvillage of Place of birth (end)
                "birth_legal[bir_le_birth_state]": {
                    required: function() {
                        if ($('#birth_legal_bir_le_birth_place').val() == 2 || $('#birth_legal_bir_le_birth_place').val() == 3)
                            return true;
                        else
                            return false;
                    }
                //                    statevalidate: true
                },
                "birth_legal[bir_le_birth_district]": {
                    required: function() {
                        if ($('#birth_legal_bir_le_birth_place').val() == 2 || $('#birth_legal_bir_le_birth_place').val() == 3)
                            return true;
                        else
                            return false;
                    }
                //                    distvalidate: true
                }
            },
            errorElement: "div",
            messages: {
                "birth_legal[bir_le_form_no]": {
                    checkForm: "Please enter valid form number.",
                    alphanumeric: "Form number should be Alphanumeric only.", // Added by Naveen 30-03-2016 5:52 pm
                    minlength: "Please enter 5 digits only.",
                    maxlength: "Please enter 11 digits only."

                },
			    "birth_legal[bir_le_father_mobile]": {
                    number: "Mobile number should be Numeric only.",
                    maxlength: "Please enter 10 digits only."
                },
			    "birth_legal[EID]": {
                    number: "EID should be Numeric only.",
                    maxlength: "Please enter 28 digits only.",
                    minlength: "Please enter 28 digits only."
                },
					"birth_legal[bir_le_reg_no]": {
                      maxlength: "Please enter 30 digits only.",
					  regnumber: "Please enter below 22 digits or above 23 digit only."
                },
			   "birth_legal[bir_le_mother_mobile]": {
                    number: "Mobile number should be Numeric only.",
                    maxlength: "Please enter 10 digits only."
                },
                "birth_legal[bir_le_reporting]": "Please select reporting date.",
                "birth_legal[bir_le_child_fname]": "Child first name is not valid name.",
                "birth_legal[bir_le_child_mname]": "Child middle name is not valid name.",
                "birth_legal[bir_le_child_lname]": "Child last name is not valid name.",
                "birth_legal[bir_le_dob]":{ 
				required:"Please select birth date."
				//,birleDobCheck:"You are not allowed to enter delay case."
				},
				"country": "Please select country.",
				"countryperm": "Please select country.",
				"countrybirth": "Please select country.",
				//-----------Adopted Child Validation Message-------------------------
				"birth_legal[bir_le_registration_date]": "Please select registration date.",
                "birth_legal[bir_le_remarks]": "Please enter remarks.",
				// birth_legal[bir_le_reg_no]": "Please enter registration number.",
				"birth_legal[bir_le_date_and_number_of_adopted_date]": "Please select adoptive date",
				"birth_legal[bir_le_date_and_number_of_adopted_no]": "Please enter adoptive number",
				"birth_legal[bir_le_adopted_mother_fname]": "Please enter adoptive mother first name",
				"birth_legal[bir_le_adopted_mother_mname]": "Please enter adoptive mother middle name",
				"birth_legal[bir_le_adopted_mother_lname]": "Please enter adoptive mother last name",
				"birth_legal[bir_le_adopted_mother_uid]": "Please enter adoptive mother uid number",
				"birth_legal[bir_le_adopted_father_fname]": "Please enter adoptive father first name",
				"birth_legal[bir_le_adopted_father_mname]": "Please enter adoptive father middel name",
				"birth_legal[bir_le_adopted_father_lname]": "Please enter adoptive father last name",
				"birth_legal[bir_le_adopted_father_uid]":  "Please enter adoptive father uid number",
				//-----------Adopted Child Validation Message-------------------------
                "birth_legal[bir_le_father_fname]": {
                    required: "Please enter first name of father.",
                    checkstring: "First name of father is not valid name."
                },
                "birth_legal[bir_le_father_mname]": {
                    checkstring: "Middle name of father is not valid name."
                },
                "birth_legal[bir_le_father_lname]": {
                    checkstring: "Last name of father is not valid name."
                },
                "birth_legal[bir_le_father_uid]": {
                    uid: "Should not be equal to Mother's or Child's UID.",
                    checkUID :"Allowed only numbers"
                },
				"birth_legal[bir_le_child_uid]": {
                    uid: "Should not be equal to Mother's or Father's UID.",
                    checkUID :"Allowed only numbers"
                },
                "birth_legal[bir_le_mother_fname]": {
                    required: "Please enter first name of mother.",
                    checkstring: "First name of mother is not valid name."
                },
                "birth_legal[bir_le_mother_mname]": {
                    checkstring: "Middle name of mother is not valid name."
                },
                "birth_legal[bir_le_mother_lname]": {
                    checkstring: "Last name of mother is not valid name."
                },
                "birth_legal[bir_le_mother_uid]": {
                    uid: "Should not be equal to Father's or Mother's UID.",
                    checkUID :"Allowed only numbers"
                },
                "birth_legal[bir_le_parent_bldg]": {
                    maxlength: "Max. length allowed is 50",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_parent_house_no]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_parent_street_name]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_parent_postoffice]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_parent_cityvillage]": {
                    required: "Please enter village/town name."
                },
                "birth_legal[bir_le_parent_state]": {
                    required: "Please select state.",
                    min: "You can add record of your region only.",
                    max: "You can add record of your region only."
                },
                "birth_legal[bir_le_parent_district]": {
                    required: "Please select district.",
                    min: "You can add record of your region only.",
                    max: "You can add record of your region only."
                },
                "birth_legal[bir_le_parent_sub_district]": {
                    required: "Please select sub district."
                },
                "birth_legal[bir_le_birth_state]": {
                    required: "Please select state."
                //                    statevalidate: "You can add record of your region only."
                },
                "birth_legal[bir_le_birth_district]": {
                    required: "Please select district."
                //                    distvalidate: "You can add record of your region only."
                },
                "birth_legal[bir_le_parent_pincode]": {
                    number: "Pincode is not valid.",
                    minlength: "Pincode must be 6 digits."
                },

                "birth_legal[bir_le_perm_bldg]":{
                    maxlength: "Max. length allowed is 50",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_perm_house_no]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_perm_street_name]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_perm_postoffice]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },

                "birth_legal[bir_le_perm_cityvillage]": {
                    required: "Please enter village/town name."
                },
                "birth_legal[bir_le_perm_state]": "Please select state.",
                "birth_legal[bir_le_perm_district]": "Please select district.",
                "birth_legal[bir_le_perm_sub_district]": "Please select sub district.",
                "birth_legal[bir_le_perm_pincode]": {
                    number: "Pincode is not valid.",
                    minlength: "Pincode must be 6 digits."
                },
                "birth_legal[bir_le_birth_place]": "Please select birth place.",
                "birth_legal[bir_le_birth_bldg]":{
                    maxlength: "Max. length allowed is 50",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_birth_house_no]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_birth_street_name]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                "birth_legal[bir_le_birth_postoffice]":{
                    maxlength: "Max. length allowed is 35",
                    regex: "Only 3 special characters: dot(.), comma(,) and forward slash(/) is allowed"
                },
                /* Ashish 5-17-17
				"birth_legal[bir_le_informant_name]": {
                    required: "Please enter informant name.",
                    spacestring: "Informant name is not a valid name."
                },
                "birth_legal[bir_le_informant_address]": "Please enter address.",
				*/
                "birth_legal[bir_le_informant_pincode]": {
                    number: "Pincode is not valid.",
                    minlength: "Pincode must be 6 digits."
                },
				//Added by Naveen 15-04-2016 at 4:02 pm to validate subdistrict and cityvillage of Place of birth (start)
				"birth_legal[bir_le_birth_sub_district]": {
					required: "Please select sub district."
				},
                "birth_legal[bir_le_birth_cityvillage]": {
                    required: "Please Select village/town."
                },
				"birth_legal[bir_le_reg_unit]": {
                    required: "Please Select Registration Unit."
                }
				//Added by Naveen 15-04-2016 at 4:02 pm to validate subdistrict and cityvillage of Place of birth (end)
            }
        });


    },
    //placeOfBirthSection: function(subDistrict) {
     placeOfBirthSection: function(regUnitNo,villageId) {
		 var New_User_Role    = $.trim($("#userRole").val());
		 if(New_User_Role==10)
		 {
			 $("#birth_legal_bir_le_birth_place").ready(function() {
            var value = $.trim($("#birth_legal_bir_le_birth_place").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_Role    = $.trim($("#userRole").val());
			var user_RegId   = $.trim($("#user_RegId").val());

			value = 2;

            $('#birth_legal_is_birth_place_same').attr('checked', false);
            $("#birth_legal_bir_le_birth_bldg").val('');
            $("#birth_legal_bir_le_birth_house_no").val('');
            $("#birth_legal_bir_le_birth_street_name").val('');
            $("#birth_legal_bir_le_birth_postoffice").val('');
            $("#birth_legal_bir_le_birth_pincode").val('');

			if (value == 1) {
                // DISPLAY HOSPITAL
				//if(User_Role!=10)
				//{
                $(".birthAddress").hide();
                $(".birthHospital").show();
				//}

                Utilities.ajaxBlockUI();
                $.ajax({
                    url: BirthLegalForm.hospitalUrl,
                    type: "POST",
                    data: ({
//                        subDistrict: subDistrict
						regUnitNo: regUnitNo,
						villageId: villageId,
						User_StateId: User_StateId,
						user_RegId: user_RegId
                    }),
                    async: false,
                    success: function(response) {
                       // alert(response);

						var respData = json_parse(response)

                        $("#birth_legal_bir_le_birth_place_name").find('option').remove();
                        $("#birth_legal_bir_le_birth_place_name").append(
                            $('<option></option>').val("").html("Select Hospital")
                            );

                        $.each(respData['list'], function(respValue, respText) {
                            $("#birth_legal_bir_le_birth_place_name").append(
                                $('<option></option>').val(respValue).html(respText)
                                );
                        });

						// This is To Get Registration Unit

						$("#birth_legal_bir_le_birth_place_name_ru").find('option').remove();
						$("#birth_legal_bir_le_birth_place_name_ru").append(
						$('<option></option>').val("").html("Select Registration Unit")
						);

						$.each(respData['list'], function(respValue, respText) {
						$("#birth_legal_bir_le_birth_place_name_ru").append(
						$('<option></option>').val(respValue).html(respText)
						);
						});



                    }
                });
                //                $('#birth_legal_bir_le_birth_place_name').hide().load('subDistrictHospitals?sub_dist=' + subDistrict, function() {
                //                    $('.ajaxloaderH').hide();
                //                    $(this).fadeIn();
                //                });
                // SHOWING THE SAME ADDRESS OF HOSPITAL CHECK BOX IN INFORMANT'S ADDRESS
                $('#hospital_address_checkbox').show();
            // $('#parent_address_checkbox').hide();


            }
            else if (value == 2 || value == 3) {

				$('#birth_legal_bir_le_birth_state').attr('disabled', true);
				$('#birth_legal_bir_le_birth_district').attr('disabled', true);
                $('#birth_legal_bir_le_birth_sub_district').attr('disabled', true);
                $('#birth_legal_bir_le_birth_cityvillage').attr('disabled', true);


                if (!$('#birth_legal_is_informant_same').is(":checked")) {
                    $("#birth_legal_is_informat_hospital_same").attr('checked', false);

                    $("input#birth_legal_bir_le_informant_name").val('');
                    $("input#birth_legal_bir_le_informant_name").attr('readonly', false);
                    $("textarea#birth_legal_bir_le_informant_address").val('');
                    $("textarea#birth_legal_bir_le_informant_address").attr('readonly', false);
                    $("input#birth_legal_bir_le_informant_pincode").val('');
                    $("input#birth_legal_bir_le_informant_pincode").attr('readonly', false);

                }

				var User_Role = $.trim($("#userRole").val());

				if(User_Role==14)
				{
                $(".birthAddress").show();
                $(".birthHospital").hide();

                // $("#parent_address_checkbox").html(undo);
                //$("#birth_legal_bir_le_birth_bldg").focus();
                //Make fields non editable
				$('#birth_legal_bir_le_birth_state').attr('disabled', true);
				$('#birth_legal_bir_le_birth_district').attr('disabled', false);

				a//
                $('#birth_legal_bir_le_birth_sub_district').attr('disabled', false);
                $('#birth_legal_bir_le_birth_cityvillage').attr('disabled', false);
                // HIDING THE SAME ADDRESS OF HOSPITAL CHECK BOX IN INFORMANT'S ADDRESS
                $('#hospital_address_checkbox').hide();
				}

				/*else if(User_Role==10)
				{
                $(".birthAddress").show();
                $(".birthHospital").hide();

                // $("#parent_address_checkbox").html(undo);
                //$("#birth_legal_bir_le_birth_bldg").focus();
                //Make fields non editable
				a//
                $('#birth_legal_bir_le_birth_state').attr('disabled', false);
                $('#birth_legal_bir_le_birth_district').attr('disabled', false);
                $('#birth_legal_bir_le_birth_sub_district').attr('disabled', false);
                $('#birth_legal_bir_le_birth_cityvillage').attr('disabled', false);
                // HIDING THE SAME ADDRESS OF HOSPITAL CHECK BOX IN INFORMANT'S ADDRESS
                $('#hospital_address_checkbox').hide();
				}*/

				else
				{
					$(".birthAddress").show();
					$(".birthHospital").hide();

					// $("#parent_address_checkbox").html(undo);
					$("#birth_legal_bir_le_birth_bldg").focus();
					//Make fields non editable
					$('#birth_legal_bir_le_birth_state').attr('disabled', 'disabled');
					$('#birth_legal_bir_le_birth_district').attr('disabled', 'disabled');
					$('#birth_legal_bir_le_birth_sub_district').attr('disabled', 'disabled');
					$('#birth_legal_bir_le_birth_cityvillage').attr('disabled', 'disabled');
					// HIDING THE SAME ADDRESS OF HOSPITAL CHECK BOX IN INFORMANT'S ADDRESS
					$('#hospital_address_checkbox').hide();
				}
            }
            else {

                $(".birthAddress").hide();
                $(".birthHospital").hide();

            }
        });
		 } // END OF IF CONDITION TO GENERAL PUBLIC
		 else
		 {
		 $("#birth_legal_bir_le_birth_place").change(function() {
            var value = $.trim($("#birth_legal_bir_le_birth_place").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_Role    = $.trim($("#userRole").val());
			var user_RegId   = $.trim($("#user_RegId").val());

            $('#birth_legal_is_birth_place_same').attr('checked', false);
            $("#birth_legal_bir_le_birth_bldg").val('');
            $("#birth_legal_bir_le_birth_house_no").val('');
            $("#birth_legal_bir_le_birth_street_name").val('');
            $("#birth_legal_bir_le_birth_postoffice").val('');
            $("#birth_legal_bir_le_birth_pincode").val('');

			if (value == 1) {
                // DISPLAY HOSPITAL
				//if(User_Role!=10)
				//{
                $(".birthAddress").hide();
                $(".birthHospital").show();
				//}

                Utilities.ajaxBlockUI();
                $.ajax({
                    url: BirthLegalForm.hospitalUrl,
                    type: "POST",
                    data: ({
//                        subDistrict: subDistrict
						regUnitNo: regUnitNo,
						villageId: villageId,
						User_StateId: User_StateId,
						user_RegId: user_RegId
                    }),
                    async: false,
                    success: function(response) {
                       // alert(response);

						var respData = json_parse(response)

                        $("#birth_legal_bir_le_birth_place_name").find('option').remove();
                        $("#birth_legal_bir_le_birth_place_name").append(
                            $('<option></option>').val("").html("Select Hospital")
                            );

                        $.each(respData['list'], function(respValue, respText) {
                            $("#birth_legal_bir_le_birth_place_name").append(
                                $('<option></option>').val(respValue).html(respText)
                                );
                        });

						// This is To Get Registration Unit

						$("#birth_legal_bir_le_birth_place_name_ru").find('option').remove();
						$("#birth_legal_bir_le_birth_place_name_ru").append(
						$('<option></option>').val("").html("Select Registration Unit")
						);

						$.each(respData['list'], function(respValue, respText) {
						$("#birth_legal_bir_le_birth_place_name_ru").append(
						$('<option></option>').val(respValue).html(respText)
						);
						});



                    }
                });
                //                $('#birth_legal_bir_le_birth_place_name').hide().load('subDistrictHospitals?sub_dist=' + subDistrict, function() {
                //                    $('.ajaxloaderH').hide();
                //                    $(this).fadeIn();
                //                });
                // SHOWING THE SAME ADDRESS OF HOSPITAL CHECK BOX IN INFORMANT'S ADDRESS
                $('#hospital_address_checkbox').show();
            // $('#parent_address_checkbox').hide();


            }
            else if (value == 2 || value == 3) {


                if (!$('#birth_legal_is_informant_same').is(":checked")) {
                    $("#birth_legal_is_informat_hospital_same").attr('checked', false);

                    $("input#birth_legal_bir_le_informant_name").val('');
                    $("input#birth_legal_bir_le_informant_name").attr('readonly', false);
                    $("textarea#birth_legal_bir_le_informant_address").val('');
                    $("textarea#birth_legal_bir_le_informant_address").attr('readonly', false);
                    $("input#birth_legal_bir_le_informant_pincode").val('');
                    $("input#birth_legal_bir_le_informant_pincode").attr('readonly', false);

                }

				var User_Role = $.trim($("#userRole").val());

				if(User_Role==14)
				{
                $(".birthAddress").show();
                $(".birthHospital").hide();

                // $("#parent_address_checkbox").html(undo);
                //$("#birth_legal_bir_le_birth_bldg").focus();
                //Make fields non editable
				$('#birth_legal_bir_le_birth_state').attr('disabled', true);
				$('#birth_legal_bir_le_birth_district').attr('disabled', false);

				a//
                $('#birth_legal_bir_le_birth_sub_district').attr('disabled', false);
                $('#birth_legal_bir_le_birth_cityvillage').attr('disabled', false);
                // HIDING THE SAME ADDRESS OF HOSPITAL CHECK BOX IN INFORMANT'S ADDRESS
                $('#hospital_address_checkbox').hide();
				}

				/*else if(User_Role==10)
				{
                $(".birthAddress").show();
                $(".birthHospital").hide();

                // $("#parent_address_checkbox").html(undo);
                //$("#birth_legal_bir_le_birth_bldg").focus();
                //Make fields non editable
				a//
                $('#birth_legal_bir_le_birth_state').attr('disabled', false);
                $('#birth_legal_bir_le_birth_district').attr('disabled', false);
                $('#birth_legal_bir_le_birth_sub_district').attr('disabled', false);
                $('#birth_legal_bir_le_birth_cityvillage').attr('disabled', false);
                // HIDING THE SAME ADDRESS OF HOSPITAL CHECK BOX IN INFORMANT'S ADDRESS
                $('#hospital_address_checkbox').hide();
				}*/

				else
				{
					$(".birthAddress").show();
					$(".birthHospital").hide();

					// $("#parent_address_checkbox").html(undo);
					$("#birth_legal_bir_le_birth_bldg").focus();
					//Make fields non editable
					$('#birth_legal_bir_le_birth_state').attr('disabled', 'disabled');
					$('#birth_legal_bir_le_birth_district').attr('disabled', 'disabled');
					$('#birth_legal_bir_le_birth_sub_district').attr('disabled', 'disabled');
					$('#birth_legal_bir_le_birth_cityvillage').attr('disabled', 'disabled');
					// HIDING THE SAME ADDRESS OF HOSPITAL CHECK BOX IN INFORMANT'S ADDRESS
					$('#hospital_address_checkbox').hide();
				}
            }
            else {

                $(".birthAddress").hide();
                $(".birthHospital").hide();

            }
        });
		 } // END OF ELSE
    },
    informantSection: function() {
        //===IF INFORMAT ADDRESS IS SAME IS PERMANENT ADDRESS
        $('#birth_legal_is_informant_same').click(function() {
            //alert("1");
			var BldgName_SL = jQuery.trim($("#birth_legal_bir_le_perm_bldg_SL").val());
            var HouseNo_SL = jQuery.trim($("#birth_legal_bir_le_perm_house_no_SL").val());
            var Street_SL = jQuery.trim($("#birth_legal_bir_le_perm_street_name_SL").val());
            var PostOffice_SL = jQuery.trim($("#birth_legal_bir_le_perm_postoffice_SL").val());

			var BldgName = jQuery.trim($("#birth_legal_bir_le_perm_bldg").val());
            var HouseNo = jQuery.trim($("#birth_legal_bir_le_perm_house_no").val());
            var Street = jQuery.trim($("#birth_legal_bir_le_perm_street_name").val());
            var PostOffice = jQuery.trim($("#birth_legal_bir_le_perm_postoffice").val());
            var VillageTown = jQuery.trim($("#birth_legal_bir_le_perm_cityvillage option:selected").text());
            var SubDistrict = jQuery.trim($("#birth_legal_bir_le_perm_sub_district option:selected").text());
            var State = jQuery.trim($("#birth_legal_bir_le_perm_state option:selected").text());
            var District = jQuery.trim($("#birth_legal_bir_le_perm_district option:selected").text());
            var Pincode = jQuery.trim($("#birth_legal_bir_le_perm_pincode").val());
            //          if ($('#birth_legal_is_informant_same').attr('checked')) {
            if ($('#birth_legal_is_informant_same').is(":checked")) {
                if (BldgName != '')
                    BldgName = BldgName + ', ';
                if (HouseNo != '')
                    HouseNo = HouseNo + ', ';
                if (Street != '')
                    Street = Street + ', ';
                if (PostOffice != '')
                    PostOffice = PostOffice + ', \n';

			    if (BldgName_SL != '')
                    BldgName_SL = BldgName_SL + ', ';
                if (HouseNo_SL != '')
                    HouseNo_SL = HouseNo_SL + ', ';
                if (Street_SL != '')
                    Street_SL = Street_SL + ', ';
                if (PostOffice_SL != '')
                    PostOffice_SL = PostOffice_SL + ', \n';

				var address = BldgName + HouseNo + Street + PostOffice + VillageTown + ', ' + SubDistrict + ', ' + District + ', ' + State;
                var address_SL = BldgName_SL + HouseNo_SL + Street_SL + PostOffice_SL + VillageTown + ', ' + SubDistrict + ', ' + District + ', ' + State;

                $("textarea#birth_legal_bir_le_informant_address").val(address);
                $("textarea#birth_legal_bir_le_informant_address").attr('readonly', true);
                $("textarea#birth_legal_bir_le_informant_address_SL").val(address_SL);
                $("textarea#birth_legal_bir_le_informant_address_SL").attr('readonly', true);
                $("input#birth_legal_bir_le_informant_pincode").val(Pincode);
                $("input#birth_legal_bir_le_informant_pincode").attr('readonly', false);
                $("input#birth_legal_bir_le_informant_name").attr('readonly', false);

            } else {
                $("textarea#birth_legal_bir_le_informant_address").val('');
                $("textarea#birth_legal_bir_le_informant_address").attr('readonly', false);
                $("textarea#birth_legal_bir_le_informant_address_SL").val('');
                $("textarea#birth_legal_bir_le_informant_address_SL").attr('readonly', false);
                $("input#birth_legal_bir_le_informant_pincode").val('');
                $("input#birth_legal_bir_le_informant_pincode").attr('readonly', false);

                $("input#birth_legal_bir_le_informant_name").attr('readonly', false);
            }

            var hosp_add_checkbox = document.getElementById('birth_legal_is_informat_hospital_same');
            hosp_add_checkbox.checked = false;
            $('#birth_legal_bir_le_informant_name').val('');
        });
        //===COPYING THE INFORMANT ADDRESS ON CLICK OF THE CHECK BOX address same as Hospital address.
		var UserRole    = $.trim($("#userRole").val());
		//alert(UserRole);
		if(UserRole!=9) {

        $('#birth_legal_is_informat_hospital_same').click(function() {
            $('#birth_legal_bir_le_informant_address').val('');
            var hosp = $('#birth_legal_bir_le_birth_place_name');
            if (hosp.val() == "") {
                var checkbox = document.getElementById('birth_legal_is_informat_hospital_same');
                checkbox.checked = false;
                alert("Please select the hospital.");
            }
			else {


				var User_StateId = $.trim($("#userStateId").val());

				var html = $('#birth_legal_bir_le_birth_place_name option:selected').html();
                if (html)
                    var html1 = html.replace(/&amp;/g, '&');
                $('#birth_legal_bir_le_informant_address').val(html1);
                $('#birth_legal_bir_le_informant_name').val('HOSPITAL');
                $('#birth_legal_bir_le_informant_address_SL').val(html1);
				/*if(User_StateId=='31'){
				$('#birth_legal_bir_le_informant_name_SL').val('à´¹àµ‹à´¸àµ?à´ªà´¿à´Ÿàµ½');}
				else if(User_StateId=='33' || User_StateId=='34'){
				$('#birth_legal_bir_le_informant_name_SL').val('à®®à®°à¯?à®¤à¯?à®¤à¯?à®µà®®à®©à¯ˆà®¯à®¿à®²à¯?');}
				else{
				$('#birth_legal_bir_le_informant_name_SL').val('à¤…à¤¸à¥?à¤ªà¤¤à¤¾à¤²');}*/

				if(User_StateId=='23' || User_StateId=='4' || User_StateId=='2' || User_StateId=='20'|| User_StateId=='35' || User_StateId=='10' || User_StateId=='7' || User_StateId=='22' || User_StateId=='9' || User_StateId=='5' || User_StateId=='6' || User_StateId=='8' || User_StateId=='25')
					$('#birth_legal_bir_le_informant_name_SL').val('अस्पताल');
				else if(User_StateId=='27')
					$('#birth_legal_bir_le_informant_name_SL').val('रुग्णालय');
				else if(User_StateId=='31' || User_StateId=='32')
					$('#birth_legal_bir_le_informant_name_SL').val('ഹോസ്പിടൽ');
				else if(User_StateId=='33' || User_StateId=='34')
					$('#birth_legal_bir_le_informant_name_SL').val('హాస్పిటల్');
				else if(User_StateId=='24')
					$('#birth_legal_bir_le_informant_name_SL').val('હોસ્પિટલ');
				else if(User_StateId=='19' || User_StateId=='16' || User_StateId=='11')
					$('#birth_legal_bir_le_informant_name_SL').val('হাসপাতাল');
				else if(User_StateId=='28'  || User_StateId=='37')
					$('#birth_legal_bir_le_informant_name_SL').val('హాస్పిటల్');
				else if(User_StateId=='21')
					$('#birth_legal_bir_le_informant_name_SL').val('హాస్పిటల్');
				else
					$('#birth_legal_bir_le_informant_name_SL').val('अस्पताल');


            }
            var perm_add_checkbox = document.getElementById('birth_legal_is_informant_same');
            perm_add_checkbox.checked = false;
            if (!$('#birth_legal_is_informat_hospital_same').is(":checked"))
            {
                $('#birth_legal_bir_le_informant_name').val('');
                $('#birth_legal_bir_le_informant_address').val('');

                $("#birth_legal_bir_le_informant_name").attr('readonly', false)
                $("#birth_legal_bir_le_informant_address").attr('readonly', false)

                $('#birth_legal_bir_le_informant_name_SL').val('');
                $('#birth_legal_bir_le_informant_address_SL').val('');

                $("#birth_legal_bir_le_informant_name_SL").attr('readonly', false)
                $("#birth_legal_bir_le_informant_address_SL").attr('readonly', false)


            } else {
                $("#birth_legal_bir_le_informant_name").attr('readonly', false)
                $("#birth_legal_bir_le_informant_address").attr('readonly', true)

				$("#birth_legal_bir_le_informant_name_SL").attr('readonly', false)
                $("#birth_legal_bir_le_informant_address_SL").attr('readonly', true)
            }
            $("#birth_legal_bir_le_informant_pincode").val('');

        });

		//If Close and Start to Hospital
		} else {
			$('#birth_legal_bir_le_informant_address').val('');
            var hosp = $('#birth_legal_bir_le_birth_place_name');
            if (hosp.val() == "") {
                var checkbox = document.getElementById('birth_legal_is_informat_hospital_same');
                checkbox.checked = false;
                alert("Please select the hospital.");
            }
			else {

				var checkbox = document.getElementById('birth_legal_is_informat_hospital_same');
                checkbox.checked = true;

				if(checkbox.checked==true) {

				 $("#birth_legal_bir_le_informant_name").attr('readonly', true)
                $("#birth_legal_bir_le_informant_address").attr('readonly', true)

				$("#birth_legal_bir_le_informant_name_SL").attr('readonly', true)
                $("#birth_legal_bir_le_informant_address_SL").attr('readonly', true)

				var User_StateId = $.trim($("#userStateId").val());

                var html = $('#birth_legal_bir_le_birth_place_name option:selected').html();
                if (html)
                    var html1 = html.replace(/&amp;/g, '&');
                $('#birth_legal_bir_le_informant_address').val(html1);
                $('#birth_legal_bir_le_informant_name').val('HOSPITAL');
                $('#birth_legal_bir_le_informant_address_SL').val(html1);
				if(User_StateId=='31'){
				$('#birth_legal_bir_le_informant_name_SL').val('à´¹àµ‹à´¸àµ?à´ªà´¿à´Ÿàµ½');}
				else if(User_StateId=='33' || User_StateId=='34'){
				$('#birth_legal_bir_le_informant_name_SL').val('à®®à®°à¯?à®¤à¯?à®¤à¯?à®µà®®à®©à¯ˆà®¯à®¿à®²à¯?');}
				else{
				$('#birth_legal_bir_le_informant_name_SL').val('à¤…à¤¸à¥?à¤ªà¤¤à¤¾à¤²');}
				}
            }
           /* var perm_add_checkbox = document.getElementById('birth_legal_is_informant_same');
            perm_add_checkbox.checked = false;
            if (!$('#birth_legal_is_informat_hospital_same').is(":checked"))
            {
                $('#birth_legal_bir_le_informant_name').val('');
                $('#birth_legal_bir_le_informant_address').val('');

                $("#birth_legal_bir_le_informant_name").attr('readonly', false)
                $("#birth_legal_bir_le_informant_address").attr('readonly', false)

                $('#birth_legal_bir_le_informant_name_SL').val('');
                $('#birth_legal_bir_le_informant_address_SL').val('');

                $("#birth_legal_bir_le_informant_name_SL").attr('readonly', false)
                $("#birth_legal_bir_le_informant_address_SL").attr('readonly', false)


            } else {
                $("#birth_legal_bir_le_informant_name").attr('readonly', false)
                $("#birth_legal_bir_le_informant_address").attr('readonly', true)

				$("#birth_legal_bir_le_informant_name_SL").attr('readonly', false)
                $("#birth_legal_bir_le_informant_address_SL").attr('readonly', true)
            }
            $("#birth_legal_bir_le_informant_pincode").val('');*/
		}
		//End of Else Part

    },
    checkDuplicate: function(formType) {
        $('#birth_legal_bir_le_mother_lname').blur(function() {
            var dob = $('#birth_legal_bir_le_dob').val();
            var childF = $('#birth_legal_bir_le_child_fname').val();
            var childM = $('#birth_legal_bir_le_child_mname').val();
            var childL = $('#birth_legal_bir_le_child_lname').val();
            var childName = childF + '' + childM + '' + childL;
            var fatherF = $('#birth_legal_bir_le_father_fname').val();
            var fatherM = $('#birth_legal_bir_le_father_mname').val();
            var fatherL = $('#birth_legal_bir_le_father_lname').val();
            var fatherName = fatherF + '' + fatherM + '' + fatherL;
            var motherF = $('#birth_legal_bir_le_mother_fname').val();
            var motherM = $('#birth_legal_bir_le_mother_mname').val();
            var motherL = $('#birth_legal_bir_le_mother_lname').val();
            var motherName = motherF + '' + motherM + '' + motherL;
            var valFlag;
            Utilities.ajaxBlockUI();
            $.ajax({
                url: BirthLegalForm.urlAjax + "/getDuplicateData?dob=" + dob + "&childname=" + childName + "&fathername=" + fatherName + "&mothername=" + motherName,
                async: false,
                success: function(response) {
                    var data = json_parse(response);
                    //          console.log(data)
                    var duplicateStatus = false;
                    if (formType == 1) {
                        if (data > 0)
                            duplicateStatus = true;
                    }
                    else if (formType = 2) {
                        if (data > 1)
                            duplicateStatus = true;
                    }
                    //                    console.log(duplicateStatus)
                    if (duplicateStatus == true) {
                        var r = confirm("Record with Date of Birth, Child Name, Father Name, Mother Name Alredy Exist. Do you want to continue?");
                        if (r == false) {
                            valFlag = false;
                            location.reload(true);
                        } else
                            valFlag = true;
                    }
                }
            });

        });
    },
    permanentAddressSame: function() {
        var _this = this;

        $('#birth_legal_is_perm_same').click(function() {
            _this.editCheckBoxClickForPermanentAddressDisable();
        });

        if ($('#birth_legal_is_perm_same').is(":checked")) {
            _this.editCheckBoxClickForPermanentAddressDisable();
        }
    },
    editCheckBoxClickForPermanentAddressDisable: function(){

		//alert("2");

        var BldgName = jQuery.trim($("#birth_legal_bir_le_parent_bldg").val());
        var HouseNo = jQuery.trim($("#birth_legal_bir_le_parent_house_no").val());
        var Street = jQuery.trim($("#birth_legal_bir_le_parent_street_name").val());
        var PostOffice = jQuery.trim($("#birth_legal_bir_le_parent_postoffice").val());
        var VillageTown = jQuery.trim($("#birth_legal_bir_le_parent_cityvillage option:selected").val());
        var State = jQuery.trim($("#birth_legal_bir_le_parent_state option:selected").val());
        var District = jQuery.trim($("#birth_legal_bir_le_parent_district option:selected").val());
        var Pincode = jQuery.trim($("#birth_legal_bir_le_parent_pincode").val());

		var BldgName_SL = jQuery.trim($("#birth_legal_bir_le_parent_bldg_SL").val());
        var HouseNo_SL = jQuery.trim($("#birth_legal_bir_le_parent_house_no_SL").val());
        var Street_SL = jQuery.trim($("#birth_legal_bir_le_parent_street_name_SL").val());
        var PostOffice_SL = jQuery.trim($("#birth_legal_bir_le_parent_postoffice_SL").val());


        if ($('#birth_legal_is_perm_same').is(":checked")) {
            $("input#birth_legal_bir_le_perm_bldg").val(BldgName);
            $("input#birth_legal_bir_le_perm_bldg").attr("readonly", true);
            $("input#birth_legal_bir_le_perm_house_no").val(HouseNo);
            $("input#birth_legal_bir_le_perm_house_no").attr("readonly", true);
            $("input#birth_legal_bir_le_perm_street_name").val(Street);
            $("input#birth_legal_bir_le_perm_street_name").attr("readonly", true);
            $("input#birth_legal_bir_le_perm_postoffice").val(PostOffice);
            $("input#birth_legal_bir_le_perm_postoffice").attr("readonly", true);

            $("input#birth_legal_bir_le_perm_bldg_SL").val(BldgName_SL);
            $("input#birth_legal_bir_le_perm_bldg_SL").attr("readonly", true);
            $("input#birth_legal_bir_le_perm_house_no_SL").val(HouseNo_SL);
            $("input#birth_legal_bir_le_perm_house_no_SL").attr("readonly", true);
            $("input#birth_legal_bir_le_perm_street_name_SL").val(Street_SL);
            $("input#birth_legal_bir_le_perm_street_name_SL").attr("readonly", true);
            $("input#birth_legal_bir_le_perm_postoffice_SL").val(PostOffice_SL);
            $("input#birth_legal_bir_le_perm_postoffice_SL").attr("readonly", true);


            $("input#birth_legal_bir_le_perm_cityvillage").val(VillageTown);
            $("input#birth_legal_bir_le_perm_cityvillage").attr("disabled", "disabled");
            $("select#birth_legal_bir_le_perm_state").val(State);
            $("select#birth_legal_bir_le_perm_state").attr("disabled", "disabled");
            $("select#birth_legal_bir_le_perm_district").val(District);
            $("select#birth_legal_bir_le_perm_district").attr("disabled", "disabled");
            $("input#birth_legal_bir_le_perm_pincode").val(Pincode);
            $("input#birth_legal_bir_le_perm_pincode").attr("readonly", true);
            //get selected village options as well as the selected option
            var parent_village = $("#birth_legal_bir_le_parent_cityvillage");
            var perm_village = $("#birth_legal_bir_le_perm_cityvillage");
            var parent_sub_dist_options = parent_village.parent().children().html();
            $("#birth_legal_bir_le_perm_cityvillage").html(parent_sub_dist_options);
            perm_village.val(parent_village.val());
            perm_village.attr("disabled", "disabled");
            //get selected district options as well as selected option
            var parent_dist = $("#birth_legal_bir_le_parent_district");
            var perm_dist = $("#birth_legal_bir_le_perm_district");
            var parent_dist_options = parent_dist.parent().children().html();
            $("#birth_legal_bir_le_perm_district").html(parent_dist_options);
            perm_dist.val(parent_dist.val());
            perm_dist.attr("disabled", "disabled");
            //get selected subdistrict options as well as selected option
            var parent_sub_dist = $("#birth_legal_bir_le_parent_sub_district");
            var perm_sub_dist = $("#birth_legal_bir_le_perm_sub_district");
            var parent_sub_dist_options = parent_sub_dist.parent().children().html();
            $("#birth_legal_bir_le_perm_sub_district").html(parent_sub_dist_options);
            perm_sub_dist.val(parent_sub_dist.val());
            perm_sub_dist.attr("disabled", "disabled");

            var parentGramPanchayatVal = $("#gramPanchayatParent").val();
            var parentGramPanchayatText = $("#gramPanchayatParent option:selected").text();
            $("#gramPanchayatPermanent").empty().append(
                $('<option></option>').val(parentGramPanchayatVal).html(parentGramPanchayatText)
                );
            $("#gramPanchayatPermanent").attr('disabled', true);

        } else {
            $("input#birth_legal_bir_le_perm_bldg").val('');
            $("input#birth_legal_bir_le_perm_bldg").attr("readonly", false);
            $("input#birth_legal_bir_le_perm_house_no").val('');
            $("input#birth_legal_bir_le_perm_house_no").attr("readonly", false);
            $("input#birth_legal_bir_le_perm_street_name").val('');
            $("input#birth_legal_bir_le_perm_street_name").attr("readonly", false);
            $("input#birth_legal_bir_le_perm_postoffice").val('');
            $("input#birth_legal_bir_le_perm_postoffice").attr("readonly", false);

            $("input#birth_legal_bir_le_perm_bldg_SL").val('');
            $("input#birth_legal_bir_le_perm_bldg_SL").attr("readonly", false);
            $("input#birth_legal_bir_le_perm_house_no_SL").val('');
            $("input#birth_legal_bir_le_perm_house_no_SL").attr("readonly", false);
            $("input#birth_legal_bir_le_perm_street_name_SL").val('');
            $("input#birth_legal_bir_le_perm_street_name_SL").attr("readonly", false);
            $("input#birth_legal_bir_le_perm_postoffice_SL").val('');
            $("input#birth_legal_bir_le_perm_postoffice_SL").attr("readonly", false);

            $("input#birth_legal_bir_le_perm_cityvillage").val('');
            $("input#birth_legal_bir_le_perm_cityvillage").attr("disabled", false);
            $("select#birth_legal_bir_le_perm_state").val('');
            $("select#birth_legal_bir_le_perm_state").attr("disabled", false);
            $("select#birth_legal_bir_le_perm_district").val('');
            $("select#birth_legal_bir_le_perm_district").attr("disabled", false);
            $("input#birth_legal_bir_le_perm_pincode").val('');
            $("input#birth_legal_bir_le_perm_pincode").attr("readonly", false);

			//remove the options
            $("#birth_legal_bir_le_perm_cityvillage").html('');
            var empty_village = document.createElement('option');
            empty_village.value = '';
            empty_village.innerHTML = "Select Village/Town";
            $("#birth_legal_bir_le_perm_cityvillage").append(empty_village);
            $("#birth_legal_bir_le_perm_cityvillage").attr("disabled", false);
            $("#birth_legal_bir_le_perm_district").html('');
            var empty_sub_district = document.createElement('option');
            empty_sub_district.value = '';
            empty_sub_district.innerHTML = "Select District";
            $("#birth_legal_bir_le_perm_district").append(empty_sub_district);
            $("#birth_legal_bir_le_perm_district").attr("disabled", false);
            $("#birth_legal_bir_le_perm_sub_district").html('');
            var empty_sub_district = document.createElement('option');
            empty_sub_district.value = '';
            empty_sub_district.innerHTML = "Select Sub District";
            $("#birth_legal_bir_le_perm_sub_district").append(empty_sub_district);
            $("#birth_legal_bir_le_perm_sub_district").attr("disabled", false);

            $("#gramPanchayatPermanent").empty().append(
                $('<option></option>').val("").html("Select Gram Panchayat")
                );

        }
    },
    //for parentchildbirthaddress same

    parentchildBirthAddressSame: function() {
        var _this = this;

        $('#birth_legal_is_birth_place_same').click(function() {
            _this.editCheckBoxClickForParentChildbirthAddressDisable();
        });

        if(($('#birth_legal_is_birth_place_same').is(":checked")) && ($('#birth_legal_bir_le_birth_place option:selected').val() == 2)){
            _this.editCheckBoxClickForParentChildbirthAddressDisable();
        }
        $('#birth_legal_bir_le_birth_place').change(function(){
            _this.editCheckBoxClickForParentChildbirthAddressEnable();
        });
    },
    editCheckBoxClickForParentChildbirthAddressDisable: function(){

		//alert("3");
		//-----------------------------------------------------------
		// ADDED ON 28012015 HITESH TO POPULATE SL VALUES
		//-----------------------------------------------------------
		var BldgName_SL = jQuery.trim($("#birth_legal_bir_le_parent_bldg_SL").val());
        var HouseNo_SL = jQuery.trim($("#birth_legal_bir_le_parent_house_no_SL").val());
        var Street_SL = jQuery.trim($("#birth_legal_bir_le_parent_street_name_SL").val());
        var PostOffice_SL = jQuery.trim($("#birth_legal_bir_le_parent_postoffice_SL").val());
		//-----------------------------------------------------------
		// ADDED ON 28012015 HITESH TO POPULATE SL VALUES
		//-----------------------------------------------------------
   		//alert(BldgName_SL);
   		//alert(HouseNo_SL);
   		//alert(Street_SL);
   		//alert(PostOffice_SL);

		var BldgName = jQuery.trim($("#birth_legal_bir_le_parent_bldg").val());
        var HouseNo = jQuery.trim($("#birth_legal_bir_le_parent_house_no").val());
        var Street = jQuery.trim($("#birth_legal_bir_le_parent_street_name").val());
        var PostOffice = jQuery.trim($("#birth_legal_bir_le_parent_postoffice").val());
        var VillageTown = jQuery.trim($("#birth_legal_bir_le_parent_cityvillage option:selected").val());
        var State = jQuery.trim($("#birth_legal_bir_le_parent_state option:selected").val());
        var District = jQuery.trim($("#birth_legal_bir_le_parent_district option:selected").val());
        var Pincode = jQuery.trim($("#birth_legal_bir_le_parent_pincode").val());
        var Subdistrict = jQuery.trim($("#birth_legal_bir_le_parent_sub_district option:selected").val());


        if ($('#birth_legal_is_birth_place_same').is(":checked")) {
            $("input#birth_legal_bir_le_birth_bldg").val(BldgName);
            $("input#birth_legal_bir_le_birth_bldg").attr("readonly", true);
            $("input#birth_legal_bir_le_birth_house_no").val(HouseNo);
            $("input#birth_legal_bir_le_birth_house_no").attr("readonly", true);
            $("input#birth_legal_bir_le_birth_street_name").val(Street);
            $("input#birth_legal_bir_le_birth_street_name").attr("readonly", true);
            $("input#birth_legal_bir_le_birth_postoffice").val(PostOffice);
            $("input#birth_legal_bir_le_birth_postoffice").attr("readonly", true);
            $("select#birth_legal_bir_le_birth_cityvillage").val(VillageTown);
            $("select#birth_legal_bir_le_birth_cityvillage").attr("disabled", true);
            $("select#birth_legal_bir_le_birth_state").val(State);
            $("select#birth_legal_bir_le_birth_state").attr("disabled", "disabled");
            $("select#birth_legal_bir_le_birth_district").val(District);
            $("select#birth_legal_bir_le_birth_district").attr("disabled", "disabled");
            $("select#birth_legal_bir_le_birth_sub_district").val(Subdistrict);
            $("select#birth_legal_bir_le_birth_sub_district").attr("disabled", "disabled");
            $("input#birth_legal_bir_le_birth_pincode").val(Pincode);
            $("input#birth_legal_bir_le_birth_pincode").attr("readonly", false);
			//-----------------------------------------------------------
			// ADDED ON 28012015 HITESH TO POPULATE SL VALUES
			//-----------------------------------------------------------

            $("input#birth_legal_bir_le_birth_bldg_SL").val(BldgName_SL);
            $("input#birth_legal_bir_le_birth_bldg_SL").attr("readonly", true);
            $("input#birth_legal_bir_le_birth_house_no_SL").val(HouseNo_SL);
            $("input#birth_legal_bir_le_birth_house_no_SL").attr("readonly", true);
            $("input#birth_legal_bir_le_birth_street_name_SL").val(Street_SL);
            $("input#birth_legal_bir_le_birth_street_name_SL").attr("readonly", true);
            $("input#birth_legal_bir_le_birth_postoffice_SL").val(PostOffice_SL);
            $("input#birth_legal_bir_le_birth_postoffice_SL").attr("readonly", true);

            //get selected village options as well as the selected option
            var parent_village = $("#birth_legal_bir_le_parent_cityvillage");
            var birth_village = $("#birth_legal_bir_le_birth_cityvillage");
            var parent_sub_dist_options = parent_village.parent().children().html();
            $("#birth_legal_bir_le_birth_cityvillage").html(parent_sub_dist_options);
            birth_village.val(parent_village.val());
            birth_village.attr("disabled", "disabled");


            //get selected subdistrict options as well as selected option
            var parent_sub_dist = $("#birth_legal_bir_le_parent_sub_district");
            var birth_sub_dist = $("#birth_legal_bir_le_birth_sub_district");
            var parent_sub_dist_options = parent_sub_dist.parent().children().html();
            $("#birth_legal_bir_le_birth_sub_district").html(parent_sub_dist_options);
            birth_sub_dist.val(parent_sub_dist.val());
            birth_sub_dist.attr("disabled", "disabled");

			//-----------------------------------------------------------
			// ADDED ON 28012015 HITESH TO POPULATE SL VALUES
			//-----------------------------------------------------------

            var gramPanchayat = $('#gramPanchayatParent option:selected').val();
          //  $("#gramPanchayatBirth").val(gramPanchayat);
        }
		else
		{
            $("input#birth_legal_bir_le_birth_bldg").val('');
            $("input#birth_legal_bir_le_birth_bldg").attr("readonly", false);
            $("input#birth_legal_bir_le_birth_house_no").val('');
            $("input#birth_legal_bir_le_birth_house_no").attr("readonly", false);
            $("input#birth_legal_bir_le_birth_street_name").val('');
            $("input#birth_legal_bir_le_birth_street_name").attr("readonly", false);
            $("input#birth_legal_bir_le_birth_postoffice").val('');
            $("input#birth_legal_bir_le_birth_postoffice").attr("readonly", false);
            $("input#birth_legal_bir_le_birth_cityvillage").val('');
            $("input#birth_legal_bir_le_birth_cityvillage").attr("disabled", false);
            $("select#birth_legal_bir_le_birth_state").val('');
            $("select#birth_legal_bir_le_birth_state").attr("disabled", false);
            $("select#birth_legal_bir_le_birth_district").val('');
            $("select#birth_legal_bir_le_birth_district").attr("disabled", false);
            $("input#birth_legal_bir_le_birth_pincode").val('');
            $("select#birth_legal_bir_le_birth_sub_district").val(Subdistrict);
            $("select#birth_legal_bir_le_birth_sub_district").attr("disabled", true);
            $("input#birth_legal_bir_le_birth_pincode").attr("readonly", false);

            $("input#birth_legal_bir_le_birth_bldg_SL").val('');
            $("input#birth_legal_bir_le_birth_bldg_SL").attr("readonly", false);
            $("input#birth_legal_bir_le_birth_house_no_SL").val('');
            $("input#birth_legal_bir_le_birth_house_no_SL").attr("readonly", false);
            $("input#birth_legal_bir_le_birth_street_name_SL").val('');
            $("input#birth_legal_bir_le_birth_street_name_SL").attr("readonly", false);
            $("input#birth_legal_bir_le_birth_postoffice_SL").val('');
            $("input#birth_legal_bir_le_birth_postoffice_SL").attr("readonly", false);

			//remove the options
            $("#birth_legal_bir_le_birth_cityvillage").html('');
			var empty_village = document.createElement('option');
            empty_village.value = '';
            empty_village.innerHTML = "Select Village/Town";
            $("#birth_legal_bir_le_birth_cityvillage").append(empty_village);
            $("#birth_legal_bir_le_birth_cityvillage").attr("disabled", false);

            $("#birth_legal_bir_le_birth_sub_district").html('');
			var empty_sub_district = document.createElement('option');
            empty_sub_district.value = '';
            empty_sub_district.innerHTML = "Select Sub District";
            $("#birth_legal_bir_le_birth_sub_district").append(empty_sub_district);
            $("#birth_legal_bir_le_birth_sub_district").attr("disabled", false);

        }
    },
    editCheckBoxClickForParentChildbirthAddressEnable: function()
	{
	    var BState = jQuery.trim($("#birth_legal_bir_le_birth_state option:selected").val());
        var State = jQuery.trim($("#birth_legal_bir_le_parent_state option:selected").val());
        var District = jQuery.trim($("#birth_legal_bir_le_parent_district option:selected").val());
        var Pincode = jQuery.trim($("#birth_legal_bir_le_parent_pincode").val());
        var Subdistrict = jQuery.trim($("#birth_legal_bir_le_parent_sub_district option:selected").val());
        var VillageTown = jQuery.trim($("#birth_legal_bir_le_parent_cityvillage option:selected").val());
        $("input#birth_legal_bir_le_birth_bldg").val('');
        $("input#birth_legal_bir_le_birth_bldg").attr("readonly", false);
        $("input#birth_legal_bir_le_birth_house_no").val('');
        $("input#birth_legal_bir_le_birth_house_no").attr("readonly", false);
        $("input#birth_legal_bir_le_birth_street_name").val('');
        $("input#birth_legal_bir_le_birth_street_name").attr("readonly", false);
        $("input#birth_legal_bir_le_birth_postoffice").val('');
        $("input#birth_legal_bir_le_birth_postoffice").attr("readonly", false);
        // $("select#birth_legal_bir_le_birth_state").val(State);
        $("select#birth_legal_bir_le_birth_state").attr("disabled", true);
        // $("select#birth_legal_bir_le_birth_district").val(District);
        $("select#birth_legal_bir_le_birth_district").attr("disabled", true);
        $("input#birth_legal_bir_le_birth_pincode").val('');
        // $("select#birth_legal_bir_le_birth_sub_district").val(Subdistrict);
		if(BState==6)
	    $("select#birth_legal_bir_le_birth_sub_district").attr("disabled", false);
		else
        $("select#birth_legal_bir_le_birth_sub_district").attr("disabled", true);
        // $("select#birth_legal_bir_le_birth_cityvillage").val(VillageTown);
        $("select#birth_legal_bir_le_birth_cityvillage").attr("disabled", false);
        $("input#birth_legal_bir_le_birth_pincode").attr("readonly", false);

    },
    /////////////////////////////////////
    validateChildName: function(childFirstName,editFormId){
        $('#submit').click(function() {
            if ($('#frmBirthRegStep1').valid()) {
                if(editFormId > 0){
                    if(childFirstName != $('#birth_legal_bir_le_child_fname').val()){
                        var r = confirm("Do you have relevant documents / permission for taking up the correction? ?");
                        if (r == false)
                        {
                            $('#birth_legal_bir_le_child_fname').focus();
                            return false;
                        }
                    }
                }
            }
        })
    },


    formSubmit: function() {
        $('#submit').click(function() {
            if ($('#frmBirthRegStep1').valid()) {

                //========================TO CONFIRM TO CONTINUE WITHOUT FATHER'S ==========
                //==========================INFORMATION =====================
                if(!($('#birth_legal_bir_le_father_fname').val()) && !($('#birth_legal_bir_le_mother_fname').val())){
                    // var flagSet;
                    var r = confirm("Father's Name left blank.\r\nMother\'s Name left blank.Do you want to continue ?");
                    if (r == false)
                    {
                        $('#birth_legal_bir_le_father_fname').focus();
                        return false;
                    }
                }
                else if($('#birth_legal_bir_le_father_fname').val() &&!($('#birth_legal_bir_le_mother_fname').val())){
                    // var flagSet;
                    var r = confirm("Mother\'s Name left blank.Do you want to continue ?");
                    if (r == false)
                    {
                        $('#birth_legal_bir_le_mother_fname').focus();
                        return false;
                    }
                }
                else if((!$('#birth_legal_bir_le_father_fname').val()) && $('#birth_legal_bir_le_mother_fname').val()){
                    // var flagSet;
                    var r = confirm("Father\'s Name left blank.Do you want to continue ?");
                    if (r == false)
                    {
                        $('#birth_legal_bir_le_father_fname').focus();
                        return false;
                    }
                }

                $("#birth_legal_bir_le_perm_state").attr("disabled", false);
                $("#birth_legal_bir_le_perm_district").attr("disabled", false);
                $("#birth_legal_bir_le_perm_sub_district").attr("disabled", false);
                $("#birth_legal_bir_le_perm_cityvillage").attr("disabled", false);
                $("#birth_legal_bir_le_birth_state").attr("disabled", false);
                $("#birth_legal_bir_le_birth_district").attr("disabled", false);
                $("#birth_legal_bir_le_birth_sub_district").attr("disabled", false);
                $("#birth_legal_bir_le_birth_cityvillage").attr("disabled", false);
                $("#gramPanchayatPermanent").attr("disabled", false);
                $("#gramPanchayatBirth").attr("disabled", false);

            }
             /*var dob = $('#birth_legal_bir_le_dob').val();
            var childF = $('#birth_legal_bir_le_child_fname').val();
            var childM = $('#birth_legal_bir_le_child_mname').val();
            var childL = $('#birth_legal_bir_le_child_lname').val();
            var childName = childF + '' + childM + '' + childL;
            var fatherF = $('#birth_legal_bir_le_father_fname').val();
            var fatherM = $('#birth_legal_bir_le_father_mname').val();
            var fatherL = $('#birth_legal_bir_le_father_lname').val();
            var fatherName = fatherF + '' + fatherM + '' + fatherL;
            var motherF = $('#birth_legal_bir_le_mother_fname').val();
            var motherM = $('#birth_legal_bir_le_mother_mname').val();
            var motherL = $('#birth_legal_bir_le_mother_lname').val();
            var motherName = motherF + '' + motherM + '' + motherL;



            var valFlag;
            Utilities.ajaxBlockUI();
            $.ajax({
                url: BirthLegalForm.urlAjax + "/getDuplicateData?dob=" + dob + "&childname=" + childName + "&fathername=" + fatherName + "&mothername=" + motherName,
                async: false,
                success: function(response) {
                    var data = json_parse(response);
                    var formType = $("#editCheck").val();
                    var duplicateStatus = false;
                    if (formType == 1) {
                        if (data > 0)
                            duplicateStatus = true;
                    }
                    else if (formType = 2) {
                        if (data > 1)
                            duplicateStatus = true;
                    }
                    if (duplicateStatus == true) {
                        var r = confirm("Record with Date of Birth, Child Name, Father Name, Mother Name Already Exist. Do you want to continue?");
                        if (r == false) {
                            valFlag = false;
                        } else
                            valFlag = true;
                    }
                }
            });
            if (!valFlag)
                return valFlag;   */

        });

		//--------------------------------------------------------------------------------------------------------------------------------------
		// Used In Old Birth Registered Event
		 $('#fullsubmit').click(function() {
            if ($('#frmBirthRegStep1').valid()) {

                //========================TO CONFIRM TO CONTINUE WITHOUT FATHER'S ==========
                //==========================INFORMATION =====================
                if(!($('#birth_legal_bir_le_father_fname').val()) && !($('#birth_legal_bir_le_mother_fname').val())){
                    // var flagSet;
                    var r = confirm("Father\'s Name left blank.\r\nMother\'s Name left blank.Do you want to continue ?");
                    if (r == false)
                    {
                        $('#birth_legal_bir_le_father_fname').focus();
                        return false;
                    }
                }
                else if($('#birth_legal_bir_le_father_fname').val() &&!($('#birth_legal_bir_le_mother_fname').val())){
                    // var flagSet;
                    var r = confirm("Mother\'s Name left blank.Do you want to continue ?");
                    if (r == false)
                    {
                        $('#birth_legal_bir_le_mother_fname').focus();
                        return false;
                    }
                }
                else if((!$('#birth_legal_bir_le_father_fname').val()) && $('#birth_legal_bir_le_mother_fname').val()){
                    // var flagSet;
                    var r = confirm("Father\'s Name left blank.Do you want to continue ?");
                    if (r == false)
                    {
                        $('#birth_legal_bir_le_father_fname').focus();
                        return false;
                    }
                }

                $("#birth_legal_bir_le_perm_state").attr("disabled", false);
                $("#birth_legal_bir_le_perm_district").attr("disabled", false);
                $("#birth_legal_bir_le_perm_sub_district").attr("disabled", false);
                $("#birth_legal_bir_le_perm_cityvillage").attr("disabled", false);
                $("#birth_legal_bir_le_birth_state").attr("disabled", false);
                $("#birth_legal_bir_le_birth_district").attr("disabled", false);
                $("#birth_legal_bir_le_birth_sub_district").attr("disabled", false);
                $("#birth_legal_bir_le_birth_cityvillage").attr("disabled", false);
                $("#gramPanchayatPermanent").attr("disabled", false);
                $("#gramPanchayatBirth").attr("disabled", false);

            }


        });

		//-------------------------------------------------------------------------------------------------------------------------------------

    },
    getAllDropDownDetails: function(getAllDropDownDetailsUrl) {
        var _this = this;
        Utilities.ajaxBlockUI();
        $.ajax({
            url: getAllDropDownDetailsUrl,
            type: "POST",
            async: false,
            success: function(response) {
                var respData = json_parse(response);
                _this.fillAllDDOptions(respData);
                if(BirthLegalForm.editFormId == 0){
                    _this.fillGramPanchayatOptions(respData);
                }

            }
        });
        _this.dropDownFieldsToShowToolTip();
    },
    fillAllDDOptions: function(respData) {
        var fourDDArray = [
        //            'birth_legal_bir_le_parent_state', // commenting state as it's coming by default from the form
        'birth_legal_bir_le_parent_district',
        'birth_legal_bir_le_parent_sub_district',
        'birth_legal_bir_le_parent_cityvillage',
        ];
        //====SEPERATING THE DISTRICT, SUB-DISTRICT AND VILLAGE TOWN ARRAY TO FILL THEM IN ONE SHOT
        var districtDDArray = [];
        var subDistrictDDArray = [];
        var cityVillageDDArray = [];
        var intial;
        if (BirthLegalForm.editFormId == 0) //if edit then only birth drop down should be selected by default values
            intial = 0
        else
            intial = 2;

        for (var i = intial; i < 3; i++) {
            $.each(fourDDArray, function(index, value) {
                if (i == 1) {
                    if(value!==undefined)
                        value = value.replace('parent', 'perm');
                } else if (i == 2) {
                    if(value!==undefined)
                        value = value.replace('parent', 'birth');
                }
                //        alert(value);

                //        if (value.indexOf("district") != -1) {
                //          if (value.indexOf("sub_district") == -1) { // checking twice as the distrcit also comes in sub_district so this array contain dounble element of itself and of subdistrict
                //            districtDDArray.push(value);
                //          }
                //        }
                //        if (value.indexOf("sub_district") != -1)
                //          subDistrictDDArray.push(value);
                //        if (value.indexOf("cityvillage") != -1)
                //          cityVillageDDArray.push(value);

                if (/district/i.test(value)) {
                    if (/sub_district/i.test(value) == false) { // checking twice as the distrcit also comes in sub_district so this array contain dounble element of itself and of subdistrict
                        districtDDArray.push(value);
                    }
                }
                if (/sub_district/i.test(value))
                    subDistrictDDArray.push(value);
                if (/cityvillage/i.test(value))
                    cityVillageDDArray.push(value);
            });
        }

        //=====================FILLING DISTRICT ARRAY===========================
        $.each(districtDDArray, function(index, value) {
            var elementId = "#" + value;
            //            $(elementId).find('option').remove(); // REMOVING ALL CURRENTLY APPENDED ELEMENTS
            $.each(respData['district'], function(respValue, respText) {
                $(elementId).append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });
            //======================FILING DEFAULT VALUES=======================
            $(elementId).val(respData['default-district']);
        });
        //=====================FILLING SUB DISTRICT ARRAY=======================
        $.each(subDistrictDDArray, function(index, value) {
            var elementId = "#" + value;
            //            $(elementId).find('option').remove(); // REMOVING ALL CURRENTLY APPENDED ELEMENTS
            $.each(respData['sub-district'], function(respValue, respText) {
                $(elementId).append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });
            //======================FILING DEFAULT VALUES=======================
            $(elementId).val(respData['default-sub-district']);
        });
        //        //====================FILLING VILLAGE TOWN ARRAY========================

        $.each(cityVillageDDArray, function(index, value) {
            var elementId = "#" + value;
            $(elementId).find('option').remove(); // REMOVING ALL CURRENTLY APPENDED ELEMENTS
            $.each(respData['vill-town'], function(respValue, respText) {
                $(elementId).append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });
            //======================FILING DEFAULT VALUES=======================
            $(elementId).val(respData['default-vill-town']);
        });
        //============AND FINALLY FILING THE STATE USER LOGIN WITH==============
        if (BirthLegalForm.editFormId == 0) { //if edit then only birth drop down should be selected by default values
            $("#birth_legal_bir_le_parent_state").val(respData['default-state']);
            $("#birth_legal_bir_le_perm_state").val(respData['default-state']);
            $("#birth_legal_bir_le_birth_state").val(respData['default-state']);
        }
    },
    fillGramPanchayatOptions: function(respData) {
        if($.isEmptyObject(respData['default-vill-town']) == true){
            if($.isEmptyObject(respData['default-gram-panchayat'][respData['default-sub-district']]) == false){ // where gram panchayat exsists
                var _this = this;
                var defaultParam = respData['default-gram-panchayat'][respData['default-sub-district']]['defaultGramPanchayat'];

                var gramPanchayatArr = [
                "#gramPanchayatPermanent",
                "#gramPanchayatParent",
                "#gramPanchayatBirth"
                ];

                var villageTownArr = [
                "#birth_legal_bir_le_parent_cityvillage",
                "#birth_legal_bir_le_perm_cityvillage",
                "#birth_legal_bir_le_birth_cityvillage"
                ];

                for(var i = 0; i < gramPanchayatArr.length; i++){
                    if(i == 2){
                        $(gramPanchayatArr[i]).attr('disabled', true);
                    //$('#birth_legal_bir_le_birth_cityvillage').attr('disabled', false);
                    }
                    else{
                        $(gramPanchayatArr[i]).attr('disabled', false);
                    }

                    var panchayatDetailParam = respData['default-gram-panchayat'][respData['default-sub-district']]['panchayatDetail'];
                    var villageNamesParam = respData['default-gram-panchayat'][respData['default-sub-district']]['villageNames'];
                    _this.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, gramPanchayatArr[i], villageTownArr[i] );

                    //                // ONLY FOR EDIT
                    $(villageTownArr[i]).empty().append(
                        $('<option></option>').val("").html('Select Village/Town')
                        );

                    $.each(villageNamesParam[defaultParam], function(index, value) {
                        $(villageTownArr[i]).append(
                            $('<option></option>').val(index).html(value)
                            );
                    });

                    //===SETTING THE VALUES OF GRAM PANCHAYAT AND VILLAGE TOWN DROP DOWN====
                    var myText = defaultParam;
                    $(gramPanchayatArr[i] + ' option[value="' + myText + '"]').prop('selected', true);


                }
            }
            else{
                $("#gramPanchayatParent").attr('disabled', true);
                $("#gramPanchayatPermanent").attr('disabled', true);
                $("#gramPanchayatBirth").attr('disabled', true);
            //   $('#birth_legal_bir_le_birth_cityvillage').attr('disabled', 'disabled');
            }
        }
        else{
            $("#gramPanchayatParent").attr('disabled', true);
            $("#gramPanchayatPermanent").attr('disabled', true);
            $("#gramPanchayatBirth").attr('disabled', true);
        //   $('#birth_legal_bir_le_birth_cityvillage').attr('disabled', 'disabled');
        }

    },
    fillGramPanchayatOptionsValuesNew: function(panchayatDetailParam, villageNamesParam, gramPanchayatArr, villageTownArr) {
        // EMPTY THE VILLAGE TOWN DROP DOWN

        $(villageTownArr).empty().append(
            $('<option></option>').val("").html('Select Village/Town')
            );

        $(gramPanchayatArr).empty().append(
            $('<option></option>').val("").html('Select Gram Panchayat')
            );
        $.each(panchayatDetailParam, function(index, value) {
            $(gramPanchayatArr).append(
                $('<option></option>').val(index).html(value)
                );
        });

    //        $(gramPanchayatArr).unbind("change");
    //        $(gramPanchayatArr).change(function(){
    //            $(villageTownArr).empty().append(
    //                $('<option></option>').val("").html('Select Village/Town')
    //                );
    //
    //            var selectGramPanchayat = $(this).val();
    //            if(selectGramPanchayat){
    //                $.each(villageNamesParam[selectGramPanchayat], function(index, value) {
    //                    $(villageTownArr).append(
    //                        $('<option></option>').val(index).html(value)
    //                        );
    //                });
    //            }
    //        });

    },
    fillGramPanchayatOptionsValues: function(panchayatDetailParam, villageNamesParam) {
        // EMPTY THE VILLAGE TOWN DROP DOWN
        $("#birth_legal_bir_le_parent_cityvillage").empty().append(
            $('<option></option>').val("").html('Select Village/Town')
            );
        $("#gramPanchayatParent").empty().append(
            $('<option></option>').val("").html('Select Gram Panchayat')
            );
        $.each(panchayatDetailParam, function(index, value) {
            $("#gramPanchayatParent").append(
                $('<option></option>').val(index).html(value)
                );
        });

        $("#gramPanchayatParent").change(function(){
            $("#birth_legal_bir_le_parent_cityvillage").empty().append(
                $('<option></option>').val("").html('Select Village/Town')
                );

            var selectGramPanchayat = $(this).val();
            if(selectGramPanchayat){
                $.each(villageNamesParam[selectGramPanchayat], function(index, value) {
                    $("#birth_legal_bir_le_parent_cityvillage").append(
                        $('<option></option>').val(index).html(value)
                        );
                });
            }
        });

    },
    //========================HANDLING THE EDIT FORMS===========================
    getAllDropDownEditDetails: function() {
        var _this = this;
        var respData;
        //========================FOR GETTING ALL FILLED DATA===================
        Utilities.ajaxBlockUI();
        $.ajax({
            url: BirthLegalForm.editDetailsUrl,
            type: "POST",
            data: ({
                legalFormId: BirthLegalForm.editFormId
            }),
            async: false,
            success: function(response) {
                respData = json_parse(response);
                //=========ONLY FOR PARENT AND PERMANENT ADDRESS DROP DOWN======
                _this.fillParentAddressAtBirthDD(respData);
                _this.fillPermanentAddressDD(respData);
                _this.fillPOBAddressDD(respData);
                _this.selectDDValues(respData)
					//blocked by ashish 11-05-17
                //_this.fillGramPanchayatOptionsForEdit(respData);
				//blocked by ashish 11-05-17
            //==============================================================
            }
        });
        _this.dropDownFieldsToShowToolTip();

    //THIS WILL HANDLE THE REST OF THE FORM JS LIKE SHOWING AND HIDING OF FIELDS IN EDIT FORM
    //        _this.handleRestOfLegalEditForm();
    },
    fillGramPanchayatOptionsForEdit: function(respData) {


        var _this = this;
        //============================FOR PARENT ADDRESS============================
        var data1 =  respData['selectedValues']['parentAddDDValues']['grampanchayat'];
        var data2 = respData['selectedValues']['permanentAddDDValues']['grampanchayat'];
        var data3 = respData['selectedValues']['pobAddDDValues']['grampanchayat'];

        //var data4 = respData['selectedValues']['pobAddDDValues']['village-town'];

        if(data1 != null){
            // where gram panchayat exsists
            $("#gramPanchayatParent").attr('disabled', false);
            var subDistrict = respData['selectedValues']['parentAddDDValues']['sub-district'];
			//blocked by ashish 5-11-17
            //var panchayatDetailParam = respData['parentGramPanchayat'][subDistrict]['panchayatDetail'];
			//blocked by ashish 5-11-17
            var villageNamesParam = respData['villageGramPanchayat'][subDistrict]['villageNames'];

            _this.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, "#gramPanchayatParent", "#birth_legal_bir_le_parent_cityvillage");

            // ONLY FOR EDIT
            $("#birth_legal_bir_le_parent_cityvillage").empty().append(
                $('<option></option>').val("").html('Select Village/Town')
                );

            $.each(villageNamesParam, function(index, value) {
                $("#birth_legal_bir_le_parent_cityvillage").append(
                    $('<option></option>').val(index).html(value)
                    );
            });
            //===SETTING THE VALUES OF GRAM PANCHAYAT AND VILLAGE TOWN DROP DOWN====
            $("#gramPanchayatParent").val(respData['selectedValues']['parentAddDDValues']['grampanchayat']);
            $("#birth_legal_bir_le_parent_cityvillage").val(respData['selectedValues']['parentAddDDValues']['village-town']);

        }
        else{
            $("#gramPanchayatParent").attr('disabled', true);
        }


        //==========================FOR PERMANENT ADDRESS===========================

        if(data2 != null){// where gram panchayat exists
            if ($('#birth_legal_is_perm_same').is(":checked"))
                $("#gramPanchayatPermanent").attr('disabled', true);
            else
                $("#gramPanchayatPermanent").attr('disabled', false);
            var subPermDistrict = respData['selectedValues']['permanentAddDDValues']['sub-district'];
            var panchayatDetailParamPermanent = respData['permanentGramPanchayat'][subPermDistrict]['panchayatDetail'];
            var villageNamesParamPermanent = respData['villagePermanentGramPanchayat'][subPermDistrict]['villageNames'];
            //      _this.fillGramPanchayatOptionsValues(panchayatDetailParam, villageNamesParam);
            _this.fillGramPanchayatOptionsValuesNew(panchayatDetailParamPermanent, villageNamesParamPermanent, "#gramPanchayatPermanent", "#birth_legal_bir_le_perm_cityvillage");

            // ONLY FOR EDIT
            $("#birth_legal_bir_le_perm_cityvillage").empty().append(
                $('<option></option>').val("").html('Select Village/Town')
                );

            $.each(villageNamesParamPermanent, function(index, value) {
                $("#birth_legal_bir_le_perm_cityvillage").append(
                    $('<option></option>').val(index).html(value)
                    );
            });

            //===SETTING THE VALUES OF GRAM PANCHAYAT AND VILLAGE TOWN DROP DOWN====
            $("#gramPanchayatPermanent").val(respData['selectedValues']['permanentAddDDValues']['grampanchayat']);
            $("#birth_legal_bir_le_perm_cityvillage").val(respData['selectedValues']['permanentAddDDValues']['village-town']);

        }
        else{
            $("#gramPanchayatPermanent").attr('disabled', true);
        }

        //==========================FOR PLACE OF BIRTH===========================

        if(data3 != null ){
            var subpobDistrict = respData['selectedValues']['pobAddDDValues']['sub-district'];
            if($.isEmptyObject(respData['pobGramPanchayat'][subpobDistrict]) == false){  // where gram panchayat exsists
                $("#gramPanchayatBirth").attr('disabled', true);
                var panchayatDetailParambirth = respData['pobGramPanchayat'][subpobDistrict]['panchayatDetail'];
                if(respData['selectedValues']['pobAddDDValues']['village-town'])
                    var villageNamesParambirth = respData['villagepobGramPanchayat'][subpobDistrict]['villageNames'];
                else
                {
                    var villageNamesParambirth = respData['pobGramPanchayat'][subpobDistrict]['villageNames'][respData['selectedValues']['pobAddDDValues']['grampanchayat']];
                }

                _this.fillGramPanchayatOptionsValuesNew(panchayatDetailParambirth, villageNamesParambirth, "#gramPanchayatBirth", "#birth_legal_bir_le_birth_cityvillage");
                // ONLY FOR EDIT

                $("#birth_legal_bir_le_birth_cityvillage").empty().append(
                    $('<option></option>').val("").html('Select Village/Town')
                    );
                $.each(villageNamesParambirth, function(index, value) {
                    $("#birth_legal_bir_le_birth_cityvillage").append($('<option></option>').val(index).html(value));
                });


                //===SETTING THE VALUES OF GRAM PANCHAYAT AND VILLAGE TOWN DROP DOWN====
                $("#gramPanchayatBirth").val(respData['selectedValues']['pobAddDDValues']['grampanchayat']);
                $("#birth_legal_bir_le_birth_cityvillage").val(respData['selectedValues']['pobAddDDValues']['village-town']);

            }
        }
        else{
            $("#gramPanchayatBirth").attr('disabled', true);

        }

    //        else {
    //            if($.isEmptyObject(respData['pobGramPanchayat'][subpobDistrict]) == false){
    //                var panchayatDetailbirth = respData['pobGramPanchayat'][subpobDistrict]['panchayatDetail'];
    //                 var villageNamesParambirth = respData['parentGramPanchayat'][subpobDistrict]['villageNames'];
    //                $("#gramPanchayatBirth").attr('disabled', true);
    //            }
    //        }

    },
    fillParentAddressAtBirthDD: function(respData) {
        //=====SETTING SELECTED STATE VALUE AS STATE ARE BY-DEFAULT COMES=======
        //        console.log(respData['selectedValues']['parentAddDDValues']['state'])
        //        $("#birth_legal_bir_le_parent_state").val(respData['selectedValues']['parentAddDDValues']['state']);

        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_legal_bir_le_parent_district").find('option').remove();
        $("#birth_legal_bir_le_parent_district").append(
            $('<option></option>').val("").html("Select District")
            );

        $.each(respData['parentAddDDFilledData']['districtArr'], function(respValue, respText) {
            $("#birth_legal_bir_le_parent_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //====SETTING sub DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_legal_bir_le_parent_sub_district").find('option').remove();
        $("#birth_legal_bir_le_parent_sub_district").append(
            $('<option></option>').val("").html("Select Sub-District")
            );

        $.each(respData['parentAddDDFilledData']['subDistrictArr'], function(respValue, respText) {
            $("#birth_legal_bir_le_parent_sub_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_legal_bir_le_parent_cityvillage").find('option').remove();

        $.each(respData['parentAddDDFilledData']['villageTownArr'], function(respValue, respText) {
            $("#birth_legal_bir_le_parent_cityvillage").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

    //        $("#birth_legal_bir_le_parent_state").val(respData['selectedValues']['parentAddDDValues']['district']);
    //======================================================================

    },
    fillPermanentAddressDD: function(respData) {
        //=====SETTING SELECTED STATE VALUE AS STATE ARE BY-DEFAULT COMES=======
        //        $("#birth_legal_bir_le_perm_state").val(respData['selectedValues']['permanentAddDDValues']['state']);

        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_legal_bir_le_perm_district").find('option').remove();
        $("#birth_legal_bir_le_perm_district").append(
            $('<option></option>').val("").html("Select District")
            );

        $.each(respData['permanentAddDDFilledData']['districtArr'], function(respValue, respText) {
            $("#birth_legal_bir_le_perm_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //        $("#birth_legal_bir_le_perm_district").val(respData['selectedValues']['permanentAddDDValues']['district']);
        //======================================================================
        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_legal_bir_le_perm_sub_district").find('option').remove();
        $("#birth_legal_bir_le_perm_sub_district").append(
            $('<option></option>').val("").html("Select Sub-District")
            );

        $.each(respData['permanentAddDDFilledData']['subDistrictArr'], function(respValue, respText) {
            $("#birth_legal_bir_le_perm_sub_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_legal_bir_le_perm_cityvillage").find('option').remove();

        $.each(respData['permanentAddDDFilledData']['villageTownArr'], function(respValue, respText) {
            $("#birth_legal_bir_le_perm_cityvillage").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });
    //    sortArrayByValue: function(){
    //        masterList.sort(function (a, b) {
    //    return a.val.localeCompare( b.val );
    //        });
    //    }
    },
    fillPOBAddressDD: function(respData) {
        if($.isEmptyObject(respData['pobAddDDValues']) == false){
            //=====SETTING SELECTED STATE VALUE AS STATE ARE BY-DEFAULT COMES=======
            //        $("#birth_legal_bir_le_perm_state").val(respData['selectedValues']['permanentAddDDValues']['state']);

            //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
            $("#birth_legal_bir_le_birth_district").find('option').remove();
            $("#birth_legal_bir_le_birth_district").append(
                $('<option></option>').val("").html("Select District")
                );

            $.each(respData['pobAddDDValues']['districtArr'], function(respValue, respText) {
                $("#birth_legal_bir_le_birth_district").append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });

            //        $("#birth_legal_bir_le_perm_district").val(respData['selectedValues']['permanentAddDDValues']['district']);
            //======================================================================
            //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
            $("#birth_legal_bir_le_birth_sub_district").find('option').remove();
            $("#birth_legal_bir_le_birth_sub_district").append(
                $('<option></option>').val("").html("Select Sub-District")
                );

            $.each(respData['pobAddDDValues']['subDistrictArr'], function(respValue, respText) {
                $("#birth_legal_bir_le_birth_sub_district").append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });

            //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
            $("#birth_legal_bir_le_birth_cityvillage").find('option').remove();

            $.each(respData['pobAddDDValues']['villageTownArr'], function(respValue, respText) {
                $("#birth_legal_bir_le_birth_cityvillage").append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });
        }

    },
    selectDDValues: function(respData) {
        //==========PRESENT ADDRESS VALUES SELECTION=====================
        $("#birth_legal_bir_le_parent_state").val(respData['selectedValues']['parentAddDDValues']['state']);
        $("#birth_legal_bir_le_parent_district").val(respData['selectedValues']['parentAddDDValues']['district']);
        $("#birth_legal_bir_le_parent_sub_district").val(respData['selectedValues']['parentAddDDValues']['sub-district']);
        $("#birth_legal_bir_le_parent_cityvillage").val(respData['selectedValues']['parentAddDDValues']['village-town']);
        //==========PERMANENT ADDRESS VALUES SELECTION===================
        $("#birth_legal_bir_le_perm_state").val(respData['selectedValues']['permanentAddDDValues']['state']);
        $("#birth_legal_bir_le_perm_district").val(respData['selectedValues']['permanentAddDDValues']['district']);
        $("#birth_legal_bir_le_perm_sub_district").val(respData['selectedValues']['permanentAddDDValues']['sub-district']);
        $("#birth_legal_bir_le_perm_cityvillage").val(respData['selectedValues']['permanentAddDDValues']['village-town']);
        //==========PLACE OF BIRTH ADDRESS VALUES SELECTION===================
        $("#birth_legal_bir_le_birth_state").val(respData['selectedValues']['pobAddDDValues']['state']);
        $("#birth_legal_bir_le_birth_district").val(respData['selectedValues']['pobAddDDValues']['district']);
        $("#birth_legal_bir_le_birth_sub_district").val(respData['selectedValues']['pobAddDDValues']['sub-district']);
        $("#birth_legal_bir_le_birth_cityvillage").val(respData['selectedValues']['pobAddDDValues']['village-town']);

    },
    replacePincodeZero: function() {
        $("#birth_legal_bir_le_parent_pincode").blur(function() {
            var elementValue = $(this).val();
            var elementValue = parseInt(elementValue);
            if(isNaN(elementValue))
                $(this).val('');
            else
                $(this).val(elementValue);

        //$("#birth_legal_bir_le_parent_pincode").focus();
        });
        $("#birth_legal_bir_le_perm_pincode").blur(function() {
            var elementValue = $(this).val();
            var elementValue = parseInt(elementValue);
            if(isNaN(elementValue))
                $(this).val('');
            else
                $(this).val(elementValue);
        // $("#birth_legal_bir_le_perm_pincode").focus();
        });
        $("#birth_legal_bir_le_informant_pincode").blur(function() {
            var elementValue = $(this).val();
            var elementValue = parseInt(elementValue);
            if(isNaN(elementValue))
                $(this).val('');
            else
                $(this).val(elementValue);
        //  $("#birth_legal_bir_le_informant_pincode").focus();
        });
    }
}


var StatisticalForm = {
    inIt: function(urlAjax, getAllDropDownDetailsUrl, currentLegalFormId, getAllDropDownEditDetailsUrl, getAllDropDownEditDetailsForPart2AjaxUrl, editFormId, getBirthPlaceUrl, getDeliveryAttentionUrl, getDeliveryMethodUrl,noaId) {
        this.urlAjax = urlAjax;
        this.editDetailsUrl = getAllDropDownEditDetailsUrl;
        this.currentLegalFormId = currentLegalFormId;
        this.registrationFormDataUrl = getAllDropDownEditDetailsForPart2AjaxUrl;
        this.birthPlaceUrl = getBirthPlaceUrl;
        this.deliveryAttention = getDeliveryAttentionUrl;
        this.deliveryMethodUrl = getDeliveryMethodUrl;
        this.editFormId  = editFormId;
		 this.noaId  = noaId;
        var _this = this;
        var birthPlaceGlobal;
        _this.checkBoxAddressCopy(getAllDropDownDetailsUrl);
        _this.radioButtonChange();
        _this.validateForm();
        _this.formSubmit();
        _this.deliveryTypeAttention();
        if (editFormId > 0) {
            _this.getAllDropDownEditDetails();
        }
        else {
            _this.getAllDropDownDetails(getAllDropDownDetailsUrl);
        }


    },
    getAllDropDownDetails: function(getAllDropDownDetailsUrl) {
        var _this = this;
        Utilities.ajaxBlockUI();
        $.ajax({
            url: getAllDropDownDetailsUrl,
            type: "POST",
            async: false,
            success: function(response) {
                var respData = json_parse(response);
                _this.fillAllDDOptions(respData);
                //if(StatisticalForm.editFormId == 0){
                _this.fillGramPanchayatOptions(respData);
            // }
            }
        });
    },
    fillAllDDOptions: function(respData) {

        //=====================FILLING DISTRICT ARRAY===========================
        //======================FILING DEFAULT VALUES=======================

        //=====================FILLING DISTRICT ARRAY===========================
        $("#birth_stat_bir_st_district").find('option').remove();
        //           $(elementId).find('option').remove(); // REMOVING ALL CURRENTLY APPENDED ELEMENTS
        $("#birth_stat_bir_st_district").append(
            $('<option></option>').val('').html('Select District')
            );
        $.each(respData['district'], function(respValue, respText) {
            $("#birth_stat_bir_st_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });
        //======================FILING DEFAULT VALUES=======================

        //=====================FILLING SUB DISTRICT ARRAY=======================
        //            $(elementId).find('option').remove(); // REMOVING ALL CURRENTLY APPENDED ELEMENTS
        $("#birth_stat_bir_st_sub_district").find('option').remove();
        $("#birth_stat_bir_st_sub_district").append(
            $('<option></option>').val('').html('Select District')
            );
        $.each(respData['sub-district'], function(respValue, respText) {
            $("#birth_stat_bir_st_sub_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });
        //======================FILING DEFAULT VALUES=======================

        var villageTownFlag = respData['default-vill-town-flag'];
        var villageTownElemId = "#birth_stat_bir_st_villagetown_flag_" + villageTownFlag;
        $(villageTownElemId).attr('checked', true);
        //====================FILLING VILLAGE TOWN ARRAY BASED ON RADIO BUTTON========================
        //   $(elementId).find('option').remove(); // REMOVING ALL CURRENTLY APPENDED ELEMENTS
        if (villageTownFlag == 1) {
            $.each(respData['partial-vill-town']['town'], function(respValue, respText) {
                $("#birth_stat_bir_st_cityvillage").append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });
        }
        else if (villageTownFlag == 2) {
            $.each(respData['partial-vill-town']['village'], function(respValue, respText) {
                $("#birth_stat_bir_st_cityvillage").append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });
        }

        //======================FILING DEFAULT VALUES=======================
        $("#birth_stat_bir_st_state").val(respData['default-state']);
        $("#birth_stat_bir_st_district").val(respData['default-district']);
        $("#birth_stat_bir_st_sub_district").val(respData['default-sub-district']);
        $("#birth_stat_bir_st_cityvillage").val(respData['default-vill-town']);
    },
    checkBoxAddressCopy: function(getAllDropDownDetailsUrl) {
        var _this = this;
        $("#birth_stat_is_add_parent_same").change(function() {
            if ($('#birth_stat_is_add_parent_same').is(":checked")) {
					//alert('hi');
					//alert(editDetailsUrl);
                Utilities.ajaxBlockUI();
                $.ajax({
                    url: StatisticalForm.editDetailsUrl,
                    //                    url: StatisticalForm.editDetailsUrl + "/getLegalAddressOfParent?legalFormId=" + StatisticalForm.currentLegalFormId,
                    type: "POST",
                    data: ({
                        legalFormId: StatisticalForm.currentLegalFormId
                    }),
                    async: false,
                    success: function(response) {
                        var data = json_parse(response);
						//alert(response);
                        _this.fillParentAddressSameAddressAtBirthDD(data);
                        _this.selectSameAddressDDValues(data);
                        // Presently not use in application when need it remove comment
						// _this.fillGramPanchayatOptionsForCheckbox(data);
                    }
                });
            }
            else {
                _this.getAllDropDownDetails(getAllDropDownDetailsUrl);
                $("select#birth_stat_bir_st_state").attr("disabled", false);
                $("select#birth_stat_bir_st_district").attr("disabled", false);
                $("select#birth_stat_bir_st_cityvillage").attr("disabled", false);
                $("select#birth_stat_bir_st_sub_district").attr("disabled", false);
                $("input#birth_stat_bir_st_villagetown_flag_1").attr("disabled", false);
                $("input#birth_stat_bir_st_villagetown_flag_2").attr("disabled", false);
                //$("#gramPanchayatMother").attr('disabled',false)
            //                $("#gramPanchayatMother").empty().append(
            //                    $('<option></option>').val("").html('Select Gram Panchayat')
            //                    );
            }
        });
    },
    fillSameParentAddressData: function(respData) {
        var _this = this;
        $("#birth_stat_bir_st_state").val(respData['legalParentAddData']['stateId']);
        $("#birth_stat_bir_st_district").val(respData['legalParentAddData']['districtId']);
        $("#birth_stat_bir_st_sub_district").val(respData['legalParentAddData']['subDistrictId']);
        var villageTownFlag = respData['villageTownFlag'];
        var villageTownElemId = "#birth_stat_bir_st_villagetown_flag_" + villageTownFlag;
        $(villageTownElemId).prop('checked', true);
        //===============SETTING THE CITY VILLAGE VALUE IN THE LAST AFTER GETTING IT'S VALUE BASED ON RADIO BUTTON
        Utilities.ajaxBlockUI();
        $.ajax({
            url: _this.radioButtonChangeCommon(villageTownElemId),
            type: "GET",
            success: function(resp) {
                $("#birth_stat_bir_st_cityvillage").val(respData['legalParentAddData']['cityVillageId']);
            }
        })
        //======================================================================


        //On checkbox Disable fields
        $("select#birth_stat_bir_st_state").attr("disabled", true);
        $("select#birth_stat_bir_st_district").attr("disabled", true);
        $("select#birth_stat_bir_st_cityvillage").attr("disabled", true);
        $("select#birth_stat_bir_st_sub_district").attr("disabled", true);
        $("input#birth_stat_bir_st_villagetown_flag_1").attr("disabled", true);
        $("input#birth_stat_bir_st_villagetown_flag_2").attr("disabled", true);
    },
    radioButtonChange: function() {
        var _this = this;
        //====================ON RADIO BUTTON CHANGE====================
        $('#birth_stat_bir_st_villagetown_flag_1').change(function() {
            _this.radioButtonChangeCommon('#birth_stat_bir_st_villagetown_flag_1');
        });
        $('#birth_stat_bir_st_villagetown_flag_2').change(function() {
            _this.radioButtonChangeCommon('#birth_stat_bir_st_villagetown_flag_2');
        });
    //==================ON RADIO BUTTON CHANGE ENDS=================
    },
    radioButtonChangeCommon: function(radioElementId) {
        var flagTown = $(radioElementId).val();
        if ($(radioElementId).is(":checked")) {
            var value = $("#birth_stat_bir_st_sub_district option:selected").val();
            villageUrl = StatisticalForm.urlAjax + "/villageFilter";
            $('#birth_stat_bir_st_cityvillage').hide().load(villageUrl + '?s=' + value + '&vflag=' + flagTown, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_stat_bir_st_cityvillage').focus();
            });
        }
    },
    validateForm: function() {

        // Validate charachter String for security
        $.validator.addMethod("checkstring", function(value, element) {
            var result = /^[a-zA-Z]*$/i.test(value);
            return result;
        }, "");
        // Validate No. of children
        $('#birth_stat_bir_st_children_number').blur(function() {
            if ($(this).val() == 0)
                $(this).val(1);
            if ($(this).val()) {
                var mar_age = document.getElementById('birth_stat_bir_st_mother_marriage_age');
                var birth_age = document.getElementById('birth_stat_bir_st_mother_delivery_age');
                if (mar_age && birth_age) {
                    var diff = birth_age.value - mar_age.value;
                    if (diff < $(this).val()) {
                        var c = confirm("Did the patient had " + $(this).val() + " children between the age " + mar_age.value + " and " + birth_age.value + "?");
                        if (!c) {
                            $(this).val('');
                        }
                    }

                }
            }
        });
        // Validate Birth weight
        $('#birth_stat_bir_st_birth_weight').blur(function() {
            if ($(this).val()) {
                var num = parseFloat($(this).val());
                var result = num.toFixed(3);
                $(this).val(result);
            }
        });
        // Validate Birth Weight Non-Zero value
        jQuery.validator.addMethod("nonzero", function(value, element) {
            if (value == 0)
                return false;
            else
                return true;
        }, "Please enter a non-zero value.");
        // Alphanumeric
        $.validator.addMethod("alphanumeric", function(value, element) {
            //var pattern = /^[a-zA-Z0-9]*$/g;
			var pattern = /^[a-z0-9/.-]+$/i;
            var result = pattern.test(value);
            if (result == true) {
                return true;
            } else {
                return false;
            }

        }, "Please enter only alpha-numeric characters.");
        // Adding prefix 0 for receipt no.
        $('#birth_stat_bir_st_sdm_receiptno').blur(function() {
            var value = $(this).val();
            var pattern = /0/;
            var result = value.match(pattern);
            if (result) {
                if (result.index != 0) {
                    value = value;
                }
            } else {
                value = value;
            }

            $(this).val(value);
        });
		//Code Added BY Monica On 05-07-2016
		if(this.noaId > 0 ){
        $("#frmBirthRegStep2").validate({
            rules: {
                "birth_stat[bir_st_state]": {
                    required: true
                },
                "birth_stat[bir_st_district]": {
                    required: true
                },
                "birth_stat[bir_st_sub_district]": {
                    required: true
                },
                "birth_stat[bir_st_villagetown_name]": {
                    required: true,
                    checkstring: false
                },
                "birth_stat[bir_st_cityvillage]":{
                    required: true
                },
                "birth_stat[bir_st_religion]": {
                    required: true
                },
                "birth_stat[bir_st_father_edu_level]": {
                    required: true
                },
                "birth_stat[bir_st_mother_edu_level]": {
                    required: true
                },
                "birth_stat[bir_st_father_occupation]": {
                    required: true
                },
                "birth_stat[bir_st_mother_occupation]": {
                    required: true
                },
                "birth_stat[bir_st_mother_marriage_age]": {
                    required: false,
                    number: true,
                    min: 12,
                    max: 55,
                    maxlength: 2
                },
                "birth_stat[bir_st_children_number]": {
                    required: true,
                    number: true,
                    max: 13
                },
                "birth_stat[bir_st_mother_delivery_age]": {
                    required: false,
                    number: true,
                    min:
                    function() {
                        if ($("#birth_stat_bir_st_mother_marriage_age").val())
                            return parseInt($("#birth_stat_bir_st_mother_marriage_age").val());
                        else
                            return true;
                    },
                    max: 55,
                    maxlength: 2
                },
                "birth_stat[bir_st_preg_duration]": {
                    required: false,
                    number: true,
                    min: 28,
                    max: 42,
                    maxlength: 2
                },
                "birth_stat[bir_st_delivery_type]": {
                    required: true
                },
                "birth_stat[bir_st_delivery_method]": {
                    required: false
                },
                "birth_stat[bir_st_birth_weight]": {
                    required: false,
                    number: true,
                    maxlength: 6,
                    max: 6.000,
                    nonzero: true
                },
                "birth_stat[bir_st_sdm_receiptno]": {
                    required: false,
                    alphanumeric: true,
                    maxlength: 20
				},
				"birth_stat[bir_st_competent_authority]": {
                    required: false,
                    alphanumeric: true,
                    maxlength: 20
				},
                "birth_stat[bir_st_sdm_orderno]": {
                    required: false,
                    alphanumeric: true,
                    maxlength: 20
                },
                "birth_stat[bir_st_sdm_date]": {
                    required: false
                   // alphanumeric: true,
                   // maxlength: 11
                }
            //        "birth_stat[bir_st_sdm_approved]":{
            //          required: true
            //        }
            },
            errorElement: "div",
            messages: {
                "birth_stat[bir_st_state]": "Please select state.",
                "birth_stat[bir_st_district]": "Please select district.",
                "birth_stat[bir_st_sub_district]": "Please select sub district.",
                "birth_stat[bir_st_villagetown_name]": {
                    required: "Please enter village/town name.",
                    checkstring: "Village/town name is not valid name."
                },
                "birth_stat[bir_st_cityvillage]": "Please select Village/Town.",
                "birth_stat[bir_st_religion]": "Please select religionsss   .",
                "birth_stat[bir_st_father_edu_level]": "Please select father&rsquo;s education level.",
                "birth_stat[bir_st_mother_edu_level]": "Please select mothers&rsquo;s education level.",
                "birth_stat[bir_st_father_occupation]": "Please select father&rsquo;s occupation level.",
                "birth_stat[bir_st_mother_occupation]": "Please select mother&rsquo;s occupation level.",
                "birth_stat[bir_st_delivery_type]": "Please select type of delivery",
                "birth_stat[bir_st_children_number]": "Please enter valid mother&rsquo;s age.",
                "birth_stat[bir_st_mother_marriage_age]": {
                    required: "Please enter valid mother&rsquo;s age.",
                    number: "Age must be numeric.",
                    maxlength: "Max lenght for mother&rsquo;s age is 2."
                },
                "birth_stat[bir_st_mother_delivery_age]": {
                    required: "Please enter valid mother&rsquo;s age.",
                    number: "Age must be numeric."
                },
                "birth_stat[bir_st_children_number]":{
                    required: "Please enter number of children.",
                    number: "Number of children must be numeric."
                },
                "birth_stat[bir_st_preg_duration]": {
                    required: "Please enter duration of pregnancy.",
                    number: "Duration must be numeric."
                },
                "birth_stat[bir_st_delivery_type]": "Please select delivery type.",
                "birth_stat[bir_st_delivery_method]": "Please select delivery type.",
                "birth_stat[bir_st_birth_weight]": {
                    required: "Please enter birth weight.",
                    number: "Birth weight must be numeric.",
                    max: "Max value for birth weight is 6.",
                    nonzero: "Birth weight cannot be 0 or left empty.",
                    maxlength: "Max value for birth weight is 6."
                }
            }
        });}
		else
		{
			 $("#frmBirthRegStep2").validate({
            rules: {
                "birth_stat[bir_st_state]": {
                    required: true
                },
                "birth_stat[bir_st_district]": {
                    required: true
                },
                "birth_stat[bir_st_sub_district]": {
                    required: true
                },
                "birth_stat[bir_st_villagetown_name]": {
                    required: true,
                    checkstring: false
                },
                "birth_stat[bir_st_cityvillage]":{
                    required: true
                },
                "birth_stat[bir_st_religion]": {
                    required: true
                },
                "birth_stat[bir_st_father_edu_level]": {
                    required: true
                },
                "birth_stat[bir_st_mother_edu_level]": {
                    required: true
                },
                "birth_stat[bir_st_father_occupation]": {
                    required: true
                },
                "birth_stat[bir_st_mother_occupation]": {
                    required: true
                },
                "birth_stat[bir_st_mother_marriage_age]": {
                    required: false,
                    number: true,
                    min: 12,
                    max: 55,
                    maxlength: 2
                },
                "birth_stat[bir_st_children_number]": {
                    required: false,
                    number: true,
                    max: 13
                },
                "birth_stat[bir_st_mother_delivery_age]": {
                    required: false,
                    number: true,
                    min:
                    function() {
                        if ($("#birth_stat_bir_st_mother_marriage_age").val())
                            return parseInt($("#birth_stat_bir_st_mother_marriage_age").val());
                        else
                            return true;
                    },
                    max: 55,
                    maxlength: 2
                },
                "birth_stat[bir_st_preg_duration]": {
                    required: false,
                    number: true,
                    min: 28,
                    max: 42,
                    maxlength: 2
                },
                "birth_stat[bir_st_delivery_type]": {
                    required: true
                },
                "birth_stat[bir_st_delivery_method]": {
                    required: false
                },
                "birth_stat[bir_st_birth_weight]": {
                    required: false,
                    number: true,
                    maxlength: 6,
                    max: 6.000,
                    nonzero: true
                },
                "birth_stat[bir_st_sdm_receiptno]": {
                    required: true,
                    alphanumeric: true,
                    maxlength: 20
				},
				"birth_stat[bir_st_competent_authority]": {
                    required: true,
                    alphanumeric: true,
                    maxlength: 20
				},
                "birth_stat[bir_st_sdm_orderno]": {
                    required: true,
                    alphanumeric: true,
                    maxlength: 20
                },
                "birth_stat[bir_st_sdm_date]": {
                    required: true
                   // alphanumeric: true,
                   // maxlength: 11
                }
            //        "birth_stat[bir_st_sdm_approved]":{
            //          required: true
            //        }
            },
            errorElement: "div",
            messages: {
                "birth_stat[bir_st_state]": "Please select state.",
                "birth_stat[bir_st_district]": "Please select district.",
                "birth_stat[bir_st_sub_district]": "Please select sub district.",
                "birth_stat[bir_st_villagetown_name]": {
                    required: "Please enter village/town name.",
                    checkstring: "Village/town name is not valid name."
                },
                "birth_stat[bir_st_cityvillage]": "Please select Village/Town.",
                "birth_stat[bir_st_religion]": "Please select religion.",
                "birth_stat[bir_st_father_edu_level]": "Please select father&rsquo;s education level.",
                "birth_stat[bir_st_mother_edu_level]": "Please select mothers&rsquo;s education level.",
                "birth_stat[bir_st_father_occupation]": "Please select father&rsquo;s occupation level.",
                "birth_stat[bir_st_mother_occupation]": "Please select mother&rsquo;s occupation level.",
                "birth_stat[bir_st_delivery_type]": "Please select delivery type",
                "birth_stat[bir_st_children_number]": "Please enter valid mother&rsquo;s age.",
                "birth_stat[bir_st_mother_marriage_age]": {
                    required: "Please enter valid mother&rsquo;s age.",
                    number: "Age must be numeric.",
                    maxlength: "Max lenght for mother&rsquo;s age is 2."
                },
                "birth_stat[bir_st_mother_delivery_age]": {
                    required: "Please enter valid mother&rsquo;s age.",
                    number: "Age must be numeric."
                },
                "birth_stat[bir_st_children_number]":{
                    required: "Please enter number of children.",
                    number: "Number of children must be numeric."
                },
                "birth_stat[bir_st_preg_duration]": {
                    required: "Please enter duration of pregnancy.",
                    number: "Duration must be numeric."
                },
                "birth_stat[bir_st_delivery_type]": "Please select delivery type.",
                "birth_stat[bir_st_delivery_method]": "Please select delivery type.",
                "birth_stat[bir_st_birth_weight]": {
                    required: "Please enter birth weight.",
                    number: "Birth weight must be numeric.",
                    max: "Max value for birth weight is 6.",
                    nonzero: "Birth weight cannot be 0 or left empty.",
                    maxlength: "Max value for birth weight is 6."
                }
            }
        });
		}
		//End
    },
    checkAddressCheckBox: function() {
        var _this = this;
        if ($("#birth_stat_is_add_parent_same").is(":checked") == true) {
            _this.makeAddressDisable();
        }
        else {
            _this.makeAddressEnable();
        }
    },
    makeAddressDisable: function() {
        $("select#birth_stat_bir_st_state").attr("disabled", true);
        $("select#birth_stat_bir_st_district").attr("disabled", true);
        $("select#birth_stat_bir_st_cityvillage").attr("disabled", true);
        $("select#birth_stat_bir_st_sub_district").attr("disabled", true);
        $("input#birth_stat_bir_st_villagetown_flag_1").attr("disabled", true);
        $("input#birth_stat_bir_st_villagetown_flag_2").attr("disabled", true);
        $("select#gramPanchayatMother").attr("disabled", true);
    },
    makeAddressEnable: function() {
        $("select#birth_stat_bir_st_state").attr("disabled", false);
        $("select#birth_stat_bir_st_district").attr("disabled", false);
        $("select#birth_stat_bir_st_cityvillage").attr("disabled", false);
        $("select#birth_stat_bir_st_sub_district").attr("disabled", false);
        $("input#birth_stat_bir_st_villagetown_flag_1").attr("disabled", false);
        $("input#birth_stat_bir_st_villagetown_flag_2").attr("disabled", false);
        $("#gramPanchayatMother").attr("disabled", false);
    },
    formSubmit: function() {

        $('#submit').click(function() {
            if ($('#frmBirthRegStep2').valid()) {
                var fullPath = document.getElementById('birth_stat_file_upload').value;
                if (typeof(fullPath) == 'undefined' || fullPath == '') {
                    fullPath = document.getElementById('file_path').value;
                }
                if (typeof(fullPath) == 'undefined' || fullPath == '') {
                    var r = confirm("Upload reporting form field is blank. Do you want to continue?");
                    if (r == false)
                    {
                        $('#birth_stat_file_upload').focus();
                        return false;
                    }
                }

                agem = $("#birth_stat_bir_st_mother_marriage_age").val();
                aged = $("#birth_stat_bir_st_mother_delivery_age").val();
                noch = $("#birth_stat_bir_st_children_number").val();
                atttype = $("#birth_stat_bir_st_delivery_type").val();
                deltype = $("#birth_stat_bir_st_delivery_method").val();
                durop = $("#birth_stat_bir_st_preg_duration").val();
                confrmmsg = '';
                if (agem == '')
                    confrmmsg = confrmmsg + '\nAge of the mother at the time of first marriage';
                if (aged == '')
                    confrmmsg = confrmmsg + '\nAge of the mother at the time of this birth';
                if (noch == '')
                    confrmmsg = confrmmsg + '\nNumber of children born alive to the mother so far';
                if (atttype == '')
                    confrmmsg = confrmmsg + '\nType of attention at delivery';
                if (deltype == '')
                    confrmmsg = confrmmsg + '\nType of delivery';
                if (durop == '')
                    confrmmsg = confrmmsg + '\nDuration of pregnancy';
                if (confrmmsg != '') {
                    var r = confirm('following information is not given\n' + confrmmsg + '\n\nDo you want to proceed?');
                    if (r == false) {
                        $('#birth_stat_bir_st_mother_marriage_age').focus();
                        return false;
                    }
                }

                //===================ENABLING ALL DROP DOWNS========================
                StatisticalForm.makeAddressEnable();
                return true;
            }
        });
    },
    fillGramPanchayatOptions: function(respData) {
        if($.isEmptyObject(respData['default-gram-panchayat'][respData['default-sub-district']]) == false){ // where gram panchayat exsists
            var _this = this;
            $("#gramPanchayatMother").attr('disabled', false);
            var panchayatDetailParam = respData['default-gram-panchayat'][respData['default-sub-district']]['panchayatDetail'];
            var villageNamesParam = respData['default-gram-panchayat'][respData['default-sub-district']]['villageNames'];
            BirthLegalForm.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, "#gramPanchayatMother", "#birth_stat_bir_st_cityvillage" );
            var defaultParam = respData['default-gram-panchayat'][respData['default-sub-district']]['defaultGramPanchayat'];
            if(defaultParam  != '') {
                // ONLY FOR EDIT
                $("#birth_stat_bir_st_cityvillage").empty().append(
                    $('<option></option>').val("").html('Select Village/Town')
                    );

                $.each(villageNamesParam[defaultParam], function(index, value) {
                    $("#birth_stat_bir_st_cityvillage").append(
                        $('<option></option>').val(index).html(value)
                        );
                });
            }
            else {
                $("#birth_stat_bir_st_cityvillage").find('option').remove();
                //     $(elementId).find('option').remove(); // REMOVING ALL CURRENTLY APPENDED ELEMENTS
                $("#birth_stat_bir_st_cityvillage").append(
                    $('<option></option>').val('').html('Select VillageTown')
                    );
                $.each(respData['vill-town'], function(respValue, respText) {
                    $("#birth_stat_bir_st_cityvillage").append(
                        $('<option></option>').val(respValue).html(respText)
                        );
                });
                $("#birth_stat_bir_st_cityvillage").val(respData['default-vill-town']);
            }
            //===SETTING THE VALUES OF GRAM PANCHAYAT AND VILLAGE TOWN DROP DOWN====
            // $("#gramPanchayatMother").val(defaultParam);
            var myText = defaultParam;
            $("#gramPanchayatMother option[value='" + myText + "']").prop('selected', true);
        }
        else{
            $("#gramPanchayatMother").attr('disabled', true);
        }

    },

    //========================HANDLING THE EDIT FORMS===========================
    getAllDropDownEditDetails: function() {
        var _this = this;
        var respData;
        //        $("#birth_stat_is_add_parent_same").prop("checked", false);
        //        console.log($("#birth_stat_is_add_parent_same").is(":checked"))
        //========================FOR GETTING ALL FILLED DATA===================
        Utilities.ajaxBlockUI();
        $.ajax({
            url: StatisticalForm.registrationFormDataUrl,
            type: "POST",
            data: ({
                legalFormId: StatisticalForm.currentLegalFormId
            }),
            async: false,
            success: function(response) {
                respData = json_parse(response); //THIS CONTAINS ALL CURRENT DROP DOWN VALUES AND ALL CURRENT STATISTICAL FORM DATA
                //=========ONLY FOR PARENT AND PERMANENT ADDRESS DROP DOWN======
                _this.fillParentAddressAtBirthDD(respData);
                //_this.fillGramPanchayatOptionsForCheckbox(respData);
                //        console.log(respData)
                _this.selectDDValues(respData)
            //==============================================================
            }
        });

    //THIS WILL HANDLE THE REST OF THE FORM JS LIKE SHOWING AND HIDING OF FIELDS IN EDIT FORM
    //        _this.handleRestOfLegalEditForm();
    },
    fillParentAddressAtBirthDD: function(respData) {
        //=====SETTING SELECTED STATE VALUE AS STATE ARE BY-DEFAULT COMES=======
        //        console.log(respData['selectedValues']['parentAddDDValues']['state'])
        //        $("#birth_legal_bir_le_parent_state").val(respData['selectedValues']['parentAddDDValues']['state']);

        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_stat_bir_st_district").find('option').remove();
        $("#birth_stat_bir_st_district").append(
            $('<option></option>').val("").html("Select District")
            );

        $.each(respData['districtArr'], function(respValue, respText) {
            $("#birth_stat_bir_st_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //====SETTING sub DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_stat_bir_st_sub_district").find('option').remove();
        $("#birth_stat_bir_st_sub_district").append(
            $('<option></option>').val("").html("Select Sub-District")
            );

        $.each(respData['subDistrictArr'], function(respValue, respText) {
            $("#birth_stat_bir_st_sub_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_stat_bir_st_cityvillage").find('option').remove();
        $.each(respData['villageTownArr'], function(respValue, respText) {
            $("#birth_stat_bir_st_cityvillage").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //        $("#birth_legal_bir_le_parent_state").val(respData['selectedValues']['parentAddDDValues']['district']);
        //======================================================================
        //====SETTING MOTHER GRAM PANCHAYAT
        $("#gramPanchayatMother").empty().append(
            $('<option></option>').val("").html('Select Gram Panchayat')
            );
        //  $("#gramPanchayatMother").find('option').remove();


        //         if(respData['formData']['dea_st_death_grampanchayat']){
        //            var selectedSubDistrict = respData['formData']['dea_st_sub_district'];
        //            $.each(respData['parentGramPanchayat'][selectedSubDistrict]['panchayatDetail'], function(respValue, respText) {
        //                $("#gramPanchayatMother").append(
        //                    $('<option></option>').val(respValue).html(respText)
        //                    );
        //            });
        //        }
        if(respData['formData']['bir_st_grampanchayat']){
            var selectedSubDistrict = respData['formData']['bir_st_sub_district'];
            $.each(respData['parentGramPanchayat'][selectedSubDistrict]['panchayatDetail'], function(respValue, respText) {
                $("#gramPanchayatMother").append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });
            $("#gramPanchayatMother").attr('disabled',false);
        }
        else {
            $("#gramPanchayatMother").attr('disabled',true);
        }

    //        $("#birth_legal_bir_le_parent_state").val(respData['selectedValues']['parentAddDDValues']['district']);
    //======================================================================

    },
    selectDDValues: function(respData) {
        var _this = this;
        //==========PRESENT ADDRESS VALUES SELECTION=====================
        $("#birth_stat_bir_st_state").val(respData['formData']['bir_st_state']);
        $("#birth_stat_bir_st_district").val(respData['formData']['bir_st_district']);
        $("#birth_stat_bir_st_sub_district").val(respData['formData']['bir_st_sub_district']);
        $("#birth_stat_bir_st_cityvillage").val(respData['formData']['bir_st_cityvillage']);
        if (respData['formData']['bir_st_villagetown_flag'] == 1) {
            $("#birth_stat_bir_st_villagetown_flag_2").prop('checked', false)
            $("#birth_stat_bir_st_villagetown_flag_1").prop('checked', true)
        }
        else if (respData['formData']['bir_st_villagetown_flag'] == 2) {
            $("#birth_stat_bir_st_villagetown_flag_1").prop('checked', false)
            $("#birth_stat_bir_st_villagetown_flag_2").prop('checked', true)
        }

        if (respData['formData']['is_add_parent_same'] == 0) {
            $("#birth_stat_is_add_parent_same").prop('checked', false)
        }

        var selectedSubDistrict = respData['formData']['bir_st_sub_district'];
        if(respData['formData']['bir_st_grampanchayat']){
            $("#gramPanchayatMother").val(respData['formData']['bir_st_grampanchayat']);
        }

        _this.checkAddressCheckBox();

        //===================FILLING DELIVERY RELATED DROP DOWN=================
        _this.fillDeliveryRelatedDropDown(respData);
    },
    fillParentAddressSameAddressAtBirthDD: function(respData) {
        //=====SETTING SELECTED STATE VALUE AS STATE ARE BY-DEFAULT COMES=======
        //        console.log(respData['selectedValues']['parentAddDDValues']['state'])
        //        $("#birth_legal_bir_le_parent_state").val(respData['selectedValues']['parentAddDDValues']['state']);

        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_stat_bir_st_district").find('option').remove();
        $("#birth_stat_bir_st_district").append(
            $('<option></option>').val("").html("Select District")
            );

        $.each(respData['parentAddDDFilledData']['districtArr'], function(respValue, respText) {
            $("#birth_stat_bir_st_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //====SETTING sub DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_stat_bir_st_sub_district").find('option').remove();
        $("#birth_stat_bir_st_sub_district").append(
            $('<option></option>').val("").html("Select Sub-District")
            );

        $.each(respData['parentAddDDFilledData']['subDistrictArr'], function(respValue, respText) {
            $("#birth_stat_bir_st_sub_district").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

        //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        $("#birth_stat_bir_st_cityvillage").find('option').remove();

        $.each(respData['parentAddDDFilledData']['villageTownArr'], function(respValue, respText) {
            $("#birth_stat_bir_st_cityvillage").append(
                $('<option></option>').val(respValue).html(respText)
                );
        });

       /* //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
        if(respData['parentAddDDFilledData']['villageGramPanchayat']){
            $("#gramPanchayatMother").find('option').remove();
            var selectedSubDistrict = respData['formData']['bir_st_sub_district'];
            $.each(respData['parentAddDDFilledData']['villageGramPanchayat'][selectedSubDistrict]['panchayatDetail'], function(respValue, respText) {
                $("#gramPanchayatMother").append(
                    $('<option></option>').val(respValue).html(respText)
                    );
            });
        }*/

    //        $("#birth_legal_bir_le_parent_state").val(respData['selectedValues']['parentAddDDValues']['district']);
    //======================================================================

    },
    selectSameAddressDDValues: function(respData) {
        var _this = this;
        //==========PRESENT ADDRESS VALUES SELECTION=====================
        $("#birth_stat_bir_st_state").val(respData['selectedValues']['parentAddDDValues']['state']);
        $("#birth_stat_bir_st_district").val(respData['selectedValues']['parentAddDDValues']['district']);
        $("#birth_stat_bir_st_sub_district").val(respData['selectedValues']['parentAddDDValues']['sub-district']);
        $("#birth_stat_bir_st_cityvillage").val(respData['selectedValues']['parentAddDDValues']['village-town']);
       // $("#gramPanchayatMother").val(respData['selectedValues']['parentAddDDValues']['grampanchayat']);
        _this.checkAddressCheckBox();

    },
    deliveryTypeAttention: function() {
        var _this = this;
        var birthPlaceglobal;
        Utilities.ajaxBlockUI();
        $.ajax({
            url: StatisticalForm.birthPlaceUrl,
            type: "POST",
            data: ({
                legalFormId: StatisticalForm.currentLegalFormId
            }),
            async: false,
            success: function(response) {
                var birthPlace = json_parse(response); // CONTAINS THE PLACE OF BIRTH VALUE 1, 2 OR 3
                Utilities.ajaxBlockUI();
                $.ajax({
                    url: StatisticalForm.deliveryAttention,
                    type: "POST",
                    data: ({
                        birthPlace: birthPlace
                    }),
                    async: false,
                    success: function(response) {
                        var attention = json_parse(response);
                        //===============SETTING ATTENTION TYPE DD==============
                        $("#birth_stat_bir_st_delivery_type").find('option').remove();
                        $("#birth_stat_bir_st_delivery_type").append(
                            $('<option></option>').val("").html("Select Attention Type")
                            );

                        $.each(attention['type'], function(respValue, respText) {
                            $("#birth_stat_bir_st_delivery_type").append(
                                $('<option></option>').val(respValue).html(respText)
                                );
                        });
                        //======ENABLING IT'S CHANGE EVEWNT=============
                        birthPlaceglobal = birthPlace;
                        _this.deliveryTypeAttentionChange(birthPlace);

                    }
                });
            }
        });
        StatisticalForm.birthPlaceGlobal = birthPlaceglobal;

    },
    deliveryTypeAttentionChange: function(birthPlace) {
        var _this = this;
        $("#birth_stat_bir_st_delivery_type").change(function() {
            var deliveryTypeId = $(this).val();
            _this.deliveryMethodType(deliveryTypeId, birthPlace);
        });
    },
    deliveryMethodType: function(deliveryTypeId, birthPlace) {
        //=================MOTHOD DD STARTS HERE================
        Utilities.ajaxBlockUI();
        $.ajax({
            url: StatisticalForm.deliveryMethodUrl,
            type: "POST",
            data: ({
                deliveryType: deliveryTypeId
            }),
            async: false,
            success: function(response) {
                var method = json_parse(response);
                //====SETTING DISTRICT OPTIONS IN DROP DOWN AND SELECTING IT'S VALUE====
                $("#birth_stat_bir_st_delivery_method").find('option').remove();
                $("#birth_stat_bir_st_delivery_method").append(
                    $('<option></option>').val("").html("Select Delivery Method")
                    );

                $.each(method['method'], function(respValue, respText) {
                    $("#birth_stat_bir_st_delivery_method").append(
                        $('<option></option>').val(respValue).html(respText)
                        );
                });

            }
        });

        //==============HIDING CERTAIN DD VALUE AS SOME OF THE THE VALUE SAME CHANGING UNCERTAINLY AND WE DON'T HAVE PROPER RELATION TO MAINTAIN THEM IN DB
        if (birthPlace == 2) {
            var deliveryValue = $("#birth_stat_bir_st_delivery_type").val();
            //            if (deliveryValue == 16) {
            //                $("#birth_stat_bir_st_delivery_method option[value='2']").remove();
            //            }
            if (deliveryValue == 4 || deliveryValue == 5 || deliveryValue == 16) {
                $("#birth_stat_bir_st_delivery_method option[value='2']").remove();
                $("#birth_stat_bir_st_delivery_method option[value='3']").remove();
            }
        }
        if (birthPlace == 3) {
            $("#birth_stat_bir_st_delivery_method option[value='2']").remove();
            $("#birth_stat_bir_st_delivery_method option[value='3']").remove();
        }
    },
    fillDeliveryRelatedDropDown: function(respData) {
        var _this = this;
        //    console.log(respData)

        //=====SETTING THE DELIVERY TYPE VALUE AS IT'S DROP DOWN ARE APPENDING AT FORM LOAD ONLY....SO ENJOY MADI
        var selectedValue = respData['formData']['bir_st_delivery_type'];
        $("select#birth_stat_bir_st_delivery_type").val(selectedValue);

        //=========MAKING THE DELIVERY METHOD DROP DOWN AND THEN SELECTING IT'S VALUE
        var birthPlaceLegal = StatisticalForm.birthPlaceGlobal;
		if(selectedValue != null && selectedValue != '')
        _this.deliveryMethodType(selectedValue, birthPlaceLegal);

        var selDeliveryMethodVal = respData['formData']['bir_st_delivery_method'];
        $("select#birth_stat_bir_st_delivery_method").val(selDeliveryMethodVal);

    },
    fillGramPanchayatOptionsForCheckbox: function(respData) {
        //============================FOR PARENT ADDRESS============================
        var subDistrict = respData['selectedValues']['parentAddDDValues']['sub-district'];
        if($.isEmptyObject(respData['villageGramPanchayat'][subDistrict]) == false){ // where gram panchayat exsists
            $("#gramPanchayatMother").attr('disabled', true);
            var panchayatDetailParam = respData['parentGramPanchayat'][subDistrict]['panchayatDetail'];
            var villageNamesParam = respData['villageGramPanchayat'][subDistrict]['villageNames'];
            //      _this.fillGramPanchayatOptionsValues(panchayatDetailParam, villageNamesParam);
            //      console.log(panchayatDetailParam)
            //      console.log(villageNamesParam)
            BirthLegalForm.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, "#gramPanchayatMother", "#birth_stat_bir_st_cityvillage");
            var defaultParam = respData['selectedValues']['parentAddDDValues']['grampanchayat'];
            if(defaultParam  !=''){
                // ONLY FOR EDIT
                $("#birth_stat_bir_st_cityvillage").empty().append(
                    $('<option></option>').val("").html('Select Village/Town')
                    );

                $.each(villageNamesParam, function(index, value) {
                    $("#birth_stat_bir_st_cityvillage").append(
                        $('<option></option>').val(index).html(value)
                        );
                });

                //===SETTING THE VALUES OF GRAM PANCHAYAT AND VILLAGE TOWN DROP DOWN====
                //  $("#gramPanchayatMother").val(respData['selectedValues']['parentAddDDValues']['grampanchayat']);
                var myText = respData['selectedValues']['parentAddDDValues']['grampanchayat'];
                $("#gramPanchayatMother option[value='" + myText + "']").prop('selected', true);
                $("#birth_stat_bir_st_cityvillage").val(respData['selectedValues']['parentAddDDValues']['village-town']);
            }

        }
        else{
            $("#gramPanchayatMother").attr('disabled', true);
        }
    }



}
