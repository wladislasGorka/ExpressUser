class Annonce{
    constructor(userId,name,price,category,description,dateCreation,visibility){
        this.userId=userId;
        this.name=name;
        this.price=price;
        this.category=category;
        this.description=description;
        this.dateCreation=dateCreation;
        this.dateEnd=NULL;
        this.visibility=visibility;
    }
}

module.exports=Annonce;