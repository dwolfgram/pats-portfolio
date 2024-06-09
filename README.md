# Pat's Portfolio

This portfolio website was built using Nextjs and PayloadCMS V3. [View the website](https://pats-portfolio-vlc.netlify.app/)

### How to add projects

1. Log in to admin panel

1. Go to `Projects`

1. Fill in the project's information:

   - Title of the project.
   - Url Slug (ex: this-is-an-example-slug will be patsportfolo.com/work/this-is-an-example-slug).
   - Featured image - this will be the image shown on the list of projects.
     > NOTE: I recommend compressing all videos and images before uploading so that the file sizes are as small as possible. This will help the site load faster.
   - Other images - will be shown on the project detail page.
   - Categories - you can either add new ones from this screen or from the "Categories" editor on the dashboard
   - Tools used - not shown right now but could be used to filter projects in the future if you want
   - Project description - this will be shown on the right hand side of the project details page

> Note: Media (aka images), categories, and tool can all be separately added via the dashboard and later added to a project or created while adding a project like described above.

### About Page

I tried to make the about page content as dynamic as possible so you can change it whenever you want, but there are some things you need to know so that it works.

> [!CAUTION]
> The `field name` of the different about page items on the dashboard must stay the same because they are used to query the data.

To start go to the About Page Data section on the admin dashboard. There are currently 4 items that you can change:

1. image url

1. email

1. About You Text

1.About Page Title.

When you go to edit an item there will be two fields

1. Field Name (DO NOT CHANGE ⛔️⛔️⛔️)

1. About Text (Can change ✅)

In order to change the about page image, upload a new media item in the dashboard and copy the `url` field from the uploaded item.
