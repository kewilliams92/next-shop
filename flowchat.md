fetching data flowchart with Next.js

Same data for all users? Yes?
    -if we have a list products in a shop website, then yes.
        -All users that visit our shop should see the same products
            -points to a server-side approach
    -if we are talking about a user profile page (user can update/enter new information) then no
        -each user will see different data.
    
    No? 
        -This means the data is user specific, which points to fetching data on the client-side.
            Is it okay to access the backend API directly from the user's web browser?
            -Yes?  Quite rare, but if so then Client-side from External API is fine
            -No? Quite often we will need to write an API route that will act as a proxy between our frontend app running on the browser, and the backend API where the data is stored.
    

Can the data change?
    -If we have a list of products, can those products be updated? or can we add new products?
        -Do we expect the page to automatically expect the page to automatically reflect those changes?
            No?  Use static generation
            Yes? Incremental Static Regeneration 