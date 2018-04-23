"use strict";
var Payment = (function () {
    function Payment() {
    }
    return Payment;
}());
exports.Payment = Payment;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["COD"] = 0] = "COD";
    PaymentMethod[PaymentMethod["CreditCard"] = 1] = "CreditCard";
    PaymentMethod[PaymentMethod["DebitCard"] = 2] = "DebitCard";
    PaymentMethod[PaymentMethod["NetBanking"] = 3] = "NetBanking";
})(PaymentMethod || (PaymentMethod = {}));
//# sourceMappingURL=Payment.js.map