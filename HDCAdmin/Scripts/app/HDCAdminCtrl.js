(function () {

    'use strict';
    var app = angular.module('app', ['sessionManager', 'angularUtils.directives.dirPagination', 'angularjs-dropdown-multiselect', 'chart.js']); //set and get the angular module

    //create angularjs controllers
    //1. dashboard
    app.controller('adminController', ['$scope', '$http', adminController]);
    //2. Material 
    app.controller('MaterialController', ['$scope', '$http', MaterialController]);
    //3. submaterial
    app.controller('MaterialSubTypeController', ['$scope', '$http', MaterialSubTypeController]);
    //4. UserType
    app.controller('UserTypeController', ['$scope', '$http', UserTypeController]);
    //5. User
    app.controller('UserController', ['$scope', '$http', UserController]);
    //6. Paganation plugin
    app.controller('OtherController', OtherController);
    //7. MyCompany 
    app.controller('MyCompanyController', ['$scope', '$http', MyCompanyController]);
    //8. MyCompany 
    app.controller('SitesController', ['$scope', '$http', SitesController]);
    //9. Credit
    app.controller('CreditController', ['$scope', '$http', CreditController]);
    

    ////1. dashboard controller method
    function adminController($scope, $http) {
        setCookie("MaterialId", "", 0); //1 means 1 day cookie
        //declare variable for mainain ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;

        //get count aspnetusers information
        $http.get('/api/Admin/GetUserCount').success(function (data) {

            $scope.totalUsers = data;
            $scope.loading = false;
            //$('#myDiv').hide();
        })
			.error(function (data) {
			    $scope.error = "An Error has occured while loading posts!";
			    $scope.loading = false;
			});

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.colors = ['#46BFBD', '#FDB45C'];
        $scope.onClick = function (points, evt) {
            //alert(points[0].value);
            console.log(points, evt);
        };

    }

    ////2. Material Type controller method
    function MaterialController($scope, $http) {
        //for pagination
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        //declare variable for mainain ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;
        $('#myDiv').show();
        //list
        //get material list information
        $http.get('/api/Admin/GetMaterial').success(function (data) {
            $scope.materials = data;
            $scope.loading = false;
            $('#myDiv').hide();
        })
			.error(function (data) {
			    $scope.error = "An Error has occured while loading posts!";
			    $scope.loading = false;
			});

        //for pagination
        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
        };

        //update
        //show selected material type
        $scope.edit = function (data) {
            $scope.material = data;
            $scope.editMode = true;

            $('#materialModelAdd').modal('show');
        };
        //update selected material type
        $scope.update = function (material) {
            var postdata = {};
            postdata.MaterialId = material.MaterialId
            postdata.MaterialType1 = material.MaterialType1;
            postdata.DefaultCost = material.DefaultCost;
            $http.post('/api/Admin/EditMaterial', postdata).success(function (data) {
                $scope.materials = data;
                $scope.loading = false;
                $("#materialModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Material Type updated successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetMaterial').success(function (data) {
                    $scope.materials = data;
                    $scope.loading = false;
                    //$("#materialModelAdd").modal('hide');
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $("#materialModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});
        };

        //add
        //show addmaterial type dialog
        $scope.showadd = function () {
            //$scope.materials = null;
            $scope.editMode = false;

            $("#materialModelAdd").modal('show');
        };
        // add Material Type
        $scope.add = function (material) {
            var postdata = {};
            postdata.MaterialId = 0;
            postdata.MaterialType1 = material.MaterialType1;
            postdata.DefaultCost = material.DefaultCost;
            $http.post('/api/Admin/AddMaterial', postdata).success(function (data) {
                //$scope.materials = data;
                $scope.loading = false;
                $("#materialModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Material Type added successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetMaterial').success(function (data) {
                    $scope.materials = data;
                    $scope.loading = false;
                    //$("#materialModelAdd").modal('hide');
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    //$("#materialModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = data;
				    $scope.loading = false;
				});

        };
        //cancel add material type dialog
        $scope.cancel = function () {
            $("#materialModelAdd").modal('hide');
        };

        //delete
        //show confirm to delete materialtype
        $scope.showconfirm = function (data) {
            $scope.material = data;
            $("#confirmModal").modal('show');
        };
        //delete materialType
        $scope.delete = function (material) {
            var postdata = {};
            postdata.MaterialId = material.MaterialId
            postdata.MaterialType1 = material.MaterialType1;
            $http.post('/api/Admin/DeleteMaterial', postdata).success(function (data) {
                //$scope.materials = data;
                $scope.loading = false;
                $("#confirmModal").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Material Type deleted successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetMaterial').success(function (data) {
                    $scope.materials = data;
                    $scope.loading = false;
                    //$("#materialModelAdd").modal('hide');
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $("#confirmModal").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    //alert('error occured ' + data)
				    $scope.error = data;
				    $scope.loading = false;
				});
        };

        ////view
        ////show view dialog
        //$scope.view = function (data) {
        //    $scope.material = data;

        //    $("#materialViewModal").modal('show');
        //};
        $scope.SubTypeClick = function (material) {
            setCookie("MaterialId", material.MaterialId, 1); //1 means 1 day cookie
            window.location.href = "/Home/MaterialSubType";
        }
    }

    ////3. MaterialSub Type controller method
    function MaterialSubTypeController($scope, $http) {
        //for pagination
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $('#myDiv').show();

        var aCookie = new cookie();
        checkCookie(aCookie);
        var MaterialId = aCookie.MaterialId;
        if (MaterialId == "") {
            MaterialId = 0;
        }
        //declare variable for mainain ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;

        //for pagination
        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
        };

        //list
        //get material list information
        $http.get('/api/Admin/GetMaterialForSubType').success(function (data) {
            $scope.materials = data;
            for (var i = 0; i < data.length; i++) {
                if (MaterialId == '0') {
                    $scope.MaterialType = 'Select';
                } else if (MaterialId == data[i].MaterialId) {
                    //$scope.merchantdetails = $scope.merchants.ResponseObject[i];
                    $scope.MaterialType = $scope.materials[i].MaterialType1;
                    //alert($scope.ForeignMerchantName);
                }
            }
            $scope.loading = false;
        })
			.error(function (data) {
			    $scope.error = "An Error has occured while loading posts!";
			    $scope.loading = false;
			});

        //list
        //get materialSubType list information
        $http.get('/api/Admin/GetMaterialSubType/' + MaterialId).success(function (data) {
            $scope.materialsubtypes = data;
            $scope.loading = false;
            $('#myDiv').hide();
        })
			.error(function (data) {
			    $scope.error = "An Error has occured while loading posts!";
			    $scope.loading = false;
			});

        //update
        //show selected submaterial type
        $scope.edit = function (data) {
            $scope.materialsubtype = data;
            $scope.editMode = true;
            $('#submaterialModelAdd').modal('show');
        };
        //update selected submaterial type
        $scope.update = function (materialsubtype) {
            var postdata = {};
            postdata.MaterialSubId = materialsubtype.MaterialSubId
            postdata.MaterialSubType = materialsubtype.MaterialSubType;
            postdata.DefaultCost = materialsubtype.DefaultCost;
            $http.post('/api/Admin/EditSubMaterial', postdata).success(function (data) {
                //$scope.materialsubtypes = data;
                $scope.loading = false;
                $("#submaterialModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Material SubType updated successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get materialSubType list information
                $http.get('/api/Admin/GetMaterialSubType/' + MaterialId).success(function (data) {
                    $scope.materialsubtypes = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    //$("#submaterialModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});
        };

        //cancel add material type dialog
        $scope.cancel = function () {
            $("#submaterialModelAdd").modal('hide');
        };

        //add
        //show addmaterial type dialog
        $scope.showadd = function () {
            //$scope.materials = null;
            $scope.editMode = false;
            var aCookie = new cookie();
            checkCookie(aCookie);
            var MaterialId = aCookie.MaterialId;
            if (MaterialId == "") {
                MaterialId = 0;
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'warning',
                    timeout: 2000,
                    text: 'Please select Material Name',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
            } else {
                $("#submaterialModelAdd").modal('show');
            }


        };

        // add SubMaterial Type
        $scope.add = function (materialsubtype) {
            var postdata = {};
            postdata.MaterialSubId = materialsubtype.MaterialSubId;
            postdata.MaterialSubType = materialsubtype.MaterialSubType;
            postdata.MaterialId = MaterialId;
            postdata.DefaultCost = materialsubtype.DefaultCost;
            $http.post('/api/Admin/AddSubMaterial', postdata).success(function (data) {
                //$scope.materialsubtypes = data;
                $scope.loading = false;
                $("#submaterialModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Subtype added successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get materialSubType list information
                $http.get('/api/Admin/GetMaterialSubType/' + MaterialId).success(function (data) {
                    $scope.materialsubtypes = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    //$("#submaterialModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    //$scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});

        };

        $scope.ChangeMaterial = function (material) {
            setCookie("MaterialId", material.MaterialId, 1); //1 means 1 day cookie
            window.location.reload();
        }

        //delete
        //show confirm to delete materialtype
        $scope.showconfirm = function (data) {
            $scope.materialsubtype = data;

            $("#confirmModal").modal('show');
        };
        //delete submaterialType
        $scope.delete = function (materialsubtype) {
            var postdata = {};
            postdata.MaterialSubId = materialsubtype.MaterialSubId;
            $http.post('/api/Admin/DeleteSubMaterial', postdata).success(function (data) {
                $scope.materialsubtypes = data;
                $scope.loading = false;
                $("#confirmModal").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Sub Material Type deleted successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get materialSubType list information
                $http.get('/api/Admin/GetMaterialSubType/' + MaterialId).success(function (data) {
                    $scope.materialsubtypes = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});
        };
    }

    ////4. USer Type controller method
    function UserTypeController($scope, $http) {
        //for pagination
        $scope.currentPage = 1;
        $scope.pageSize = 10;


        //declare variable for mainain ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;
        $('#myDiv').show();
        //list
        //get UserType list information
        $http.get('/api/Admin/GetUserType').success(function (data) {
            $scope.userTypes = data;
            $scope.loading = false;
            $('#myDiv').hide();
        })
			.error(function (data) {
			    $scope.error = "An Error has occured while loading posts!";
			    $scope.loading = false;
			});


        //for pagination
        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
        };


        //add
        //show add user type dialog
        $scope.showadd = function () {
            $scope.editMode = false;
            $("#userTypeModelAdd").modal('show');
        };
        // add User Type
        $scope.add = function (userType) {
            var postdata = {};
            postdata.UserTypeId = 0;
            postdata.UserTypeText = userType.UserTypeText;
            $http.post('/api/Admin/AddUserType', postdata).success(function (data) {
                //$scope.userTypes = data;
                $scope.loading = false;
                $("#userTypeModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'User Type added successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get UserType list information
                $http.get('/api/Admin/GetUserType').success(function (data) {
                    $scope.userTypes = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $("#userTypeModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});

        };
        //cancel add material type dialog
        $scope.cancel = function () {
            $("#userTypeModelAdd").modal('hide');
        };

        //update
        //show selected material type
        $scope.edit = function (data) {
            $scope.userType = data;
            $scope.editMode = true;

            $('#userTypeModelAdd').modal('show');
        };
        //update selected material type
        $scope.update = function (userType) {
            var postdata = {};
            postdata.UserTypeId = userType.UserTypeId;
            postdata.UserTypeText = userType.UserTypeText;
            $http.post('/api/Admin/EditUserType', postdata).success(function (data) {
                //$scope.userTypes = data;
                $scope.loading = false;
                $("#userTypeModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'User Type updated successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get UserType list information
                $http.get('/api/Admin/GetUserType').success(function (data) {
                    $scope.userTypes = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $("#userTypeModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'success',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});
        };

        //delete
        //show confirm to delete materialtype
        $scope.showconfirm = function (data) {
            $scope.userType = data;
            $("#confirmModal").modal('show');
        };
        //delete materialType
        $scope.delete = function (userType) {
            var postdata = {};
            postdata.UserTypeId = userType.UserTypeId;
            $http.post('/api/Admin/DeleteUserType', postdata).success(function (data) {
                //$scope.userTypes = data;
                $scope.loading = false;
                $("#confirmModal").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'User Type deleted successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get UserType list information
                $http.get('/api/Admin/GetUserType').success(function (data) {
                    $scope.userTypes = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {

                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'success',
				        timeout: 2000,
				        text: 'User Type deleted successfully.',
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});
        };

    }

    ////5. User controller method
    function UserController($scope, $http) {
        //for pagination(OtherController)
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        //declare variable for mainain ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;
        $('#myDiv').show();

        ////multiselect ddl
        ////selected items
        //$scope.SelectedUsers = [];
        ////options
        //$scope.UserTypes = [];
        ////extra settings for multiselect ddl
        //$scope.UserTypessettings = {
        //    showCheckAll: false,
        //    showUncheckAll: true
        //};
        //$scope.UserTypescustomTexts = {
        //    buttonDefaultText: 'Select User Types'
        //}



        //list
        //get UserType list information (options for multiselect ddl)
        //$http.get('/api/Admin/GetUserTypeForUser').success(function (data) {
        //    $scope.UserTypes = data;
        //    $scope.loading = false;
        //    $('#myDiv').hide();
        //})
        //	.error(function (data) {
        //	    $scope.error = "An Error has occured while loading posts!";
        //	    $scope.loading = false;
        //	});

        //list
        //get User list
        $http.get('/api/Admin/GetUser').success(function (data) {
            $scope.users = data;
            $scope.loading = false;
            $('#myDiv').hide();
        })
			.error(function (data) {
			    $scope.error = "An Error has occured while loading posts!";
			    $scope.loading = false;
			});



        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
        };


        //add
        //show add user dialog
        $scope.showadd = function () {
            $scope.editMode = false;
            $("#userModelAdd").modal('show');
        };
        // add User
        $scope.add = function (user) {
            $('#myDivLoader').show();
            var postdata = {};
            postdata.UserId = 0;
            postdata.FirstName = user.FirstName;
            postdata.LastName = user.LastName;
            postdata.Email = user.Email;
            postdata.Password = user.Password;
            postdata.PhoneNumber = user.PhoneNumber;
            postdata.Address = user.Address;
            postdata.Description = user.Description;
            postdata.IsEnabled = user.IsEnabled;
            postdata.UserTypeMappingObj = $scope.SelectedUsers;

            $http.post('/api/Admin/AddUser', postdata).success(function (data) {
                //$scope.userTypes = data;
                $('#myDivLoader').hide();
                $scope.loading = false;
                $("#userModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'User Type added successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get User list
                $http.get('/api/Admin/GetUser').success(function (data) {
                    $scope.users = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $('#myDivLoader').hide();
				    $("#userModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.loading = false;
				});

        };
        //cancel add material type dialog
        $scope.cancel = function () {
            $("#userModelAdd").modal('hide');
        };

        //update
        //show selected material type
        $scope.edit = function (data) {
            $scope.user = data;
            $scope.editMode = true;
            $('#userModelAdd').modal('show');
        };
        //update selected material type
        $scope.update = function (user) {
            $('#myDiv').show();
            $('#myDivLoader').show();

            var postdata = {};
            postdata.Id = user.Id;
            postdata.FirstName = user.FirstName;
            postdata.LastName = user.LastName;
            postdata.Email = user.Email;
            postdata.Password = user.Password;
            postdata.PhoneNumber = user.PhoneNumber;
            postdata.Address = user.Address;
            postdata.Description = user.Description;
            postdata.IsEnabled = user.IsEnabled;
            postdata.UserTypeMappingObj = $scope.SelectedUsers;
            $http.post('/api/Admin/EditUser', postdata).success(function (data) {
                //$scope.userTypes = data;
                $('#myDiv').hide();
                $('#myDivLoader').hide();
                $scope.loading = false;
                $("#userModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'User updated successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get User list
                $http.get('/api/Admin/GetUser').success(function (data) {
                    $scope.users = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $("#userModelAdd").modal('hide');
				    $('#myDivLoader').hide();
				    $('#myDiv').hide();
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});
        };


        //delete
        //show confirm to delete materialtype
        $scope.showconfirm = function (data) {
            $scope.user = data;

            $("#confirmModal").modal('show');
        };
        //delete materialType
        $scope.delete = function (user) {
            $('#myDivLoader').show();

            var postdata = {};
            postdata.Id = user.Id;
            postdata.FirstName = user.FirstName;
            postdata.LastName = user.LastName;
            postdata.Email = user.Email;
            postdata.Password = user.Password;
            postdata.PhoneNumber = user.PhoneNumber;
            postdata.Address = user.Address;
            postdata.Description = user.Description;
            postdata.IsEnabled = user.IsEnabled;
            postdata.UserTypeMappingObj = $scope.SelectedUsers;
            $http.post('/api/Admin/DeleteUser', postdata).success(function (data) {
                //$scope.materials = data;
                $('#myDivLoader').hide();
                $scope.loading = false;
                $("#confirmModal").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'User deleted successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get User list
                $http.get('/api/Admin/GetUser').success(function (data) {
                    $scope.users = data;
                    $scope.loading = false;
                    $('#myDiv').hide();
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $('#myDivLoader').hide();
				    $("#confirmModal").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    //alert('error occured ' + data)
				    $scope.error = data;
				    $scope.loading = false;
				});
        };

    }

    ////6. Paganation plugin
    function OtherController($scope) {
        $scope.pageChangeHandler = function (num) {
            console.log('going to page ' + num);
        };
    }

    ////7. MyCompany controller method
    function MyCompanyController($scope, $http) {
        //for pagination
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        //declare variable for mainain ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;
        $('#myDiv').show();
        //list
        //get material list information
        $http.get('/api/Admin/GetMyCompany').success(function (data) {
            $scope.companies = data;
            $scope.loading = false;
            $('#myDiv').hide();
        })
			.error(function (data) {
			    $scope.error = "An Error has occured while loading posts!";
			    $scope.loading = false;
			});

        //for pagination
        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
        };

        //update
        //show selected material type
        $scope.edit = function (data) {
            $scope.company = data;
            $scope.editMode = true;

            $('#companyModelAdd').modal('show');
        };
        //update selected company details
        $scope.update = function (company) {
            var postdata = {};
            postdata.Id = company.Id;
            postdata.CompanyName = company.CompanyName;
            postdata.Address = company.Address;
            postdata.ContactNo = company.ContactNo;
            postdata.VatTinNo = company.VatTinNo;
            $http.post('/api/Admin/EditMyCompany', postdata).success(function (data) {
                $scope.companies = data;
                $scope.loading = false;
                $("#companyModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Company details updated successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetMyCompany').success(function (data) {
                    $scope.companies = data;
                    $scope.loading = false;
                    //$("#materialModelAdd").modal('hide');
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $("#companyModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});
        };

        //add
        //show addMyCompany type dialog
        $scope.showadd = function () {
            $scope.editMode = false;
            $("#companyModelAdd").modal('show');
        };
        // add MyCompany
        $scope.add = function (company) {
            var postdata = {};
            postdata.Id = 0;
            postdata.Address = company.Address;
            postdata.ContactNo = company.ContactNo;
            postdata.CompanyName = company.CompanyName;
            postdata.VatTinNo = company.VatTinNo;

            $http.post('/api/Admin/AddMyCompany', postdata).success(function (data) {
                $scope.loading = false;
                $("#companyModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Company added successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetMyCompany').success(function (data) {
                    $scope.companies = data;
                    $scope.loading = false;
                    //$("#materialModelAdd").modal('hide');
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    //$("#materialModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = data;
				    $scope.loading = false;
				});

        };
        //cancel add material type dialog
        $scope.cancel = function () {
            $("#companyModelAdd").modal('hide');
        };

        //delete
        //show confirm to delete company
        $scope.showconfirm = function (data) {
            $scope.company = data;
            $("#confirmModal").modal('show');
        };
        //delete materialType
        $scope.delete = function (company) {
            var postdata = {};
            postdata.Id = company.Id;
            postdata.CompanyName = company.CompanyName;
            postdata.ContactNo = company.ContactNo;
            postdata.VatTinNo = company.VatTinNo;
            $http.post('/api/Admin/DeleteMyCompany', postdata).success(function (data) {
                $scope.loading = false;
                $("#confirmModal").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Company deleted successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetMyCompany').success(function (data) {
                    $scope.companies = data;
                    $scope.loading = false;
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    //$("#confirmModal").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    //alert('error occured ' + data)
				    $scope.error = data;
				    $scope.loading = false;
				});
        };

        $scope.SiteClick = function (company) {
            setCookie("Id", company.Id, 1); //1 means 1 day cookie
            window.location.href = "/Home/Sites";
        }
    }

    ////8. Sites controller method
    function SitesController($scope, $http) {
        //for pagination
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        //declare variable for mainain ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;
        $('#myDiv').show();

        var aCookie = new cookie();
        checkCookie(aCookie);

        var CompanyId = aCookie.CompanyId;
        if (CompanyId == "") {
            CompanyId = 0;
        }
        //list
        //get Company list information/api/Admin/GetMyCompany/' + CompanyId
        $http.get('/api/Admin/GetMyCompany').success(function (data) {
            $scope.companies = data;
            for (var i = 0; i < data.length; i++) {
                if (CompanyId == '0'|| CompanyId == undefined) {
                    $scope.CompanyName = 'Select';
                } else if (CompanyId == data[i].CompanyId) {
                    //$scope.merchantdetails = $scope.merchants.ResponseObject[i];
                    $scope.CompanyName = $scope.companies[i].CompanyName;
                    //alert($scope.ForeignMerchantName);
                }
            }
            $scope.loading = false;
            $('#myDiv').hide();
        })
			.error(function (data) {
			    $scope.error = "An Error has occured while loading posts!";
			    $scope.loading = false;
			});

        //list
        //get site list information
        $http.get('/api/Admin/GetSite/' + CompanyId).success(function (data) {
            $scope.sites = data;
            $scope.loading = false;
            //$("#materialModelAdd").modal('hide');
        })
            .error(function (data) {
                $scope.error = "An Error has occured while loading posts!";
                $scope.loading = false;
            });

        //for pagination
        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
        };

        //update
        //show selected material type
        $scope.edit = function (data) {
            $scope.site = data;
            $scope.editMode = true;

            $('#siteModelAdd').modal('show');
        };
        //update selected site details
        $scope.update = function (site) {
            var postdata = {};
            postdata.SiteId = site.SiteId;
            postdata.CompanyId = site.CompanyId;
            postdata.DefaultCost = site.DefaultCost;
            postdata.NoOfHouse = site.NoOfHouse;
            postdata.SiteName = site.SiteName;
            $http.post('/api/Admin/EditSite', postdata).success(function (data) {
                $scope.sites = data;
                $scope.loading = false;
                $("#siteModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Site details updated successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetSite'+CompanyId).success(function (data) {
                    $scope.sites = data;
                    $scope.loading = false;
                    //$("#materialModelAdd").modal('hide');
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    $("#siteModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = "An Error has occured while loading posts!";
				    $scope.loading = false;
				});
        };

        //add
        //show add site dialog
        $scope.showadd = function () {
            $scope.editMode = false;
            $("#siteModelAdd").modal('show');
        };
        // add site
        $scope.add = function (site) {
            var postdata = {};
            postdata.SiteId = 0;
            postdata.CompanyId = site.CompanyId;
            postdata.DefaultCost = site.DefaultCost;
            postdata.NoOfHouse = site.NoOfHouse;
            postdata.SiteName = site.SiteName;
            $http.post('/api/Admin/AddSite', postdata).success(function (data) {
                $scope.loading = false;
                $("#siteModelAdd").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Site added successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetSite').success(function (data) {
                    $scope.sites = data;
                    $scope.loading = false;
                    //$("#materialModelAdd").modal('hide');
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    //$("#materialModelAdd").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    $scope.error = data;
				    $scope.loading = false;
				});

        };
        //cancel add site dialog
        $scope.cancel = function () {
            $("#siteModelAdd").modal('hide');
        };

        //delete
        //show confirm to delete site
        $scope.showconfirm = function (data) {
            $scope.site = data;
            $("#confirmModal").modal('show');
        };
        //delete materialType
        $scope.delete = function (site) {
            var postdata = {};
            postdata.SiteId = site.SiteId;
            postdata.CompanyId = site.CompanyId;
            postdata.DefaultCost = site.DefaultCost;
            postdata.NoOfHouse = site.NoOfHouse;
            postdata.SiteName = site.SiteName;
            $http.post('/api/Admin/DeleteSite', postdata).success(function (data) {
                $scope.loading = false;
                $("#confirmModal").modal('hide');
                var n = noty({
                    layout: 'bottomRight',
                    theme: 'defaultTheme', // or ''
                    type: 'success',
                    timeout: 2000,
                    text: 'Site deleted successfully.',
                    animation: {
                        open: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        close: {
                            height: 'toggle'
                        }, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
                //list
                //get material list information
                $http.get('/api/Admin/GetSite'+CompanyId).success(function (data) {
                    $scope.sites = data;
                    $scope.loading = false;
                })
                    .error(function (data) {
                        $scope.error = "An Error has occured while loading posts!";
                        $scope.loading = false;
                    });
            })
				.error(function (data) {
				    //$("#confirmModal").modal('hide');
				    var n = noty({
				        layout: 'bottomRight',
				        theme: 'defaultTheme', // or ''
				        type: 'error',
				        timeout: 2000,
				        text: data,
				        animation: {
				            open: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            close: {
				                height: 'toggle'
				            }, // jQuery animate function property object
				            easing: 'swing', // easing
				            speed: 500 // opening & closing animation speed
				        }
				    });
				    //alert('error occured ' + data)
				    $scope.error = data;
				    $scope.loading = false;
				});
        };

        $scope.ChangeCompany = function (company) {
            setCookie("CompanyId", company.Id, 1); //1 means 1 day cookie
            window.location.href = "/Home/Sites";
        }
    }

    ////9. Credit controller method
    function CreditController($scope, $http) {
        //for pagination
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        //declare variable for mainain ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;
        $('#myDiv').show();
        $('#myDiv').hide();
        //for pagination
        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
        };

        //add
        //show creditModelAdd type dialog
        $scope.showadd = function () {
            $scope.editMode = false;
            $("#creditModelAdd").modal('show');
        };

        //cancel add material type dialog
        $scope.cancel = function () {
            $("#creditModelAdd").modal('hide');
        };

    };
})();