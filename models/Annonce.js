class Annonce{
    constructor(userName,title,price,category,description,dateCreation){
        this.userName=userName;
        this.title=title;
        this.price=price;
        this.category=category;
        this.description=description;
        this.dateCreation=dateCreation;
        this.dateEnd=null;
        this.visibility=true;
    }
}

module.exports=Annonce;