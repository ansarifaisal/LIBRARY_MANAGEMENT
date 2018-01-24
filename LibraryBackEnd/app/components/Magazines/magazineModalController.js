MagazineModule.controller("MagazineModalController", [
    "$uibModalInstance",
    "MagazineFactory",
    "UserFactory",
    "CourseFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    "$routeParams",
    "$timeout",
    function ($uibModalInstance, MagazineFactory, UserFactory, CourseFactory, $route, toastr, $rootScope, modal, $filter, $scope, $routeParams, $timeout) {

        var me = this;

        me.publisher = modal.publisher;

        me.bindingMagazine = modal.bindingMagazine;

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

        me.duration = "";

        me.change = false;

        me.trackChanges = function () {
            me.change = true;
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

        me.subscriptionDatePickers = function () {
            me.subscriptionDatePicker.opened = true;
        };

        me.subscriptionDatePicker = {
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

        me.chequeDatePickers = function () {
            me.chequeDatePicker.opened = true;
        };

        me.chequeDatePicker = {
            opened: false
        };


        me.bundleSentDatePickers = function () {
            me.bundleSentDatePicker.opened = true;
        };

        me.bundleSentDatePicker = {
            opened: false
        };


        me.bundleDeliveryDatePickers = function () {
            me.bundleDeliveryDatePicker.opened = true;
        };

        me.bundleDeliveryDatePicker = {
            opened: false
        };


        me.monthPickerOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minMode: "month",
            datepickerMode: "month",
            startingDay: 1
        };

        me.futureMonthPickerOptions = {
            formatYear: 'yy',
            minDate: new Date(),
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

        me.futureDatePickerOptions = {
            formatYear: 'yy',
            minDate: new Date(),
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

            if (!me.periodicDetail.course)
                me.periodicDetail.course = "General";

            if (me.periodicDetail.orderNo === "")
                me.periodicDetail.orderNo = "NA";

            if (me.periodicDetail.billNo === "")
                me.periodicDetail.billNo = "NA";

            if (me.periodicDetail.amount === "")
                me.periodicDetail.amount = 0;

            if (me.periodicDetail.bundled === "Yes" && me.periodicDetail.bundleSentDate !== undefined)
                MagazineFactory.updateMagazineStatus(me.periodicDetail.id);
            else
                me.periodicDetail.bundled === "No";

            me.periodicDetail.from = MagazineFactory.dateParse(me.periodicDetail.from);
            me.periodicDetail.to = MagazineFactory.dateParse(me.periodicDetail.to);
            me.periodicDetail.orderDate = MagazineFactory.dateParse(me.periodicDetail.orderDate);
            me.periodicDetail.billDate = MagazineFactory.dateParse(me.periodicDetail.billDate);
            me.periodicDetail.billDate = me.periodicDetail.billDate;
            var addOrEdit = MagazineFactory.addOrEditPeriodicDetail(me.periodicDetail);

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

        me.getPublishers = function () {
            MagazineFactory.getPublishers().then(function (publishers) {
                me.publishers = publishers;
            }, function (errorResponse) {
                console.log(errorResponse);
                toastr.error("Error Fetching Publishers");
            });
        }

        me.getCourses = function () {
            CourseFactory.getCourses().then(function (courses) {
                me.courses = courses;
            });
        }


        me.getPaidBy = function () {
            me.paidBy = MagazineFactory.getPaidBy();
        }

        me.isBundle = function () {
            me.isBundle = MagazineFactory.getBundleOptions();
        }

        me.getPeriodicity = function () {
            me.periodicity = MagazineFactory.getPeriodicity();
        }

        me.getTypes = function () {
            me.types = MagazineFactory.getTypes();
        }

        me.isPaidByCheque = function (paidBy) {
            me.cheque = false;
            if (paidBy === "Cheque" || paidBy === "DD")
                me.cheque = true;
            return me.cheque;
        }


        me.bundleOptionYes = function (option) {
            console.log(option);
            me.bundleOption = "No";
            if (option === "Yes")
                me.bundleOption = "Yes";
            return me.bundleOption;
        }

        me.isBundled = function (bundleDate) {
            me.bundle = false;
            if (bundleDate)
                me.bundle = true;
            return me.bundle;
        }

        me.getPeriodicityOptions = function () {
            me.periodicityOptions = MagazineFactory.getPeriodicityOptions();
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
            if (!title || !me.change)
                return;
            me.exists = false;
            MagazineFactory.checkExistingPeriodicDetail(title).then(function (periodicDetail) {
                if (periodicDetail)
                    me.exists = true;
            });
            return me.exists;
        }

        me.submitMagazineForm = function () {
            me.magazine.periodicTitle = $routeParams.title;
            me.magazine.periodicId = $routeParams.id;
            me.magazine.recievedBy = $rootScope.user.fullName;
            me.magazine.month = MagazineFactory.dateParse(me.magazine.month);
            me.magazine.dateOfRecieved = MagazineFactory.dateParse(me.magazine.dateOfRecieved);
            if (me.magazine.remark === "")
                me.magazine.remark = "NA";
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


        me.checkExistingMagazine = function (number) {
            if (!number || !me.change)
                return;
            me.exists = false;
            MagazineFactory.getMagazineByNumber(number).then(function (magazine) {
                if (magazine)
                    me.exists = true;
                return me.exists;
            });
        }

        me.isEligible = function (user) {
            if (user.issueCount > $rootScope.configuration.noOfBookIssue) {
                me.errorMsg = "User has already took " + $rootScope.configuration.noOfBookIssue + " book/magazine";
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
                console.log(magazine.status);
                me.bundled = magazine.status;
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
                MagazineFactory.getMagazineNumbers().then(function (numbers) {
                    me.numbers = numbers;
                });
                UserFactory.getRollNos().then(function (rollNos) {
                    me.rollNos = rollNos;
                });
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

        me.loadPeriodicDetailData = function () {
            me.getPublishers();
            me.getPaidBy();
            me.getPeriodicity();
            me.isBundle();
            me.getCourses();
            me.getTypes();
            me.getPeriodicityOptions();
            me.periodicDetail.from = MagazineFactory.parseDate(me.periodicDetail.from);
            me.periodicDetail.to = MagazineFactory.parseDate(me.periodicDetail.to);
            me.periodicDetail.subscriptionDate = MagazineFactory.parseDate(me.periodicDetail.subscriptionDate);
            me.periodicDetail.orderDate = MagazineFactory.parseDate(me.periodicDetail.orderDate);
            me.periodicDetail.billDate = MagazineFactory.parseDate(me.periodicDetail.billDate);
            me.periodicDetail.chequeDate = MagazineFactory.parseDate(me.periodicDetail.chequeDate);
            me.periodicDetail.bundleSentDate = MagazineFactory.parseDate(me.periodicDetail.bundleSentDate);
            me.periodicDetail.bundleDeliveryDate = MagazineFactory.parseDate(me.periodicDetail.bundleDeliveryDate);
            if (me.periodicDetail.paidBy !== undefined)
                me.isPaidByCheque(me.periodicDetail.paidBy);
            if (me.periodicDetail.bundled !== undefined)
                me.bundleOptionYes(me.periodicDetail.bundled);
        }


        me.submitBindingMagazineForm = function () {
            if (me.bindingMagazine.title === "")
                return;

            var addOrEdit = MagazineFactory.addOrEditBindingMagazine(me.bindingMagazine);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Details Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deleteBindingMagazine = function () {
            $rootScope.isBusy = true;
            MagazineFactory.deleteBindingMagazine(me.bindingMagazine).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Details Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Details.");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.loadBindingMagazineData = function () {
            me.getCourses();
            me.getPublishers();
        }

        me.checkExistingBindingMagazine = function (number) {
            if (!number || !me.change)
                return;
            me.exists = false;
            MagazineFactory.checkExistingBindingMagazineDetail(number).then(function (bindingMagazine) {
                if (bindingMagazine)
                    me.exists = true;
            });
            return me.exists;
        }

        $uibModalInstance.opened.then(function () {
            if (me.magazine)
                me.getStatus();
        });
    }
]);