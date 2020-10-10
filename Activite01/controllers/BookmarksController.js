const Repository = require('../models/Repository');
const url = require('url');

module.exports = 
class BookmarksController extends require('./Controller') {
    constructor(req, res){
        super(req, res);
        this.bookmarksRepository = new Repository('Bookmarks');
    }
    // GET: api/bookmarks
    // GET: api/bookmarks/{id}
    get(id){
        if(!isNaN(id))
            this.response.JSON(this.bookmarksRepository.get(id));
        else
            this.response.JSON(this.bookmarksRepository.getAll());
    }
	getName(req, res)
	{
		const reqUrl = url.parse(req.url, true);
		let string = reqUrl.query.name;	
		let nom = string.slice(1,-2);
        this.response.JSON(this.bookmarksRepository.getName(nom));
    }
	sortName(){
		this.response.JSON(this.bookmarksRepository.sortName());
	}
	getCategory(req, res)
	{
		const reqUrl = url.parse(req.url, true)
		let string = reqUrl.query.category;
		let categoryName = string.slice(1,-2);
        this.response.JSON(this.bookmarksRepository.getCategory(categoryName));
    }
	sortCategory(){
		this.response.JSON(this.bookmarksRepository.sortCategory());
	}
    // POST: api/bookmarks body payload[{"Id": 0, "Name": "...", "Email": "...", "Phone": "..."}]
    post(bookmark){  
        // todo : validate bookmark before insertion
        // todo : avoid duplicates
		if(get(bookmark.id) == null)
		{
			let newBookmark = this.bookmarksRepository.add(bookmark);
			if (newBookmark)
				this.response.created(newBookmark);
			else
				this.response.internalError();
		}
        
    }
    // PUT: api/bookmarks body payload[{"Id":..., "Name": "...", "Email": "...", "Phone": "..."}]
    put(bookmark){
        // todo : validate bookmark before updating
		if(get(bookmark.id) == null)
		{
			if (this.bookmarksRepository.update(bookmark))
				this.response.ok();
			else 
				this.response.notFound();
		}
        
    }
    // DELETE: api/bookmarks/{id}
    remove(id){
        if (this.bookmarksRepository.remove(id))
            this.response.accepted();
        else
            this.response.notFound();
    }
}