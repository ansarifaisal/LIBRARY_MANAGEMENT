MagazineModule.controller("MagazineModalController", [
    "$uibModalInstance",
    "MagazineFactory",
    "UserFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    "$routeParams",
    function ($uibModalInstance, MagazineFactory, UserFactory, $route, toastr, $rootScope, modal, $filter, $scope, $routeParams) {

        var me = this;

        me.publisher = modal.publisher;

        me.title = modal.title;

        me.btnText = modal.btnText;

        me.periodicDetail = modal.periodicDetail;

        me.magazine = modal.magazine;

        me.issueMagazine = modal.issueMagazine;

        me.lostOrReplace = {
            title: '',
            number: '',
            volume: '',
            issuedDate: '',
            returnDate: '',
            receivedBy: '',
            rollNo: '',
            fullName: '',
            course: '',
            email: '',
            status: ''
        }

        me.returnMagazine = {
            title: '',
            number: '',
            volume: '',
            issuedDate: '',
            returnDate: '',
            actualReturnDate: '',
            fullName: '',
            rollNo: '',
            course: '',
            email: '',
            recievedBy: '',
            fine: ''
        }

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };


        me.fromMonthPickers = function () {
            me.fromMonthPicker.opened = true;
        };

        me.fromMonthPicker = {
            opened: false
        };

        me.toMonthPickers = function () {
            me.toMonthPicker.opened = true;
        };

        me.toMonthPicker = {
            opened: false
        };

        me.orderDatePickers = function () {
            me.orderDatePicker.opened = true;
        };

        me.orderDatePicker = {
            opened: false
        };


        me.billDatePickers = function () {
            me.billDatePicker.opened = true;
        };

        me.billDatePicker = {
            opened: false
        };

        me.monthPickerOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minMode: "month",
            datepickerMode: "month",
            startingDay: 1
        };

        me.datePickerOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };


        me.submitPublisherForm = function () {
            if (me.publisher.title === "")
                return;

            var addOrEdit = MagazineFactory.addOrEditPublisher(me.publisher);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Publisher Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deletePublisher = function () {
            $rootScope.isBusy = true;
            MagazineFactory.deletePublisher(me.publisher).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Publisher Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Publisher.");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.submitPeriodicMagazineForm = function () {

            if (me.periodicDetail.title === "")
                return;

            if (me.periodicDetail.chequeNo === "")
                me.periodicDetail.chequeNo = "NA";

            me.periodicDetail.from = MagazineFactory.dateParse(me.periodicDetail.from);
            me.periodicDetail.to = MagazineFactory.dateParse(me.periodicDetail.to);
            me.periodicDetail.orderDate = MagazineFactory.dateParse(me.periodicDetail.orderDate);
            me.periodicDetail.billDate = MagazineFactory.dateParse(me.periodicDetail.billDate);

            var addOrEdit = MagazineFactory.addOrEditPeriodicDetail(me.periodicDetail);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Periodic Details Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getPublishers = function () {
            MagazineFactory.getPublishers().then(function (publishers) {
                me.publishers = publishers;
            }, function (errorResponse) {
                console.log(errorResponse);
                toastr.error("Error Fetching Publishers");
            });
        }

        me.getPaidBy = function () {
            me.paidBy = MagazineFactory.getPaidBy();
        }

        me.getPeriodicity = function () {
            me.periodicity = MagazineFactory.getPeriodicity();
        }
        me.isPaidByCheque = function (paidBy) {
            me.cheque = false;
            if (paidBy === "Cheque")
                me.cheque = true;
            return me.cheque;
        }

        me.deletePeriodicDetail = function () {
            $rootScope.isBusy = true;
            MagazineFactory.deletePeriodicDetail(me.periodicDetail).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Periodic Detail Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();
                toastr.error("Error Deleting Periodic Detail.");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.checkExistingPeriodicDetails = function (title) {
            me.exists = false;
            MagazineFactory.checkExistingPeriodicDetail(title).then(function (periodicDetail) {
                if (periodicDetail)
                    me.exists = true;
            });
            return me.exists;
        }

        me.submitMagazineForm = function () {
            me.magazine.periodicTitle = $routeParams.title;
            me.magazine.recievedBy = $rootScope.user.fullName;
            me.magazine.month = MagazineFactory.dateParse(me.magazine.month);
            me.magazine.dateOfRecieved = MagazineFactory.dateParse(me.magazine.dateOfRecieved);
            if (me.magazine.id === undefined || me.magazine.id === "")
                me.magazine.status = "Available";
            var addOrEdit = MagazineFactory.addOrEditMagazine(me.magazine);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deleteMagazine = function () {
            $rootScope.isBusy = true;
            MagazineFactory.deleteMagazine(me.magazine).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Magazine Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();
                toastr.error("Error Deleting Magazine.");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.submitIssueMagazineForm = function () {
            me.issueMagazine.issuedBy = $rootScope.user.fullName;
            me.issueMagazine.fine = 0;
            var addOrEdit = MagazineFactory.addOrEditIssuedMagazine(me.issueMagazine);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                console.log(errorResponse);
                console.log(errorResponse.data);
                $route.reload();
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getByRollNumber = function () {
            if (me.issueMagazine.rollNo === "")
                return;
            UserFactory.getStudentByRollNo(me.issueMagazine.rollNo).then(function (user) {
                if (!user)
                    return me.userExists = false;
                else
                    me.userExists = true;
                me.issueMagazine.fullName = user.fullName;
                me.issueMagazine.course = user.course;
                me.issueMagazine.email = user.email;
                me.isEligible(user);
            });
        }

        me.isEligible = function (user) {
            if (user.issueCount >= 2) {
                me.errorMsg = "User has already took " + user.issueCount + " book/magazine";
                me.eligible = true;
            }
            else
                me.eligible = false;
            if (user.status === "Default") {
                me.errorMsg = "User status is default.";
                me.eligible = true;
            }

            return me.eligible;
        }

        me.getMagazineByNumber = function () {
            if (me.issueMagazine.number === "")
                return;
            MagazineFactory.getMagazineByNumber(me.issueMagazine.number).then(function (magazine) {
                if (!magazine)
                    return me.magazineExists = false;
                else
                    me.magazineExists = true;
                me.issueMagazine.title = magazine.periodicTitle;
                me.issueMagazine.volume = magazine.volume;
                me.isIssue(magazine);
            });
        }

        me.isIssue = function (magazine) {
            if (magazine.status === "Issued") {
                me.isIssued = true;
                me.errorMsg = "Magazine already issued.";
            }
            else
                me.isIssued = false;
            if (magazine.status === "Lost") {
                me.errorMsg = "Magazine is lost.";
                me.isIssued = true;
            }

            return me.isIssued;
        }

        me.returnIssueMagazine = function (issueMagazine) {

            MagazineFactory.deleteIssuedMagazine(issueMagazine).then(function () {
                toastr.success("Magazine Returned Successfully!");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }


        me.returnIssueMagazine = function (issueMagazine) {
            me.returnMagazine.title = issueMagazine.title;
            me.returnMagazine.number = issueMagazine.number;
            me.returnMagazine.volume = issueMagazine.volume;
            me.returnMagazine.issuedDate = issueMagazine.issuedDate;
            me.returnMagazine.returnDate = issueMagazine.returnDate;
            me.returnMagazine.fullName = issueMagazine.fullName;
            me.returnMagazine.rollNo = issueMagazine.rollNo;
            me.returnMagazine.course = issueMagazine.course;
            me.returnMagazine.email = issueMagazine.email;
            me.returnMagazine.recievedBy = $rootScope.user.fullName;
            me.returnMagazine.fine = issueMagazine.fine;
            me.returnMagazine.actualReturnDate = new Date();
            MagazineFactory.deleteIssuedMagazine(issueMagazine).then(function () {
                MagazineFactory.returnIssuedMagazine(me.returnMagazine).then(function () {
                    me.ok();
                    $route.reload();
                    toastr.success("Magazine Returned Successfully!");
                }, function (errorResponse) {
                    console.log(errorResponse);
                    toastr.error("Error getting response");
                });
            }, function () {
                toastr.error("Error deleting magazine");
            });

        }

        me.lostMagazine = function (issueMagazine) {

            me.lostOrReplace.title = issueMagazine.title;
            me.lostOrReplace.number = issueMagazine.number;
            me.lostOrReplace.volume = issueMagazine.volume;
            me.lostOrReplace.issuedDate = issueMagazine.issuedDate,
            me.lostOrReplace.returnDate = issueMagazine.returnDate;
            me.lostOrReplace.receivedBy = $rootScope.user.fullName;
            me.lostOrReplace.rollNo = issueMagazine.rollNo;
            me.lostOrReplace.fullName = issueMagazine.fullName;
            me.lostOrReplace.course = issueMagazine.course;
            me.lostOrReplace.email = issueMagazine.email;
            me.lostOrReplace.status = "Lost";

            MagazineFactory.deleteIssuedMagazine(issueMagazine).then(function () {
                MagazineFactory.addLostMagazine(me.lostOrReplace).then(function () {
                    me.ok();
                    $route.reload();
                    toastr.success("Issued Magazine Updated Successfully.");
                }, function (errorResponse) {
                    me.ok();
                    toastr.error("Error getting response");
                });
            }, function () {
                toastr.error("Error performing action");
            });
        }

        me.setData = function () {
            me.lostOrReplace = modal.lostOrReplace;
        }

        me.checkIssueMagazine = function () {
            if (me.issueMagazine) {
                if (me.issueMagazine.number)
                    me.getMagazineByNumber(me.issueMagazine.number);
                if (me.issueMagazine.rollNo)
                    me.getByRollNumber(me.issueMagazine.rollNo);
            }
        }

        me.replaceMagazine = function (lostOrReplace) {
            lostOrReplace.status = "Replaced";
            lostOrReplace.recievedBy = $rootScope.user.fullName;
            MagazineFactory.editLostMagazine(lostOrReplace).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Magazine Details Updated Successfully.");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.undoReplaceMagazine = function (lostOrReplace) {
            lostOrReplace.status = "Lost";
            lostOrReplace.recievedBy = $rootScope.user.fullName;
            MagazineFactory.undoReplaceMagazine(lostOrReplace).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Magazine Details Updated Successfully.");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.getStatus = function () {
            return me.status = MagazineFactory.getStatus();
        }

        $uibModalInstance.opened.then(function () {
            if (me.periodicDetail) {
                me.getPublishers();
                me.getPaidBy();
                me.getPeriodicity();
                me.periodicDetail.from = MagazineFactory.parseDate(me.periodicDetail.from);
                me.periodicDetail.to = MagazineFactory.parseDate(me.periodicDetail.to);
                me.periodicDetail.orderDate = MagazineFactory.parseDate(me.periodicDetail.orderDate);
                me.periodicDetail.billDate = MagazineFactory.parseDate(me.periodicDetail.billDate);
                if (me.periodicDetail.paidBy !== undefined)
                    me.isPaidByCheque(me.periodicDetail.paidBy);
            }
            if (me.magazine)
                me.getStatus();
        });
    }
]);