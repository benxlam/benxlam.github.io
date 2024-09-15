$(document).ready(function() {

    // Get the projects data from the JSON file
    $.getJSON(PROJECTS_JSON)
    .done(function(data) {
        const projectsContainer = $('#projects');
        const loadingIndicator = $('#loading');
        loadingIndicator.hide();

        // Function to process each project sequentially
        function renderProject(index) {
            if (index >= data.length) return; // Stop when all projects are rendered
            
            const project = data[index];
            const projectCard = $('<div>').addClass('row');
            console.log(project);
            
            // Fetch the project card template
            $.get(PROJECTCARD_TEMPLATE, function(template) {
                // Fetch the Markdown file
                $.get(`/projects/${project.title}/project_card.html`, function(project_card_html) {
                    
                    // Replace template placeholders with project data
                    const renderedTemplate = template
                        .replace(/\${project.title}/g, project.title)
                        .replace('${project.date}', project.date)
                        .replace('${project.image}', project.image)
                        .replace('${project.text}', project_card_html)
                        .replace(/\${project.url}/g, project.title.replace(/ /g, '_').toLowerCase());

                    // Append the project card to the projects container
                    projectCard.html(renderedTemplate);
                    projectsContainer.append(projectCard);

                    // Render the next project
                    renderProject(index + 1);
                })
                .fail(function(error) {
                    console.error('Error fetching Markdown file:', error);
                    // Continue to the next project even if there's an error
                    renderProject(index + 1);
                });
            });
        }

        // Start rendering from the first project
        renderProject(0);
    })
    .fail(function(error) {
        console.error('Error fetching project data:', error);
        $('#error').show();
    });

});