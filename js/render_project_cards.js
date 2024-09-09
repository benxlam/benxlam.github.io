$(document).ready(function() {

    // Get the projects data from the JSON file

    console.log(PROJECTS_JSON);
    $.getJSON(PROJECTS_JSON)
        .done(function(data) {
            const projectsContainer = $('#projects');
            const loadingIndicator = $('#loading');
            loadingIndicator.hide();

            // Iterate over each project in the JSON file and render a project card for each
            $.each(data, function(index, project) {
                const projectCard = $('<div>').addClass('row');
                console.log(project);
                
                // Fetch the project card template
                $.get(PROJECTCARD_TEMPLATE, function(template) {
                    // Fetch the Markdown file
                    $.get(`/projects/${project.title}/summary.md`, function(markdownText) {
                        // Convert Markdown to HTML
                        const renderedMarkdown = marked.parse(markdownText);
                        
                        // Replace template placeholders with project data
                        const renderedTemplate = template
                            .replace(/\${project.title}/g, project.title)   // Replace all instances of ${project.title}
                            .replace('${project.date}', project.date)
                            .replace('${project.image}', project.image)
                            .replace('${project.text}', renderedMarkdown) // Insert rendered Markdown
                            .replace('${project.url}', project.title.replace(/ /g, '_').toLowerCase()); // URL-friendly project title

                        // Append the project card to the projects container
                        projectCard.html(renderedTemplate);
                        projectsContainer.append(projectCard);
                    })
                    .fail(function(error) {
                        console.error('Error fetching Markdown file:', error);
                        // You may want to handle errors in Markdown fetching here
                    });
                });
            });
        })
        .fail(function(error) {
            console.error('Error fetching project data:', error);
            $('#error').show();
        });
});