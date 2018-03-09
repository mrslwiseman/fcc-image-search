# API: Image Search Abstraction Layer
### Node.js | Express | Firebase
---

Part of a series of Free Code Camp Backend / API projects.  
This API queries a Google Custom Search Engine, simplifying the results.  
You can also check out what the recent search queries were!  

### User Story
- I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
- I can paginate through the responses by adding a ?offset=2 parameter to the URL.
- I can get a list of the most recently submitted search strings.

---
### Example Usage
To make a search:  

    ...herokuapp.com/search/cats  

To see 10 most recent search queries 

    ...herokuapp.com/recent

To paginate search results

    ...herokuapp.com/search/cats?offset=2<br>
    // results come in groups of 10

### Example Response 
Search:
Returns an array of result objects

    {  
    "title": "Is Your Cat Left-Handed? Here's How to Tell.", <br>
    "alt": "Like humans, domestic cats have a paw preference that's often related to their sex.",<br>
    "page_url": "https://news.nationalgeographic.com/2018/01/animals-pets-cats-right-handed/",<br>
    "src_url": "https://news.nationalgeographic.com/content/dam/news/2018/01/29/cats-right-paw/01-Cats.ngsversion.1517259605074.adapt.1900.1.jpg"
    }



### Takeaways
- Implemented Firebase in a project
- I usually try and avoid libraries as much as possible, but I did implement lodash .get() function, which abstracted this very nicely

    const alt = r 
    && r.pagemap 
    && r.pagemap.imageobject 
    && r.pagemap.imageobject[0].caption 
    || null

    const src_url = r 
    && r.pagemap 
    && r.pagemap.cse_image 
    && r.pagemap.cse_image[0].src 
    || null

to: 

    const alt = get(r, 'pagemap.imageobject[0].caption', null)
    const src_url = get(r, 'pagemap.cse_image[0].src', null)

### Todo
- Need to figure out how to implement mocks