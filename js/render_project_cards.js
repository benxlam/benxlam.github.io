const PROJECTCARD_TEMPLATE = 'projects/templates/projectCard_template.html'
const PROJECTS_JSON = 'projects/projects.json'

$(document).ready(function() {

    // Get the projects data from the JSON file
    $.getJSON(PROJECTS_JSON)
        .done(function(data) {
            const projectsContainer = $('#projects');
            const loadingIndicator = $('#loading');
            loadingIndicator.hide();

            // Iterate over each project in the JSON file and render a project card for each
            $.each(data, function(index, project) {
                const projectCard = $('<div>').addClass('row');
                
                // Fetch the project card template
                $.get(PROJECTCARD_TEMPLATE, function(template) {
                    console.log(project.text);
                    // Fetch the Markdown file
                    $.get(project.text, function(markdownText) {
                        // Convert Markdown to HTML
                        const renderedMarkdown = marked.parse(markdownText);

                        console.log(project);

                        // Replace template placeholders with project data
                        const renderedTemplate = template
                            .replace('${project.title}', project.title)
                            .replace('${project.date}', project.date)
                            .replace('${project.image}', project.image)
                            .replace('${project.text}', renderedMarkdown) // Insert rendered Markdown
                            .replace('${project.link}', project.link);

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