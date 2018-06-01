/**
 * Created by Himanshu wolf on 18/03/17.
 */

TDG.prodcutType = {
  tour : 9,
  stay: 10
};


Product = function(id, product, type, vendor, vendors, price, size, start_date, end_date) {
  this.id = id;
  this.product = product;
  this.type = type;
  this.vendor = vendor? JSON.parse(vendor): {};
  this.vendors = JSON.parse(vendors);
  this.price = parseInt(price);
  this.start_date = start_date;
  this.end_date = end_date || '';
  this.size = size;
  this.advance = '';
  this.priceId = ''
};

Product.prototype.toJson = function() {
  return JSON.stringify({product: this.product, type: this.type, vendor: this.vendor, price: this.price, start_date: this.start_date, size: this.size, priceId : this.priceId,  advance : this.advance});
};

Product.prototype.getSourceId = function() {
  return TDG.prodcutType[this.type]
};

Product.prototype.getPriceId = function() {
  return this.priceId
};
Product.prototype.getPrice = function() {
  return this.price
};

Product.prototype.serialize = function() {
  var obj = this;
  return '' +
      Object.keys(obj).map(function(key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(obj[key]);
      }).join('&');
};

Product.prototype.getPricingFactors = function() {
  return {
    vendor_id : this.vendor.id,
    source_id : this.getSourceId(this.type),
    product_id : this.id,
    travellers : this.size,
    start_date: this.start_date
  };
};

Product.prototype.updateProductCache = function() {
  var productJson = this.toJson();
  TDG.utils.createCookie('pdi', productJson, 1)
};

Product.prototype.addPriceList = function(priceList) {
  if(priceList.length) {
    for(var i=0; i < priceList.length; i++){
      this['price' + priceList[i].id] = priceList[i]
    }
  }
};

Product.prototype.getPriceObj = function(priceId) {
  return this['price' + priceId];
};

Product.prototype.updateProduct = function(price, priceId, advance, start_date, size, vendor, priceList) {
  this.priceId = priceId || this.priceId;
  this.price = parseInt(price) || this.price;
  this.advance = parseInt(advance) || this.advance;
  this.vendor = vendor || this.vendor;
  this.start_date = start_date || this.start_date;
  this.size = size || this.size;
  priceList  = priceList || [];
  this.addPriceList(priceList)
}