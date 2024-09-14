function fetchProjectContent() {
    const urlParams = new URLSearchParams(window.location.search);
    let project = urlParams.get('project');

    // We converted the project title to a url friendly format, so we need to convert it back to the original format
    // The project title may have had uppercase, so need to match it to the original title
    $.getJSON(PROJECTS_JSON)
        .done(function(data) {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                if (data[i].title.replace(/ /g, '_').toLowerCase() === project) {
                    project = data[i].title;
                    break;
                }
            }

            //Get the project content, is a converted word document to html
            console.log('Fetching project content for:', project);
            if (project) {
                fetch(`/projects/${project}/project_page.html`)
                    .then(response => {
                        if (!response.ok) throw new Error(`Failed to load project content`);
                        return response.text();
                    })
                    .then(writeup_html => {
                        const project_path = `/projects/${project}/`;
            
                        // Insert the HTML into the page
                        document.getElementById('project-webpage-content').innerHTML = writeup_html;
            
                        // Update image paths
                        const images = document.querySelectorAll('#project-webpage-content img');
                        images.forEach(img => {
                            const src = img.getAttribute('src');
                            if (src && !src.startsWith('http')) { // Check if src is a relative path
                                img.setAttribute('src', `${project_path}${src}`);
                            }
                        });

                        // Encapsulate the images in a container div with full span
                        //Also take out the width and height attributes of the images
                        images.forEach(img => {
                            // const container = document.createElement('div');
                            // container.className = 'col-12';
                            // img.parentNode.insertBefore(container, img);
                            img.removeAttribute('width');
                            img.removeAttribute('height');
                            img.setAttribute('style', 'max-width:100%; height:auto;');
                            img.setAttribute('class', 'img-fluid');
                            // container.appendChild(img);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                document.getElementById('project-webpage-content').innerHTML = "<p>No project specified.</p>";
            }
        });
}

async function populateProjectDropdown() {
    try {
        console.log('Populating project dropdown');
        
        // Fetch the project JSON data
        const response = await $.getJSON(PROJECTS_JSON);
        const projectDropdown = $('#all-project-dropdown');

        // Iterate through the projects in order
        for (const project of response) {
            // Create a new list item with a dropdown link
            const projectItem = $('<li>').addClass('nav-item');
            const projectLink = $('<a>').addClass('dropdown-item')
                                        .attr('href', `/projects?project=${project.title.replace(/ /g, '_').toLowerCase()}`)
                                        .text(project.title)
                                        .css('text-decoration', 'none');
            
            // Append the link to the list item
            projectItem.append(projectLink);
            
            // Append the list item to the dropdown
            projectDropdown.append(projectItem);
        }
    } catch (error) {
        console.error('Error fetching project data:', error);
    }
}


$(document).ready(function() {
    fetchProjectContent();
    populateProjectDropdown();
});