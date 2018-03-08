### Takeaways

I usually try and avoid libraries as much as possible, but I did implement lodash .get() function, which abstracted this very nicely

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