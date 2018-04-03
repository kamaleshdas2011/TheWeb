"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var image_1 = require("../classes/image");
var ImageService = (function () {
    function ImageService(_http) {
        this._http = _http;
        this.images = [];
    }
    ImageService.prototype.getFeaturedImages = function () {
        this.images.push(new image_1.Image("https://s3.ap-south-1.amazonaws.com/elasticbeanstalk-ap-south-1-412611335750/IMG_20180203_115139191.jpg"));
        this.images.push(new image_1.Image("https://s3.ap-south-1.amazonaws.com/elasticbeanstalk-ap-south-1-412611335750/IMG_20180203_115149673.jpg"));
        this.images.push(new image_1.Image("https://s3.ap-south-1.amazonaws.com/elasticbeanstalk-ap-south-1-412611335750/20180212_123448-ANIMATION.gif"));
        return this.images;
    };
    return ImageService;
}());
ImageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map