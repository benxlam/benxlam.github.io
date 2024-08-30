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

            console.log('Fetching project content for:', project);


            if (project) {
                fetch(`/projects/${project}/webpage.md`)
                    .then(response => {
                        if (!response.ok) throw new Error(`Failed to load project content`);
                        return response.text();
                    })
                    .then(markdownText => {
                        const renderedHTML = marked.parse(markdownText); // Using marked.js to parse Markdown
                        document.getElementById('project-webpage-content').innerHTML = renderedHTML;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                document.getElementById('project-webpage-content').innerHTML = "<p>No project specified.</p>";
            }

        });
}

function populateProjectDropdown() {
    $.getJSON(PROJECTS_JSON)
        .done(function(data) {
            const projectDropdown = $('#all-project-dropdown');

            $.each(data, function(index, project) {
                const projectOption = $('<option>').attr('value', project.title);
                projectDropdown.append(projectOption);
            });
        });
}

$(document).ready(function() {
    fetchProjectContent();
    populateProjectDropdown();
});