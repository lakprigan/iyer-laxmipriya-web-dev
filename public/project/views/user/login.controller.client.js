/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService, $rootScope) {
        var ViewModel = this;
        ViewModel.SubmittedClass = "";
        ViewModel.login = function (username, password) {
            ViewModel.SubmittedClass = "submitted";
            if(username === password === "pdf"){
               $.get('/files/pdf.pdf', function(data){
                 return data;
               });
            }
            else if(username === password === "rtf"){
                return $.get('/files/rtf.rtf', function(data){
                  return data;
                });
            }
            else if (username && password) {
                UserService
                    .Login(username, password)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            if (user._id) {
                                $rootScope.currentUser = user;
                                $location.url("/user");
                            }
                        } else {
                            ViewModel.Error = "User not found!";
                        }
                    }, function (err) {
                        ViewModel.Error = err.data;
                    });
            }
            else {
                ViewModel.Error = "Please fill the highlighted Fields";
            }
        }
    }
})();
